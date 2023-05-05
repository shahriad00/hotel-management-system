import { CFormInput, CFormLabel } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import Select from "react-select";
import SubmitButton from "src/components/Button/submitButton";

const idTypeOptions = [
  { value: "Nid", label: "Nid" },
  { value: "Passport", label: "Passport" },
  { value: "Driving license", label: "Driving license" },
];

const UpdateGuestInfo = () => {
  const [idType, setIdType] = useState();
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [images, setImages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/check-in/${id}`)
        .then((res) => {
          setName(res?.data?.name);
          setEmail(res?.data?.email);
          setMobile(res?.data?.mobile);
          setAddress(res?.data?.address);
          setCompany(res?.data?.company);
          setIdNumber(res?.data?.guestIdNo);
          setIdType({
            value: res?.data?.guestIdType,
            label: res?.data?.guestIdType,
          });
          console.log(res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleImageUpload = (e) => setImages([...e.target.files]);

  return (
    <>
      {/*---------- guest information header ----------------*/}
      <div className="border-bottom-0 border rounded-top my-Header">
        Edit Guest Information
      </div>
      {/*---------- guest information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Full name :</th>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </td>
                <th>E-mail :</th>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>Address :</th>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </td>
                <th>Company :</th>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>Mobile No :</th>
                <td>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*--------- id card Information section header -----------*/}
      <div className="mt-3 border-bottom-0 border rounded-top my-Header">
        ID Card information
      </div>
      {/*--------- id card Information section (type, id no, image) -----------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 align-items-center">
          <div className="w-100">
            <CFormLabel className="semi-bold" htmlFor="id-type">
              ID Type:
            </CFormLabel>
            <Select
              id="id-type"
              name="id-type"
              options={idTypeOptions}
              value={idType}
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
              onChange={(e) => setIdNumber(e.target.value)}
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
      <SubmitButton />
    </>
  );
};

export default UpdateGuestInfo;
