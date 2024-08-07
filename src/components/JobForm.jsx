import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobForm = () => {
  const [deliveryOption, setDeliveryOption] = useState("");
  const [shopOrPerson, setShopOrPerson] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    address: "",
    problem: "",
    number: "",
    brand: "",
    model: "",
    category: "",
    condition: "",
    place: "",
    price: "",
    ime: "",
    password: "",
    remark: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleUserCheck = async (mobileNumber) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/checkUser/${mobileNumber}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      const data = await res.json();
      console.log(data, "nummmmmmmmmmmmmmmmmmmmmmmmmm");
      if (data.success) {
        setUserData(data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };
  const handleshopOrPersonChange = (e) => {
    setShopOrPerson(e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log("ID:", id);
    console.log("Value:", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    if (id === "number" && value.length === 10) {
      console.log("Calling handleUserCheck with 10-digit number");
      handleUserCheck(value); // Pass the mobile number to handleUserCheck
    }
  };
  const [technicianData, setTechnicianData] = useState([]);

  useEffect(() => {
    // Fetch technician data from the API
    fetch(`${import.meta.env.VITE_API_URL}/api/technician/getAllTechnician`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response data is an array of objects with technician details
        setTechnicianData(data);
      })
      .catch((error) => {
        console.error("Error fetching technician data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/createjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          deliveryOption: deliveryOption,
          shopOrPerson: shopOrPerson,
          technician_name: formData.technician_name,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);

      setFormData({
        username: "",
        address: "",
        problem: "",
        number: "",
        brand: "",
        model: "",
        category: "",
        condition: "",
        place: "",
        price: "",
        ime: "",
        password: "",
        remark: "",
      });
      setDeliveryOption("");
      // window.location.reload()
      toast.success("Job Added successful!");
      navigate("/user");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto text-black">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group ">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              value={userData?.username}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mobile Number
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mobile Number"
              required
              onChange={handleChange}
              pattern="[0-9]{10}"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Please enter a valid 10-digit mobile number"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Brand"
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Model"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category"
            required
            onChange={handleChange}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Condition
          </label>
          <input
            type="text"
            id="condition"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Condition"
            required
            onChange={handleChange}
          />
        </div>
        {/* <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Place
            </label>
            <input
              type="text"
              id="place"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Place"
              required
              onChange={handleChange}
            />
          </div> */}

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              IME No
            </label>
            <input
              type="text"
              id="ime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="IME No"
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Delivery
            </label>
            <div className="flex gap-10">
              <div className="flex items-center mb-4">
                <input
                  id="direct"
                  type="radio"
                  name="deliveryOption"
                  value="direct"
                  onChange={handleDeliveryOptionChange}
                  checked={deliveryOption === "direct"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="direct"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Direct
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="courier"
                  type="radio"
                  name="deliveryOption"
                  value="courier"
                  onChange={handleDeliveryOptionChange}
                  checked={deliveryOption === "courier"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="courier"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Courier
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Delivery
          </label>
          <div className="flex gap-10">
            <div className="flex items-center mb-4">
              <input
                id="SHOP"
                type="radio"
                name="shopOrPerson"
                value="SHOP"
                onChange={handleshopOrPersonChange}
                checked={shopOrPerson === "SHOP"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="SHOP"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                SHOP
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="PERSON"
                type="radio"
                name="shopOrPerson"
                value="PERSON"
                onChange={handleshopOrPersonChange}
                checked={shopOrPerson === "PERSON"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="PERSON"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                PERSON
              </label>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Remark
            </label>
            <input
              type="text"
              id="remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Remark"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={userData?.address}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Problem
            </label>
            <textarea
              type="text"
              id="problem"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Problem"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="technician_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Technician
            </label>
            <select
              id="technician_name" // Change the id to match the property in formData
              value={formData.technician_name || ""}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Technician</option>
              {technicianData.map((technician) => (
                <option key={technician._id} value={technician.technician_name}>
                  {technician.technician_name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price"
              required
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="flex items-center justify-center">
          <button className="w-full px-16  text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {loading ? "Loading" : "Submit"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

export default JobForm;
