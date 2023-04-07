import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import { BiTrash } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";

function AddCheckIn() {
  const [fields, setFields] = useState([]);
  const [name, setName] = useState();
  const [nid, setNid] = useState();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(checkInDate);
  const [room, setRoom] = useState([]);
  const [bookedBy, setBookedBy] = useState();
  const [companyName, setCompanyName] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();
  const [mobile, setMobile] = useState();
  const [fax, setFax] = useState();
  const [email, setEmail] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [cardNumber, setCardNumber] = useState();
  //arrival flight No.
  const [arrFltNo, setArrFltNo] = useState();
  //Estimated Time Arrival.
  const [ETA, setETA] = useState();
  //departure flight No.
  const [depFltNo, setDepFltNo] = useState();
  //Estimated Time Departure.
  const [ETD, setETD] = useState();
  const [pickup, setPickup] = useState();
  const [advance, setAdvance] = useState();
  const [due, setDue] = useState();
  const [instruction, setInstruction] = useState();
  const [charge, setCharge] = useState();
  const [chargedByCompany, setChargedByCompany] = useState(false);
  const [confirmation, setConfirmation] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted: ", {
      name,
      nid,
      checkInDate,
      checkOutDate,
      pickup,
      room
    });
    // add code here to submit the form data to a server or update the state of a parent component
  };

  const addField = () => {
    setFields([...fields, { id: fields.length }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const renderFields = () => {
    return fields.map((field, index) => (
      <div className="d-flex my-2 gap-3 align-items-baseline" key={field.id}>
        <CFormLabel htmlFor="name">Name:</CFormLabel>
        <input
          id="name"
          type="text"
          className="mb-3 form-control"
          placeholder="Enter guest name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <CFormLabel htmlFor="nid">NID:</CFormLabel>
        <input
          id="nid"
          type="text"
          className="mb-3 form-control"
          placeholder="Enter nid number"
          value={name}
          onChange={(event) => setNid(event.target.value)}
        />
        <button
          className="d-flex justify-content-center align-items-center btn btn-danger"
          onClick={() => removeField(field.id)}
        >
          <BiTrash color="white" fontSize={18} />
        </button>
      </div>
    ));
  };

  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];

  return (
    <div>
      <div className="border-top border-end border-start rounded-top my-Header">
        Add Check In
      </div>
      <CForm
        onSubmit={handleSubmit}
        className="bg-white rounded-bottom p-4 border"
      >
        <div className="d-flex gap-5 align-items-baseline">
          <CFormLabel className="w-50">Check In:</CFormLabel>
          <DatePicker
            selected={checkInDate}
            minDate={new Date()}
            onChange={(date) => setCheckInDate(date)}
            className="form-control mb-3 form-control"
          />

          <CFormLabel className="w-50">Check Out:</CFormLabel>
          <DatePicker
            selected={checkOutDate}
            minDate={checkInDate}
            onChange={(date) => setCheckOutDate(date)}
            className="form-control mb-3 form-control"
          />
        </div>
        <div className="d-flex gap-3 mb-3 align-items-baseline">
          <CFormLabel htmlFor="name">Select Room:</CFormLabel>
          <Select
            isMulti
            name="colors"
            options={colourOptions}
            className="basic-multi-select w-25"
            classNamePrefix="select"
            onChange={(choice) => setRoom(choice)}
          />
        </div>
        <div className="d-flex gap-3 align-items-baseline">
          <CFormLabel htmlFor="name">Name:</CFormLabel>
          <input
            id="name"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter guest name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <CFormLabel htmlFor="nid">NID:</CFormLabel>
          <input
            id="nid"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter nid number"
            value={name}
            onChange={(event) => setNid(event.target.value)}
          />
          <div>
            <button
              className="d-flex justify-content-center align-items-center btn btn-success"
              onClick={addField}
            >
              <AiOutlinePlus color="white" fontSize={18} />
            </button>
          </div>
        </div>
        {renderFields()}
        <div>
          <CFormLabel htmlFor="booked-by">Booked By:</CFormLabel>
          <input
            id="booked-by"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter name"
            value={bookedBy}
            onChange={(event) => setBookedBy(event.target.value)}
          />
          <CFormLabel htmlFor="company">Company Name:</CFormLabel>
          <input
            id="company"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Company name"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
          <CFormLabel htmlFor="address">Address:</CFormLabel>
          <input
            id="address"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Home / Company Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <CFormLabel htmlFor="tel">Tel: off/Home</CFormLabel>
          <input
            id="tel"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Home / office telephone"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
          />
          <CFormLabel htmlFor="mobile">Mobile</CFormLabel>
          <input
            id="mobile"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
          <CFormLabel htmlFor="fax">Fax</CFormLabel>
          <input
            id="fax"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Fax "
            value={fax}
            onChange={(event) => setFax(event.target.value)}
          />
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <input
            id="email"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <CFormLabel htmlFor="arr-flight-no">Arr Flight No.</CFormLabel>
          <input
            id="arr-flight-no"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Arr Flight No"
            value={arrFltNo}
            onChange={(event) => setArrFltNo(event.target.value)}
          />
          <CFormLabel htmlFor="eta">ETA</CFormLabel>

          <input
            id="eta"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter ETA"
            value={ETA}
            onChange={(event) => setETA(event.target.value)}
          />
          <CFormLabel htmlFor="arr-flight-no">Dep Flight No.</CFormLabel>
          <input
            id="dep-flight-no"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Dep Flight No"
            value={depFltNo}
            onChange={(event) => setDepFltNo(event.target.value)}
          />
          <CFormLabel htmlFor="eta">ETD</CFormLabel>
          <input
            id="etd"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter ETD"
            value={ETD}
            onChange={(event) => setETD(event.target.value)}
          />
          <CFormLabel htmlFor="payment-method">Payment Method</CFormLabel>
          <CFormSelect
            id="payment-method"
            value={paymentMethod}
            className="mb-3"
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <option style={{ display: "none" }} defaultValue>
              {" "}
              --Select Payment Method--
            </option>
            <option value="cash">Cash</option>
            <option value="bkash">Bkash</option>
            <option value="Debit Card">Debit Card</option>
          </CFormSelect>
          <CFormLabel htmlFor="advance">Advance</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>৳</CInputGroupText>
            <CFormInput
              id="advance"
              type="number"
              placeholder="Enter Advance amount"
              value={advance}
              onChange={(event) => setAdvance(event.target.value)}
              aria-label="Amount (to the nearest dollar)"
            />
          </CInputGroup>
          <CFormLabel htmlFor="due">Due</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>৳</CInputGroupText>
            <CFormInput
              id="due"
              type="number"
              placeholder="Enter Due amount"
              value={due}
              onChange={(event) => setDue(event.target.value)}
              aria-label="Amount (to the nearest dollar)"
            />
          </CInputGroup>
          <div className="mb-3">
            <CFormLabel className="d-block" htmlFor="amenities">
              Pickup
            </CFormLabel>

            <CFormCheck
              className="pb-1 pr-3"
              type="radio"
              inline
              id="yes"
              name="pickup"
              value="yes"
              label="Yes"
              checked={pickup === "yes"}
              onChange={(e) => setPickup(e.target.value)}
            />
            <CFormCheck
              className="pb-1 pr-3"
              type="radio"
              name="pickup"
              inline
              id="no"
              value="no"
              label="No"
              checked={pickup === "no"}
              onChange={(e) => setPickup(e.target.value)}
            />
            {pickup === "yes" && (
              <div className="d-flex gap-3 align-items-baseline">
                <CInputGroup className="mb-3 w-50">
                  <CInputGroupText>৳</CInputGroupText>
                  <CFormInput
                    disabled={chargedByCompany}
                    id="charge"
                    type="number"
                    placeholder="Enter charge amount"
                    value={charge}
                    onChange={(event) => setCharge(event.target.value)}
                    aria-label="Amount (to the nearest dollar)"
                  />
                </CInputGroup>
                <CFormCheck
                  className="pb-1 pr-3"
                  inline
                  id="setChargedByCompany"
                  name="setChargedByCompany"
                  value={chargedByCompany}
                  label="Company"
                  checked={chargedByCompany}
                  onChange={(e) => setChargedByCompany(!chargedByCompany)}
                />
              </div>
            )}
          </div>

          <CFormLabel htmlFor="instruction">
            Special Instruction (if any)
          </CFormLabel>
          <input
            id="instruction"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Special Instruction"
            value={instruction}
            onChange={(event) => setInstruction(event.target.value)}
          />
          <CFormLabel className="d-block" htmlFor="amenities">
            Send Confirmation ?
          </CFormLabel>
          <CFormCheck
            className="pb-1 pr-3"
            type="radio"
            inline
            id="confirmation-yes"
            name="confirmation"
            value="yes"
            label="Yes"
            checked={confirmation === "yes"}
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <CFormCheck
            className="pb-1 pr-3"
            type="radio"
            name="confirmation"
            inline
            id="confirmation-no"
            value="no"
            label="No"
            checked={confirmation === "no"}
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <div>
            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </div>
        </div>
      </CForm>
    </div>
  );
}

export default AddCheckIn;
