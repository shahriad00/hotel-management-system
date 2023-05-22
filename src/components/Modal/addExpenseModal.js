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
  
  const AddExpenseModal = ({
    visible,
    setVisible,
    title,
    setTitle,
    amount,
    setAmount,
    details,
    setDetails,
    addExpense,
  }) => {
  
    return (
      <>
        <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Add Expense</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormLabel className="semi-bold" htmlFor="title">
                Title<span className="text-danger">*</span>:
            </CFormLabel>
            <CFormInput
                id="title"
                type="text"
                placeholder="Example: Electricity bill"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            <CFormLabel className="semi-bold mt-3" htmlFor="amount">
              Amount<span className="text-danger">*</span>:
            </CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>৳</CInputGroupText>
              <CFormInput
                id="amount"
                type="number"
                placeholder="Enter Expense amount"
                value={parseInt(amount)}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                onWheel={(e) => e.target.blur()}
                aria-label="Amount (to the nearest dollar)"
              />
            </CInputGroup>
            <CFormLabel className="semi-bold" htmlFor="details">
              Details:
            </CFormLabel>
            <CFormInput
                id="details"
                type="text"
                placeholder="Enter Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setTitle('');
                setDetails('');
                setAmount(0);
                setVisible(false);
              }}
            >
              Close
            </CButton>
            <button onClick={addExpense} className="btn btn-info text-white">
              Submit
            </button>
          </CModalFooter>
        </CModal>
      </>
    );
  };
  
  AddExpenseModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    details: PropTypes.string.isRequired,
    setDetails: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
    setAmount: PropTypes.func.isRequired,
    addExpense: PropTypes.func.isRequired,
  };
  
  export default AddExpenseModal;
