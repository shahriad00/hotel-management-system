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
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Advance payment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="fw-bold">
            Total Payed:
            <span className="text-primary">{' '}{advanceHistory}/-</span>
          </p>
          <CFormLabel className="semi-bold" htmlFor="advance">
            Add advance amount:
          </CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>৳</CInputGroupText>
            <CFormInput
              id="advance"
              type="number"
              placeholder="Enter Advance amount"
              value={parseFloat(advanceAmount)}
              onChange={(event) =>
                setAdvanceAmount(parseFloat(event.target.value))
              }
              onWheel={(e) => e.target.blur()}
              aria-label="Amount (to the nearest dollar)"
            />
          </CInputGroup>
          <CFormLabel className="semi-bold" htmlFor="payment-type">
            Payment Type:
          </CFormLabel>
          <select
            id="payment-type"
            name="payment-type"
            className="form-control w-100"
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option style={{ display: "none" }} defaultValue>
              -- Select Payment Type --
            </option>
            <option value="Cash">Cash</option>
            <option value="Bkash">Bkash</option>
            <option value="Debit card">Debit card</option>
          </select>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setAdvanceAmount(0);
              setVisible(false);
            }}
          >
            Close
          </CButton>
          <CButton onClick={() => addAdvanceAmount(checkInId)} color="primary">
            Submit
          </CButton>
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
  addAdvanceAmount: PropTypes.func.isRequired,
};

export default AdvanceModal;
