import { CModal, CModalBody } from "@coreui/react";
import React from "react";

// eslint-disable-next-line react/prop-types
const CheckOutModal = ({ visibleCheckOut, setVisibleCheckOut, handleCheckOut }) => {
  return (
    <>
      <CModal
        alignment="center"
        visible={visibleCheckOut}
        onClose={() => setVisibleCheckOut(false)}
      >
        <CModalBody className="p-5">
          <div className="d-flex justify-content-center fw-bold fs-4 mb-5">Confirm Check-out ?</div>
          <div className="d-flex justify-content-center gap-5">
            <button
              onClick={() => setVisibleCheckOut(false)}
              className="btn btn-danger text-white"
            >
              Cancel
            </button>
            <button onClick={handleCheckOut} className="btn btn-success text-white">Confirm</button>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default CheckOutModal;
