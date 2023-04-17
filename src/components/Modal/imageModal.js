import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import React from "react";

// eslint-disable-next-line react/prop-types
const ImageModal = ({ imgUrl, visible, setVisible }) => {
  return (
    <>
      <CModal
        size="xl"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>ID card</CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex justify-content-center">
          <img className="img-fluid" src={imgUrl} alt="" width="100%" />
        </CModalBody>
      </CModal>
    </>
  );
};

export default ImageModal;
