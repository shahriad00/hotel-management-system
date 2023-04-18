import {
  CButton,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const paymentOptions = [
    { value: "Bkash", label: "Bkash" },
    { value: "Cash", label: "Cash" },
    { value: "Debit card", label: "Debit card" },
  ];

const AdvanceModal = ({
  visible,
  setVisible,
  advanceAmount,
  setAdvanceAmount,
  advanceHistory,
  setPaymentType,
  checkInId,
  addAdvanceAmount,
}) => {
  return (
    <>
      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Advance payment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="fw-bold">
            Total Advance: <span className="text-info">{advanceHistory}/-</span>
          </p>
          <CFormLabel className="semi-bold" htmlFor="advance">
            Advance amount:
          </CFormLabel>
          <CInputGroup className="">
            <CInputGroupText>৳</CInputGroupText>
            <CFormInput
              id="advance"
              type="number"
              min={0}
              placeholder="Enter Advance amount"
              value={parseFloat(advanceAmount)}
              onChange={(event) => setAdvanceAmount(parseFloat(event.target.value))}
              onWheel={(e) => e.target.blur()}
              aria-label="Amount (to the nearest dollar)"
            />
          </CInputGroup>

              <CFormLabel className="semi-bold" htmlFor="payment-type">
                Payment Type:
              </CFormLabel>
              <Select
                id="payment-type"
                name="payment-type"
                options={paymentOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setPaymentType(choice)}
              />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton onClick={()=> addAdvanceAmount(checkInId)}  color="primary">Submit</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

AdvanceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  advanceAmount: PropTypes.number.isRequired,
  setAdvanceAmount: PropTypes.func.isRequired,
  advanceHistory: PropTypes.number.isRequired,
  setPaymentType: PropTypes.func.isRequired,
  checkInId: PropTypes.string.isRequired,
  addAdvanceAmount: PropTypes.func.isRequired
};

export default AdvanceModal;
