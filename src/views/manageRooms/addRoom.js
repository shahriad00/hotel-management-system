import React, { useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import ImageUploading from "react-images-uploading";
import { MdDeleteOutline, MdPadding } from "react-icons/md";

import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [floor, setFloor] = useState("");
  const [images, setImages] = useState([]);
  const maxNumber = 4;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted: ", { name, status, roomType, floor, images });
    // add code here to submit the form data to a server or update the state of a parent component
  };

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
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-bottom border"
      >
        <CRow>
          <CCol>
            <CFormLabel htmlFor="room-type">Room Type:</CFormLabel>
            <CFormSelect
              id="room-type"
              value={status}
              className="mb-3"
              onChange={(event) => setRoomType(event.target.value)}
            >
              <option style={{ display: "none" }} defaultValue>
                {" "}
                --Select Room Type--
              </option>
              <option value="active">Exclusive</option>
              <option value="inactive">Standard</option>
            </CFormSelect>
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
              value={floor}
              onChange={(event) => setFloor(event.target.value)}
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
              <option value="available">Available</option>
              <option value="inactive">Inactive</option>
              <option value="booked">Booked</option>
              <option value="inactive">Maintenance</option>
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
                onChange={onChange}
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
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <div>
                      <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        className="form-control py-3 gap-3"
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
