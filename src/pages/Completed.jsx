import React from "react";
import UserTable from "../components/UserTable";

const Completed = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  border-gray-200 rounded-lg dark:border-gray-700 mt-14">
        <UserTable />
      </div>
    </div>
  );
};

export default Completed;
