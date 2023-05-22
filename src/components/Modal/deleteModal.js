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
  const DeleteModal = ({
    visible,
    setVisible,
    handleDelete,
  }) => {
    return (
      <>
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader className="border-none" onClose={() => setVisible(false)}>
            <CModalTitle>Confirm Delete?</CModalTitle>
          </CModalHeader>
          <CModalBody className="text-center py-4">Are you sure, You want to Delete?</CModalBody>
          <CModalFooter className="d-flex justify-content-center gap-3">
            <button className="btn btn-danger text-white" onClick={() => setVisible(false)}>
              Close
            </button>
            <button className="btn btn-info text-white" onClick={handleDelete}>
              Confirm
            </button>
          </CModalFooter>
        </CModal>
      </>
    );
  };
  
  export default DeleteModal;