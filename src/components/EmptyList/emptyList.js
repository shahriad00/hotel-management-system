import React from "react";

const EmptyList = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="text-info fs-4">Nothing found</div>
      <div className="text-secondary fs-6">Add new file no show the data here</div>
    </div>
  );
};
export default EmptyList;
