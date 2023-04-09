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

const OnlineBooking = () => {
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
      <div key={field.id} className="mt-3 d-flex gap-4 align-items-center">
        <div className="w-100">
          <CFormLabel className="semi-bold" htmlFor="name">
            Name {index + 2}:
          </CFormLabel>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Enter guest name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="w-100">
          <CFormLabel className="semi-bold" htmlFor="id-type">
            ID type:
          </CFormLabel>
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
          <CFormLabel className="semi-bold" htmlFor="id-no">
            ID No:
          </CFormLabel>
          <input
            id="id-no"
            type="text"
            className="form-control"
            placeholder="Enter ID No"
            value={idNumber}
            onChange={(event) => setIdNumber(event.target.value)}
          />
        </div>
        <div className="d-flex align-items-center">
          <button
            className="mt-4 d-flex justify-content-center align-items-center btn btn-danger"
            onClick={() => removeField(field.id)}
          >
            <BiTrash color="white" fontSize={18} />
          </button>
        </div>
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
        Add Booking
      </div>
      <CForm onSubmit={handleSubmit}>
        {/*---------- select check in date ----------------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-4 justify-content-between align-items-center w-100">
            <div className="w-100">
              <CFormLabel className="semi-bold">Check In:</CFormLabel>
              <DatePicker
                selected={checkInDate}
                minDate={new Date()}
                onChange={(date) => setCheckInDate(date)}
                className="form-control form-control w-100"
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold">Check Out:</CFormLabel>
              <DatePicker
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={(date) => setCheckOutDate(date)}
                className="form-control form-control w-100"
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="rooms">
                Select Room:
              </CFormLabel>
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
          <div className="d-flex gap-3 align-items-center">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="name">
                Name:
              </CFormLabel>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter guest name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="email">
                Email:
              </CFormLabel>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="example@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="mobile">
                Mobile:
              </CFormLabel>
              <input
                id="mobile"
                type="text"
                className="form-control"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex mt-2 gap-4 align-items-center mt-3">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="address">
                Address:
              </CFormLabel>
              <input
                id="address"
                type="text"
                className="form-control"
                placeholder="Enter Home / Company Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="country">
                Country:
              </CFormLabel>
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
          <div className="d-flex gap-4 align-items-center">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="company">
                Company Name:
              </CFormLabel>
              <input
                id="company"
                type="text"
                className="form-control"
                placeholder="Enter Company name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="booked-by">
                Booked By:
              </CFormLabel>
              <input
                id="booked-by"
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={bookedBy}
                onChange={(event) => setBookedBy(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-4 align-items-center  mt-3">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="reference">
                Referenced By:
              </CFormLabel>
              <Select
                id="reference"
                name="reference"
                options={countryOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setReferencedBy(choice)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="reason-of-stay">
                Reason of Stay:
              </CFormLabel>
              <input
                id="reason-of-stay"
                type="text"
                className="form-control"
                placeholder="Enter reason of stay"
                value={reasonOfStay}
                onChange={(event) => setReasonOfStay(event.target.value)}
              />
            </div>
          </div>
        </div>

        {/*--------- id card Information section header -----------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          ID Card information
        </div>
        {/*--------- id card Information section (type, id no, image) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-4 align-items-center">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="id-type">
                ID type:
              </CFormLabel>
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
              <CFormLabel className="semi-bold" htmlFor="id-no">
                ID No:
              </CFormLabel>
              <input
                id="id-no"
                type="text"
                className="form-control"
                placeholder="Enter ID No"
                value={idNumber}
                onChange={(event) => setIdNumber(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="id-img">
                Upload image:
              </CFormLabel>
              <CFormInput type="file" id="id-img" multiple />
            </div>
          </div>
        </div>

        {/*-------------Information of Other Person header ----------------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          Information of Other Person
        </div>
        {/*---------Information of Other Person section (name, id type, id number) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-4 align-items-center">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="name">
                Name:
              </CFormLabel>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter guest name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="id-type">
                ID type:
              </CFormLabel>
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
              <CFormLabel className="semi-bold" htmlFor="id-no">
                ID No:
              </CFormLabel>
              <input
                id="id-no"
                type="text"
                className="form-control"
                placeholder="Enter ID No"
                value={idNumber}
                onChange={(event) => setIdNumber(event.target.value)}
              />
            </div>
            <div className="d-flex align-items-center">
              <button
                className="mt-4 d-flex justify-content-center align-items-center btn btn-success"
                onClick={addField}
              >
                <AiOutlinePlus color="white" fontSize={18} />
              </button>
            </div>
          </div>
          {/*------- adding other guest fields ---------*/}
          {renderFields()}
        </div>

        {/*------------- Payment Information header ----------------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          Payment information
        </div>
        {/*--------- Payment Information section (name, email, mobile, address, country) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-3 align-items-center">
            <div className="w-100">
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
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="advance">
                Advance
              </CFormLabel>
              <CInputGroup className="">
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

        {/*------------- Additional Information header ----------------*/}
        <div className="mt-3 border-top border-end border-start rounded-top my-Header">
          Additional information
        </div>
        {/*--------- Additional Information section (pickup, special instruction) -----------*/}
        <div className="bg-white rounded-bottom p-4 border">
          <div className="d-flex gap-3 align-items-baseline">
            <div className="d-flex gap-3 align-items-center">
              <CFormLabel className="semi-bold ml-3" htmlFor="pickup">
                Pickup :
              </CFormLabel>
              <CFormCheck
                className="pb-1 pr-3"
                type="radio"
                id="yes"
                inline
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
                id="no"
                inline
                value="no"
                label="No"
                checked={pickup === "no"}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            {pickup === "yes" && (
              <CInputGroup className="w-25">
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
            )}
          </div>
          <div className="d-flex gap-3 align-items-center mt-3">
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="instruction">
                Special Instruction (if any)
              </CFormLabel>
              <input
                id="instruction"
                type="text"
                className="form-control"
                placeholder="Enter Special Instruction"
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="confirmation">
                Send Confirmation ?
              </CFormLabel>
              <Select
                id="confirmation"
                className="basic-multi-select w-100"
                classNamePrefix="select"
                options={[
                  { value: "yes", label: "yes" },
                  { value: "no", label: "no" },
                ]}
                onChange={(change) => setConfirmation(change)}
              />
            </div>
          </div>
        </div>
        <div>
          <CButton className="mt-3 px-5" type="submit" color="primary">
            Submit
          </CButton>
        </div>
      </CForm>
    </div>
  );
};

export default OnlineBooking;
