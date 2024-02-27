import React from "react";
import JobForm from "../components/JobForm";

const AddJob = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  border-gray-200 rounded-lg dark:border-gray-700 mt-14">
        <JobForm />
      </div>
    </div>
  );
};

export default AddJob;
