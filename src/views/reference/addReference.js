import {
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from "@coreui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axiosInstance from "src/services/axiosInstance";

const AddReference = () => {
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  const handleReferenceSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("v1/reference", {
        name,
        mobile,
        address,
        status: status.value,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/reference");
      })
      .catch((err) => {
        err?.response?.data?.errors.map((err) => {
          return toast.error(err.messages[0]);
        });
      });
  };

  return (
    <>
      <div className="border-top border-end border-start rounded-top my-Header">
        Add Room Type
      </div>
      <CForm
        onSubmit={handleReferenceSubmit}
        className="bg-white rounded-bottom p-4 border"
      >
        <CRow>
          <CCol>
            <CFormLabel htmlFor="title">Reference Name:</CFormLabel>
            <CFormInput
              id="name"
              type="text"
              className="mb-3"
              placeholder="Enter full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
            <CFormInput
              id="mobile"
              type="text"
              className="mb-3"
              placeholder="Enter mobile number"
              value={mobile}
              onWheel={(e) => e.target.blur()}
              onChange={(event) => setMobile(event.target.value)}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="address">Address:</CFormLabel>
            <CFormInput
              id="address"
              type="text"
              className="mb-3"
              placeholder="Enter Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="status">Status</CFormLabel>
            <Select
              id="status"
              options={[
                { value: true, label: "Active" },
                { value: false, label: "Inactive" },
              ]}
              className="basic-multi-select w-100 mb-3"
              classNamePrefix="select"
              onChange={(event) => setStatus(event)}
            />
          </CCol>
        </CRow>

        <button type="submit" className="btn btn-info text-white mb-3 px-5">
          Submit
        </button>
      </CForm>
    </>
  );
};

export default AddReference;
