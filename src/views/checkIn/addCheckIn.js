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
import { BiSearch } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import COUNTRY from "src/assets/data/Country";
import axiosInstance from "src/services/axiosInstance";
import moment from "moment/moment";
import SubmitButton from "src/components/Button/submitButton";

const countryOptions = COUNTRY.map(({ name }) => {
  return { value: name, label: name };
});

const paymentOptions = [
  { value: "Bkash", label: "Bkash" },
  { value: "Cash", label: "Cash" },
  { value: "Debit card", label: "Debit card" },
];

const idTypeOptions = [
  { value: "Nid", label: "Nid" },
  { value: "Passport", label: "Passport" },
  { value: "Driving license", label: "Driving license" },
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
  const [advance, setAdvance] = useState(0);
  const [images, setImages] = useState([]);
  const [roomsData, setRoomsData] = useState();
  const [referenceData, setReferencedData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/reference`)
        .then((res) => {
          setReferencedData(res.data);
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

  const referenceOptions =
    referenceData &&
    referenceData.length > 0 &&
    referenceData.map(({ _id, name }) => {
      return { value: _id, label: name, key: _id + Date.now() };
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
  const selectedRooms = rooms.map((room) => {
    return {
      roomId: room.value,
      roomPrice: room.roomPrice,
      roomName: room.label,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };
  });

  const advancePayment = {
    paymentType: paymentType.value || "Cash",
    amount: advance,
  };
  const formData = new FormData();
  formData.append("checkIn", checkInDate);
  formData.append("checkOut", checkOutDate);
  // select rooms
  formData.append("selectRooms", JSON.stringify(selectedRooms));
  // guest information
  formData.append("name", name);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("address", address);
  formData.append("country", country.value || defaultCountry.value);

  formData.append("companyName", companyName);
  formData.append("bookedBy", bookedBy);
  formData.append("referencedById", referencedBy.value || "");
  formData.append("referencedByName", referencedBy.label || "");
  formData.append("reasonOfStay", reasonOfStay);

  formData.append("guestIdNo", idNumber);
  formData.append("guestIdType", idType.value || "");
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  formData.append("paymentType", paymentType.value || "");
  formData.append("otherPerson", JSON.stringify(fields));
  formData.append("advancePayment", JSON.stringify(advancePayment));

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const entry of formData) {
      console.log(entry);
    }
    axiosInstance
      .post(`v1/check-in`, formData)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/check-in/all-check-ins");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const filterRooms = (allRooms1, selectedRooms1) => {
    console.log(allRooms1.length);
    console.log(selectedRooms1.length);
    const availableRooms = allRooms1.filter(
      (obj1) => !selectedRooms1.some((obj2) => obj1._id === obj2.roomId)
    );
    setRoomsData(availableRooms);
  };

  const checkAvailableRooms = () => {
    axiosInstance
      .get(`v1/search?from=${moment(checkInDate).format('MM-DD-YYYY')}&to=${moment(checkOutDate).format('MM-DD-YYYY')}`)
      .then((res) => {
        filterRooms(res?.data?.allRooms, res?.data?.selectedRooms);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleImageUpload = (e) => setImages([...e.target.files]);

  const addField = () => {
    const values = [...fields];
    values.push({ name: "", idType: "", idNumber: "" });
    setFields(values);
  };

  const removeField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleSelect = (e, i) => {
    const values = [...fields];
    values[i].idType = e.value;
    setFields(values);
  };

  //----- other person field ---- will add a new field onClick
  const renderFields = () => {
    return fields.map((field, index) => (
      <div key={index} className="mb-3 d-flex gap-4 align-items-center">
        <div className="w-100">
          <CFormLabel className="semi-bold" htmlFor="otherName">
            Name {index + 1}:
          </CFormLabel>
          <input
            id="otherName"
            type="text"
            className="form-control"
            placeholder="Enter guest name"
            value={field.name}
            onChange={(e) => {
              const values = [...fields];
              values[index].name = e.target.value;
              setFields(values);
            }}
          />
        </div>
        <div className="w-100">
          <CFormLabel className="semi-bold" htmlFor="other-id-type">
            ID type:
          </CFormLabel>
          <Select
            id="other-id-type"
            name="id-type"
            options={idTypeOptions}
            className="w-100"
            classNamePrefix="select"
            value={field.idType.value}
            onChange={(e) => handleSelect(e, index)}
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
            value={field.idNumber}
            onChange={(e) => {
              const values = [...fields];
              values[index].idNumber = e.target.value;
              setFields(values);
            }}
          />
        </div>
        <div className="d-flex align-items-center">
          <button
            className="mt-4 d-flex justify-content-center align-items-center btn btn-danger"
            type="button"
            onClick={() => removeField(index)}
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
          <div className="d-flex gap-4 justify-content-between align-items-end w-100">
            <div className="w-100">
              <CFormLabel className="semi-bold">Check In<span className="text-danger">*</span>:</CFormLabel>
              <DatePicker
                selected={checkInDate}
                minDate={new Date()}
                onChange={(date) => setCheckInDate(date)}
                className="form-control form-control w-100"
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold">Check Out<span className="text-danger">*</span>:</CFormLabel>
              <DatePicker
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={(date) => setCheckOutDate(date)}
                className="form-control form-control w-100"
              />
            </div>
            <div className="w-50">
              <button
                type="button"
                onClick={checkAvailableRooms}
                className="btn btn-info text-white d-flex align-items-center gap-1"
              >
                <span>check room</span>
                <BiSearch />
              </button>
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="rooms">
                Select rooms<span className="text-danger">*</span>:
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
                        Room name<span className="text-danger">*</span>: ({room.label})
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
                Name<span className="text-danger">*</span>:
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
                type="email"
                className="form-control"
                placeholder="example@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="w-100">
              <CFormLabel className="semi-bold" htmlFor="mobile">
                Mobile<span className="text-danger">*</span>:
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
                Address<span className="text-danger">*</span>:
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
                options={referenceOptions}
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
        <div
          onClick={addField}
          className="d-flex justify-content-between mt-3 border rounded-top my-Header"
        >
          <span> Add Information of Other Person</span>
          <div className="d-flex align-items-center">
            <button
              className="d-flex justify-content-center align-items-center btn btn-success"
              type="button"
            >
              <AiOutlinePlus color="white" fontSize={18} />
            </button>
          </div>
        </div>
        {/*---------Information of Other Person section (name, id type, id number) -----------*/}
        {fields && fields.length > 0 && (
          <div className="bg-white rounded-bottom p-4 border">
            {/*------- adding other guest fields ---------*/}
            {renderFields()}
          </div>
        )}

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
                  onWheel={(e) => e.target.blur()}
                  aria-label="Amount (to the nearest dollar)"
                />
              </CInputGroup>
            </div>
          </div>
        </div>
        <SubmitButton/>
      </CForm>
    </div>
  );
};

export default AddCheckIn;
