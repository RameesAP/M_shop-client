import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoIdCardOutline } from "react-icons/io5";

const UserTable = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust the number of items per page
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const handleSort = (column) => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSortColumn(column);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (itemId) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (!userConfirmed) {
        // User clicked "Cancel" in the confirmation dialog
        console.log("Deletion cancelled by the user");
        // Optionally, show a message to the user or perform other actions
        return;
      }

      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deleteitem/${itemId}`);

      // Check the response and handle it accordingly
      if (response.status === 200) {
        console.log("Item deleted successfully");
        setData((prevData) => prevData.filter((item) => item._id !== itemId));
        // Optionally, update your component state or perform other actions
      } else {
        console.log("Error deleting item");
        // Handle the error
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleInvoice = async (itemId, additionalData) => {
    try {
      // Make an API request to get the invoice data
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/getinvoice/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoice data');
      }
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');

      // Your logic here with the invoice data

    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  };

  const handleJobCard = async(itemId)=>{
    try {
      const response =await fetch(`${import.meta.env.VITE_API_URL}/api/user/getjobcard/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch getjobcard data');
      }
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error fetching getjobcard data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/getjobdata`);
        const fetchedData = await response.json();
        console.log(fetchedData, "fettt");
        setData(fetchedData); // Set the fetched data into the state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return (
        <span
          className={`ms-1.5 ${
            sortOrder === "asc" ? "text-blue-600" : "text-red-600"
          }`}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </span>
      );
    }
    return null;
  };
  // Utility function to map status to colors
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return { borderColor: "border-blue-700", textColor: "text-blue-700" };
      case "pending":
        return {
          borderColor: "border-orange-500",
          textColor: "text-orange-500",
        };
      case "working":
        return {
          borderColor: "border-yellow-500",
          textColor: "text-yellow-500",
        };
      case "not completed":
        return {
          borderColor: "border-red-500",
          textColor: "text-red-500",
        };
      case "completed":
        return { borderColor: "border-green-500", textColor: "text-green-500" };
      default:
        return { borderColor: "border-gray-500", textColor: "text-gray-500" };
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    const aValue = sortColumn ? a[sortColumn] : null;
    const bValue = sortColumn ? b[sortColumn] : null;

    if (aValue === bValue) {
      return 0;
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  // if you need search all field values use this code

  // const filteredData = sortedData.filter((item) =>
  //   Object.values(item).some(
  //     (value) =>
  //       value &&
  //       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  // this code only search jobno and username nad number

  const filteredData = sortedData.filter(
    (item) =>
      (item.jobsheetno && item.jobsheetno.toString().includes(searchQuery)) ||
      (item.username &&
        item.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.number && item.number.toString().includes(searchQuery))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = Math.ceil(filteredData.length / itemsPerPage);

    return Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
      (page) => (
        <li key={page}>
          <div
            onClick={() => handlePageChange(page)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === page
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            {page}
          </div>
        </li>
      )
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="  w-full flex items-center justify-center">
        {loading && (
          <div className="">
            <ScaleLoader color="#36d7b7" />
          </div>
        )}
      </div>
      <div className="border  rounded-lg bg-white mb-5 ">
        <input
          className="w-full h-full p-2 outline-none"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Link to={"/addjob"}>
        <button  className=" w-fit text-white mb-10 p-2 px-5 rounded-lg bg-gray-700 hover:bg-gray-800">
          Add Job
        </button>
      </Link>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("jobsheetno")}
            >
              Job No {renderSortIcon("jobsheetno")}
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("username")}
            >
               Name {renderSortIcon("username")}
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("address")}
            >
              <div className="flex items-center">
                Address {renderSortIcon("address")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("problem")}
            >
              <div className="flex items-center">
                Problem {renderSortIcon("problem")}
              </div>
            </th> */}
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("number")}
            >
              <div className="flex items-center">
                Number {renderSortIcon("number")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("brand")}
            >
              <div className="flex items-center">
                Brand {renderSortIcon("brand")}
              </div>
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("model")}
            >
              <div className="flex items-center">
                Model {renderSortIcon("model")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">
                Category {renderSortIcon("category")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("condition")}
            >
              <div className="flex items-center">
                Condition {renderSortIcon("condition")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("place")}
            >
              <div className="flex items-center">
                Place {renderSortIcon("place")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("ime")}
            >
              <div className="flex items-center">
                IME {renderSortIcon("ime")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("deliveryOption")}
            >
              <div className="flex items-center ">
                Delivery{renderSortIcon("deliveryOption")}
              </div>
            </th> */}
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center ">
                status {renderSortIcon("status")}
              </div>
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("password")}
            >
              <div className="flex items-center ">
                Password {renderSortIcon("password")}
              </div>
            </th> */}
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("remark")}
            >
              <div className="flex items-center ">
                Remark {renderSortIcon("remark")}
              </div>
            </th> */}
            <th scope="col" className=" px-6 py-3  ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className="bg-white hover:cursor-pointer dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                JOB00{item.jobsheetno}
              </td>
              {/* <td className="px-6 py-4">{item.address}</td> */}
              <td className="px-6 py-4">{item.username}</td>
              {/* <td className="px-6 py-4">{item.problem}</td> */}
              <td className="px-6 py-4">{item.number}</td>
              <td className="px-6 py-4">{item.brand}</td>
              {/* <td className="px-6 py-4">{item.model}</td> */}
              {/* <td className="px-6 py-4">{item.category}</td> */}
              {/* <td className="px-6 py-4">{item.condition}</td> */}
              {/* <td className="px-6 py-4">{item.place}</td> */}
              {/* <td className="px-6 py-4">{item.ime}</td> */}
              {/* <td className="px-6 py-4">{item.deliveryOption}</td> */}
              <td className="px-6 py-4 ">
                <div

//  inclassName border-2   ${getStatusColor(item.status).borderColor} 
                  className={` p-2 px-3 rounded-lg 
                  
                  ${
                    getStatusColor(item.status).textColor
                  } text-center font-semibold uppercase`}
                >
                  {item.status}
                </div>
              </td>
              {/* <td className="px-6 py-4">{item.password}</td> */}
              {/* <td className="px-6 py-4">{item.remark}</td> */}
              <td className="px-6 py-4 text-right flex">
                <Link to={`/getsingle/${item?._id}`}>
                  <div className="font-medium text-white  bg-gray-700 hover:bg-gray-800 mr-3  p-2 px-5 rounded-lg dark:text-white  flex items-center justify-center">
                    <FaEye />
                  </div>
                </Link>
                <div
                  onClick={() => handleJobCard(item?._id)}
                  className="font-medium text-white  bg-gray-700 hover:bg-gray-800 mr-3  p-2 px-5 rounded-lg dark:text-white  flex items-center justify-center hover:cursor-pointer"
                >
               <IoIdCardOutline size={20}/>
                </div>

                <Link to={`/edit/${item?._id}`}>
                  <div className="font-medium text-white bg-gray-700 hover:bg-gray-800 mr-3 p-2 px-5 rounded-lg dark:text-white ">
                    Edit
                  </div>
                </Link>
                <div
                  onClick={() => handleDelete(item?._id)}
                  className="font-medium text-white  bg-gray-700 hover:bg-gray-800 p-2 px-5 rounded-lg dark:text-white  hover:cursor-pointer"
                >
                  Delete
                </div>
                <div
                  onClick={() => handleInvoice(item?._id)}
                  className="font-medium text-white  bg-gray-700 hover:bg-gray-800 ml-3  p-2 px-5 rounded-lg dark:text-white hover:underline flex items-center justify-center hover:cursor-pointer"
                >
                  <HiOutlineDocumentDownload size={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-800 dark:text-gray-800 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstItem + 1}-{indexOfLastItem}{" "}
          </span>
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredData.length}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <div
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage > 1 ? prevPage - 1 : prevPage
                )
              }
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </div>
          </li>
          {renderPageNumbers()}
          {/* <li>
            <div
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage < pageNumbers ? prevPage + 1 : prevPage
                )
              }
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </div>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
