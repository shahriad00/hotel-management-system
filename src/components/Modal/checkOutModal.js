/* eslint-disable react/prop-types */
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";

// eslint-disable-next-line react/prop-types
const CheckOutModal = ({
  visibleCheckOut,
  setVisibleCheckOut,
  handleCheckOut,
}) => {
  return (
    <>
      <CModal
        alignment="center"
        visible={visibleCheckOut}
        onClose={() => setVisibleCheckOut(false)}
      >
        <CModalHeader onClose={() => setVisibleCheckOut(false)}>
          <CModalTitle>Confirm Check-out?</CModalTitle>
        </CModalHeader>
        <CModalBody className="text-center py-4">Are you sure, You want to check out?</CModalBody>
        <CModalFooter className="d-flex justify-content-center gap-3">
          <CButton className="text-white" color="danger" onClick={() => setVisibleCheckOut(false)}>
            Close
          </CButton>
          <CButton className="text-white"  onClick={handleCheckOut} color="info">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CheckOutModal;
