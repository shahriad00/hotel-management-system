import { CButton, CSpinner } from "@coreui/react";
import React from "react";

const LoadingButton = () => {
  return (
    <>
      <CButton disabled color="info" className="px-4  w-100 text-white">
        <CSpinner component="span" size="sm" aria-hidden="true" />
        {' '}Loading...
      </CButton>
    </>
  );
};

export default LoadingButton;
