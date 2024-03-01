import React, { useEffect, useState } from "react";

const UserTable = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust the number of items per page
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/getjobdata");
        const fetchedData = await response.json();
        console.log(fetchedData, "fettt");
        setData(fetchedData); // Set the fetched data into the state
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
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
      <div className="border rounded-lg bg-white mb-5">
        <input
          className="w-full h-full p-2"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("username")}
            >
              User name {renderSortIcon("username")}
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("address")}
            >
              <div className="flex items-center">
                Address {renderSortIcon("address")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("problem")}
            >
              <div className="flex items-center">
                Problem {renderSortIcon("problem")}
              </div>
            </th>
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
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("model")}
            >
              <div className="flex items-center">
                Model {renderSortIcon("model")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">
                Category {renderSortIcon("category")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("condition")}
            >
              <div className="flex items-center">
                Condition {renderSortIcon("condition")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("place")}
            >
              <div className="flex items-center">
                Place {renderSortIcon("place")}
              </div>
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("ime")}
            >
              <div className="flex items-center">
                IME {renderSortIcon("ime")}
              </div>
            </th> */}
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("deliveryOption")}
            >
              <div className="flex items-center ">
                Delivery Option {renderSortIcon("deliveryOption")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center ">
                status {renderSortIcon("status")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("password")}
            >
              <div className="flex items-center ">
                Password {renderSortIcon("password")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => handleSort("remark")}
            >
              <div className="flex items-center ">
                Remark {renderSortIcon("remark")}
              </div>
            </th>
            <th scope="col" className=" px-6 py-3  flex mt-2 justify-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.username}
              </td>
              <td className="px-6 py-4">{item.address}</td>
              <td className="px-6 py-4">{item.problem}</td>
              <td className="px-6 py-4">{item.number}</td>
              <td className="px-6 py-4">{item.brand}</td>
              <td className="px-6 py-4">{item.model}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">{item.condition}</td>
              <td className="px-6 py-4">{item.place}</td>
              {/* <td className="px-6 py-4">{item.ime}</td> */}
              <td className="px-6 py-4">{item.deliveryOption}</td>
              <td className="px-6 py-4">
                <div
                  className={`border-2 p-2 px-3 rounded-lg ${
                    item.status === "pending"
                      ? "border-red-500"
                      : "border-gray-500"
                  }`}
                >
                  {item.status}
                </div>
              </td>
              <td className="px-6 py-4">{item.password}</td>
              <td className="px-6 py-4">{item.remark}</td>
              <td className="px-6 py-4 text-right ">
                <a
                  href="#"
                  className="font-medium text-blue-600  bg-blue-500 mr-3 p-2 px-5 rounded-lg  dark:text-white hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-blue-600  bg-red-500 p-2 px-5 rounded-lg dark:text-white hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
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
