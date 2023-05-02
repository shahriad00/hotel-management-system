import { CFormInput, CFormLabel } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import Select from "react-select";

const idTypeOptions = [
  { value: "Nid", label: "Nid" },
  { value: "Passport", label: "Passport" },
  { value: "Driving license", label: "Driving license" },
];

const UpdateGuestInfo = () => {
  const [checkIn, setCheckIn] = useState();
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      //--------------- get single check-in ----------
      axiosInstance
        .get(`v1/check-in/${id}`)
        .then((res) => {
          setCheckIn(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  const defaultIdType = {
    value: checkIn?.guestIdType,
    label: checkIn?.guestIdType,
  };

  const handleImageUpload = (e) => setImages([...e.target.files]);

  return (
    <>
      {/*---------- guest information header ----------------*/}
      <div className="border-top border-end border-start rounded-top my-Header">
        Guest Information
      </div>
      {/*---------- guest information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Full name :</th>
                <td>{checkIn?.name}</td>
                <th>E-mail :</th>
                <td>{checkIn?.email}</td>
              </tr>
              <tr>
                <th>Address :</th>
                <td>{checkIn?.address}</td>
                <th>Country :</th>
                <td>{checkIn?.country}</td>
              </tr>
              <tr>
                <th>Mobile No :</th>
                <td>{checkIn?.mobile}</td>
                <th>Company :</th>
                <td>{checkIn?.companyName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*--------- id card Information section header -----------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        ID Card information
      </div>
      {/*--------- id card Information section (type, id no, image) -----------*/}
      {!isLoading && (
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
              defaultValue={defaultIdType}
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
              defaultValue={checkIn?.guestIdNo}
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
      )}
    </>
  );
};

export default UpdateGuestInfo;
