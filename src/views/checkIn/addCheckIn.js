import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Select from "react-select";
import COUNTRY from "src/assets/data/Country";
import axiosInstance from "src/services/axiosInstance";

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
  const [name, setName] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(checkInDate);
  const [rooms, setRooms] = useState([]);
  const [bookedBy, setBookedBy] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [reasonOfStay, setReasonOfStay] = useState("");
  const [email, setEmail] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [country, setCountry] = useState("");
  const [referencedBy, setReferencedBy] = useState("");
  const [advance, setAdvance] = useState("");
  const [images, setImages] = useState([]);
  const [roomsData, setRoomsData] = useState();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/rooms`)
        .then((res) => {
          setRoomsData(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const roomsOptions =
    roomsData &&
    roomsData.length > 0 &&
    roomsData.map(({ _id, name }) => {
      return { value: _id, label: name, key: _id + Date.now(), roomPrice: 0 };
    });

  const updatePrice = (price, index) => {
    const updatedRooms = rooms.map((room, i) => {
      if (i === index) {
        return { ...room, roomPrice: price };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const formData = new FormData();
  formData.append("checkIn", checkInDate);
  formData.append("checkOut", checkOutDate);
  formData.append("paymentType", paymentType.value);
  formData.append("country", country);
  formData.append("idType", idType.value);
  formData.append("idNumber", idNumber);
  for (let i = 0; i < rooms.length; i++) {
    formData.append(
      "selectRooms[]",
      JSON.stringify({
        roomsId: rooms[i].value,
        roomsName: rooms[i].label,
        roomPrice: rooms[i].roomPrice,
      })
    );
  }
  images.forEach((image) => {
    formData.append("images", image);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const entry of formData) {
      console.log(entry);
    }
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
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

  return (
    <div>
      <div className="border-top border-end border-start rounded-top my-Header">
        Add Check In
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
                Select rooms:
              </CFormLabel>
              <Select
                isMulti
                name="rooms"
                options={roomsOptions}
                className="basic-multi-select w-100"
                classNamePrefix="select"
                onChange={(choice) => setRooms(choice)}
              />
            </div>
          </div>
        </div>
        {/*--------- room price Information section header -----------*/}
        {rooms && rooms.length > 0 && (
          <>
            <div className="mt-3 border-top border-end border-start rounded-top my-Header">
              Add price for rooms
            </div>
            {/*--------- room price Information section (room price) -----------*/}
            <div className="bg-white rounded-bottom p-4 border">
              <div className="d-flex gap-3 align-items-center">
                {rooms &&
                  rooms.length > 0 &&
                  rooms.map((room, i) => (
                    <div key={room.key} className="w-100">
                      <CFormLabel className="semi-bold" htmlFor={room.key}>
                        Room name: ({room.label})
                      </CFormLabel>
                      <CInputGroup className="">
                        <CInputGroupText>৳</CInputGroupText>
                        <CFormInput
                          id={room.key}
                          type="number"
                          min={0}
                          placeholder="Enter room price"
                          onChange={(e) => updatePrice(e.target.value, i)}
                          onWheel={(e) => e.target.blur()}
                          aria-label="Amount (to the nearest dollar)"
                        />
                      </CInputGroup>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

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
              <CFormInput
                onChange={(e) => handleImageUpload(e)}
                accept="image/*"
                type="file"
                id="id-img"
                multiple
              />
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
          <div className="d-flex mt-3 gap-3 align-items-center">
            {rooms &&
              rooms.length > 0 &&
              rooms.map((room, i) => (
                <div key={room.key} className="w-100">
                  <CFormLabel className="semi-bold" htmlFor={room.key}>
                    Room name: ({room.label})
                  </CFormLabel>
                  <CInputGroup className="">
                    <CInputGroupText>৳</CInputGroupText>
                    <CFormInput
                      id={room.key}
                      type="number"
                      min={0}
                      placeholder="Enter room price"
                      onChange={(e) => updatePrice(e.target.value, i)}
                      onWheel={(e) => e.target.blur()}
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </CInputGroup>
                </div>
              ))}
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

export default AddCheckIn;
