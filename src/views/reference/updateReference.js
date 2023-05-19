import {
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import SubmitButton from "src/components/Button/submitButton";
import axiosInstance from "src/services/axiosInstance";

const AddReference = () => {
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
        axiosInstance
        .get(`v1/reference/${id}`)
        .then((res) => {
            setName(res?.data?.name);
            setMobile(res?.data?.mobile);
            setAddress(res?.data?.address);
            setStatus({
                value:res?.data?.status,
                label:(res?.data?.status) ? 'Active' : 'Inactive',
            });
            console.log(res.data);
        })
        .catch((err) => {
            toast.error(err.message);
        });
    }
    return () => {
        isMounted = false;
    };
  }, [id]);

  const handleReferenceSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`v1/reference/${id}`, {
        name,
        mobile,
        address,
        status: status.value,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/reference");
      })
      .catch((err) => {
        toast.error(err.response.message);
      });
  };

  return (
    <>
      <div className="border-top border-end border-start rounded-top my-Header">
        Edit Reference
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
              value={status}
              className="basic-multi-select w-100 mb-3"
              classNamePrefix="select"
              onChange={(event) => setStatus(event)}
            />
          </CCol>
        </CRow>

        <SubmitButton/>
      </CForm>
    </>
  );
};

export default AddReference;
