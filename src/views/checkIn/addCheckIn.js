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
import COUNTRY from "src/assets/data/Country";

const countryOptions = COUNTRY.map(({ name }) => {
  return { value: name, label: name };
});

const paymentOptions = [
  { value: "bkash", label: "bkash" },
  { value: "cash", label: "cash" },
  { value: "debit card", label: "debit card" },
];

const idTypeOptions = [
  { value: "nid", label: "nid" },
  { value: "passport", label: "passport" },
  { value: "driving license", label: "driving license" },
];

const defaultCountry = { value: "Bangladesh", label: "Bangladesh" };

const AddCheckIn = () => {
  const [fields, setFields] = useState([]);
  const [name, setName] = useState();
  const [nid, setNid] = useState();
  const [idType, setIdType] = useState();
  const [idNumber, setIdNumber] = useState();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(checkInDate);
  const [room, setRoom] = useState([]);
  const [bookedBy, setBookedBy] = useState();
  const [companyName, setCompanyName] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();
  const [mobile, setMobile] = useState();
  const [reasonOfStay, setReasonOfStay] = useState();
  const [email, setEmail] = useState();
  const [paymentType, setPaymentType] = useState();
  const [country, setCountry] = useState();
  const [referencedBy, setReferencedBy] = useState();
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
      room,
      paymentType,
      country,
      referencedBy,
      idType,
      idNumber,
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

  const roomOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC" },
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
      <CForm onSubmit={handleSubmit}>
        {/*---------- select check in date ----------------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-5 justify-content-between align-items-baseline w-100">
            <div className="w-100">
              <CFormLabel className="">Check In:</CFormLabel>
              <DatePicker
                selected={checkInDate}
                minDate={new Date()}
                onChange={(date) => setCheckInDate(date)}
                className="form-control mb-3 form-control w-100"
              />
            </div>
            <div className="w-100">
              <CFormLabel className="">Check Out:</CFormLabel>
              <DatePicker
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={(date) => setCheckOutDate(date)}
                className="form-control mb-3 form-control w-100"
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="rooms">Select Room:</CFormLabel>
              <Select
                isMulti
                name="rooms"
                options={roomOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setRoom(choice)}
              />
            </div>
          </div>
        </div>
        {/*------------- Guest Information header ----------------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          Guest information
        </div>
        {/*--------- Guest Information section (name, email, mobile, address, country) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-3 align-items-baseline">
            <div className="w-100">
              <CFormLabel htmlFor="name">Name:</CFormLabel>
              <input
                id="name"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter guest name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="email">Email:</CFormLabel>
              <input
                id="email"
                type="text"
                className="mb-3 form-control"
                placeholder="example@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
              <input
                id="mobile"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex mt-2 gap-5 align-items-baseline">
            <div className="w-100">
              <CFormLabel htmlFor="address">Address:</CFormLabel>
              <input
                id="address"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter Home / Company Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="country">Country:</CFormLabel>
              <Select
                id="country"
                name="country"
                defaultValue={defaultCountry}
                options={countryOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setCountry(choice)}
              />
            </div>
          </div>
        </div>

        {/*--------- Company, reference, reason to stay, advance-payment, section -----------*/}
        <div className="bg-white rounded p-4 border mt-2">
          <div className="d-flex gap-5 align-items-baseline">
            <div className="w-100">
              <CFormLabel htmlFor="company">Company Name:</CFormLabel>
              <input
                id="company"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter Company name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="booked-by">Booked By:</CFormLabel>
              <input
                id="booked-by"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter name"
                value={bookedBy}
                onChange={(event) => setBookedBy(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="reference">Referenced By:</CFormLabel>
              <Select
                id="reference"
                name="reference"
                options={countryOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setReferencedBy(choice)}
              />
            </div>
          </div>
          <div className="d-flex gap-5 align-items-baseline">
            <div className="w-100">
              <CFormLabel htmlFor="reason-of-stay">Reason of Stay:</CFormLabel>
              <input
                id="reason-of-stay"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter reason of stay"
                value={reasonOfStay}
                onChange={(event) => setReasonOfStay(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="payment-type">Payment Type:</CFormLabel>
              <Select
                id="payment-type"
                name="payment-type"
                options={paymentOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setPaymentType(choice)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="advance">Advance</CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>৳</CInputGroupText>
                <CFormInput
                  id="advance"
                  type="number"
                  min={0}
                  placeholder="Enter Advance amount"
                  value={advance}
                  onChange={(event) => setAdvance(event.target.value)}
                  aria-label="Amount (to the nearest dollar)"
                />
              </CInputGroup>
            </div>
          </div>
        </div>

        {/*--------- id card Information section header -----------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          ID Card information
        </div>
        {/*--------- id card Information section (type, id no, image) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-5 align-items-baseline">
            <div className="w-100">
              <CFormLabel htmlFor="id-type">ID type:</CFormLabel>
              <Select
                id="id-type"
                name="id-type"
                options={idTypeOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setIdType(choice)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="id-no">Id No:</CFormLabel>
              <input
                id="id-no"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter ID No"
                value={idNumber}
                onChange={(event) => setIdNumber(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel htmlFor="id-img">Upload image:</CFormLabel>
              <CFormInput type="file" id="id-img" multiple />
            </div>
          </div>
        </div>

        {/*------------- Guest Information header ----------------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          Other Guest information
        </div>
        {/*--------- Guest Information section (name, email, mobile, address, country) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-3 align-items-baseline">
            <div className="w-100">
              <CFormLabel htmlFor="name">Name:</CFormLabel>
              <input
                id="name"
                type="text"
                className="mb-3 form-control"
                placeholder="Enter guest name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
        </div>

        {renderFields()}
        <div>
          <CFormLabel htmlFor="tel">Tel: off/Home</CFormLabel>
          <input
            id="tel"
            type="text"
            className="mb-3 form-control"
            placeholder="Enter Home / office telephone"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
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
      </CForm>
    </div>
  );
};

export default AddCheckIn;
