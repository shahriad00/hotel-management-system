import { CButton, CSpinner } from "@coreui/react";
import React from "react";

// eslint-disable-next-line react/prop-types
const LoadingButton = (props) => {
  return (
    <>
      <CButton {...props} disabled color="info">
        <CSpinner component="span" size="sm" aria-hidden="true" />
        {' '}Loading...
      </CButton>
    </>
  );
};

export default LoadingButton;
