import React from "react";
import { useNavigate } from "react-router-dom";

const SubmitButton = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center gap-3">
      <button className="mt-3 px-5 btn btn-info text-white" type="submit">
        Submit
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-3 px-5 btn btn-secondary text-white"
        type="button"
      >
        Back
      </button>
    </div>
  );
};

export default SubmitButton;
