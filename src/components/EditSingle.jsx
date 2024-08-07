import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    status: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/getsingleitem/${id}`);
        const data = await res.json();
        console.log(data, "settt");
        // Set the initial values for formData and deliveryOption
        setFormData({
          username: data.singleItem.username || "",
          address: data.singleItem.address || "",
          problem: data.singleItem.problem || "",
          number: data.singleItem.number || "",
          brand: data.singleItem.brand || "",
          model: data.singleItem.model || "",
          category: data.singleItem.category || "",
          condition: data.singleItem.condition || "",
          place: data.singleItem.place || "",
          price: data.singleItem.price || "",
          ime: data.singleItem.ime || "",
          password: data.singleItem.password || "",
          remark: data.singleItem.remark || "",
          status: data.singleItem.status || "",
          technician_name: data.singleItem.technician_name || "",
        });

        setDeliveryOption(data.singleItem.deliveryOption || ""); // Ensure it's set to a valid value
        setShopOrPerson(data.singleItem.shopOrPerson || ""); // Ensure it's set to a valid value
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };
  const handleshopOrPersonChange = (e) => {
    setShopOrPerson(e.target.value);
  };
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/editsingleitem/${id}`, {
        method: "PUT",
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
      toast.success("Edited successful!");
      navigate("/user");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto  text-black">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="User Name"
              required
              value={formData.username || ""}
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
              type="number"
              id="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mobile Number"
              required
              value={formData.number || ""}
              onChange={handleChange}
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
              placeholder="Product brand"
              required
              value={formData.brand || ""}
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
              placeholder="Model Number"
              required
              value={formData.model || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="working">Working</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
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
            value={formData.category || ""}
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
            value={formData.condition || ""}
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
              value={formData.place || ""}
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
              value={formData.ime || ""}
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
              {["direct", "courier"].map((option) => (
                <div className="flex items-center mb-4" key={option}>
                  <input
                    id={option}
                    type="radio"
                    name="deliveryOption"
                    value={option}
                    onChange={handleDeliveryOptionChange}
                    checked={deliveryOption === option}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={option}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                </div>
              ))}
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
              value={formData.password || ""}
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
              value={formData.remark || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
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
              value={formData.price || ""}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
              required
              value={formData.address || ""}
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
            <input
              type="text"
              id="problem"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Problem"
              required
              value={formData.problem || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="w-full px-16  text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {loading ? "Loading" : "Submit"}
          </button>
        </div>
        {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {loading ? "Loading" : "Submit"}
        </button> */}

        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

export default EditSingle;
