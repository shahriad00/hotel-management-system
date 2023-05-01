import React, { useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import ImageUploading from "react-images-uploading";
import { MdDeleteOutline } from "react-icons/md";
import Select from "react-select";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { useEffect } from "react";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [images, setImages] = useState([]);
  const [roomTypesData, setRoomTypesData] = useState();
  const maxNumber = 4;

  const navigate = useNavigate();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('roomTypeId', roomType.value);
  formData.append('roomTypeName', roomType.label);
  formData.append('status', status);
  formData.append('roomDetails', roomDetails);
  formData.append('floorNo', floorNo);
  images.forEach(image => {
    formData.append('images', image);
  });

  const handleImages = (imageList) => {
    setImages(imageList);
  };

  const handleRoomSubmit = (event) => {
    event.preventDefault();
    if (name && status && roomType && floorNo && roomDetails) {
      axiosInstance
        .post(`v1/room`, formData)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/manage-rooms/rooms");
        })
        .catch((err) => {
          err?.response?.data?.errors.map((err) => {
            return toast.error(err.messages[0]);
          });
        });
    } else {
      toast.error("fill up all the fields");
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/room-type`)
        .then((res) => {
          setRoomTypesData(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const roomTypeList =
    roomTypesData &&
    roomTypesData.length > 0 &&
    roomTypesData.map(({ _id, title }) => {
      return { value: _id, label: title, key: _id };
    });

  const imageWrapperStyle = {
    display: "grid",
    placeItems: "center",
    position: "relative",
    width: "185px",
    height: "135px",
    borderRadius: "6px",
    padding: "5px",
    border: "1px dashed gray",
  };

  const imageStyle = {
    maxWidth: "175px",
    maxHeight: "125px",
    objectFit: "contain",
  };

  return (
    <>
      <div className="border-top border-end border-start rounded-top my-Header">
        Add Room
      </div>
      <CForm
        onSubmit={handleRoomSubmit}
        className="bg-white p-4 rounded-bottom border"
      >
        <CRow>
          <CCol>
            <CFormLabel htmlFor="room-type">Room Type:</CFormLabel>
            <Select
              id="room-type"
              value={roomType}
              options={roomTypeList}
              className="mb-3"
              onChange={(event) => setRoomType(event)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="name">Name:</CFormLabel>
            <CFormInput
              id="name"
              type="text"
              className="mb-3"
              placeholder="Enter Room name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="floor-no">Floor No:</CFormLabel>
            <CFormInput
              id="floor-no"
              type="text"
              className="mb-3"
              placeholder="Enter floor No."
              value={floorNo}
              onChange={(event) => setFloorNo(event.target.value)}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="status">Status:</CFormLabel>
            <CFormSelect
              id="status"
              value={status}
              className="mb-3"
              onChange={(event) => setStatus(event.target.value)}
            >
              <option style={{ display: "none" }} defaultValue>
                {" "}
                --Select status--
              </option>
              <option value="available">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="details">Details:</CFormLabel>
            <textarea
              id="details"
              type="text"
              className="mb-3 form-control"
              placeholder="Enter Room Details"
              value={roomDetails}
              onChange={(event) => setRoomDetails(event.target.value)}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="image">Images:</CFormLabel>
            <div className="product__image__upload">
              <ImageUploading
                multiple
                value={images}
                onChange={handleImages}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    <div>
                      <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        className="form-control py-3 gap-3"
                        type="button"
                        {...dragProps}
                      >
                        <GoCloudUpload fontSize={22} />
                        <span className="ml-3">
                          Upload an image or drag and drop PNG,JPG
                        </span>
                      </button>
                    </div>
                    <div className="d-flex gap-5">
                      {imageList.length > 0 && (
                        <h5 className="pt-3">Preview Image:</h5>
                      )}
                      {imageList.map((image, index) => (
                        <div
                          key={index}
                          style={imageWrapperStyle}
                          className="position-relative mt-4"
                        >
                          <img
                            className="img-fluid rounded"
                            style={imageStyle}
                            src={image.data_url}
                            alt=""
                            width="100%"
                          />
                          <div className="position-absolute top-0 start-100 translate-middle">
                            <button
                              className="btn btn-danger d-flex justify-content-center align-items-center"
                              onClick={() => onImageRemove(index)}
                            >
                              <MdDeleteOutline color="white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </CCol>
        </CRow>

        <CButton className="mt-3 px-5" type="submit" color="primary">
          Submit
        </CButton>
      </CForm>
    </>
  );
};

export default AddRoom;
