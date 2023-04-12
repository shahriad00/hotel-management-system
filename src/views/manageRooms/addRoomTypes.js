import React, { useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
} from "@coreui/react";

const AMENITIES = [
  { id: '1', label: '24-Hour Guest Reception' },
  { id: '2', label: 'Fancy Bathrobes' },
  { id: '3', label: 'Flexible Checkout' },
  { id: '4', label: 'Free Breakfast' },
  { id: '5', label: 'Free Wifi' },
  { id: '6', label: 'Healthy Breakfast' },
  { id: '7', label: 'Mini-fridge' },
  { id: '8', label: 'Parking' },
  { id: '9', label: 'Premium Bedding' },
  { id: '10', label: 'Room Service' }
];

function AddRoomTypes() {
  const [title, setTitle] = useState();
  const [basePrice, setBasePrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [status, setStatus] = useState();
  const [capacity, setCapacity] = useState();
  const [amenityList, setAmenityList] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted: ", {
      title,
      basePrice,
      discountPrice,
      status,
      amenityList
    });
    // add code here to submit the form data to a server or update the state of a parent component
  };

  const handleCheck = (e, label) => {
    if (e.target.checked) {
      setAmenityList([...amenityList, label]);
    } else {
      setAmenityList(amenityList.filter(value => value !== label));
    }
  };

  return (
    <>
      <div className="border-top border-end border-start rounded-top my-Header">
        Add Room Type
      </div>
      <CForm
        onSubmit={handleSubmit}
        className="bg-white rounded-bottom p-4 border"
      >
        <CRow>
          <CCol>
            <CFormLabel htmlFor="title">Title:</CFormLabel>
            <CFormInput
              id="title"
              type="text"
              className="mb-3"
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="capacity">Capacity:</CFormLabel>
            <CFormInput
              id="capacity"
              type="number"
              className="mb-3"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="price">Base Price:</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>৳</CInputGroupText>
              <CFormInput
                id="price"
                type="number"
                min={0}
                placeholder="Enter price"
                value={basePrice}
                onChange={(event) => setBasePrice(event.target.value)}
                aria-label="Amount (to the nearest dollar)"
              />
              <CInputGroupText>.00</CInputGroupText>
            </CInputGroup>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="discount-price">Discount Price:</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>৳</CInputGroupText>
              <CFormInput
                id="discount-price"
                type="number"
                min={0}
                placeholder="Enter discount price"
                value={discountPrice}
                onChange={(event) => setDiscountPrice(event.target.value)}
                aria-label="Amount (to the nearest dollar)"
              />
              <CInputGroupText>.00</CInputGroupText>
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
        <CCol>
            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect
              id="status"
              value={status}
              className="mb-3 w-50"
              onChange={(event) => setStatus(event.target.value)}
            >
              <option style={{ display: "none" }} defaultValue>
                {" "}
                --Select status--
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div className="mb-3 w-25">
              <CFormLabel className="d-block" htmlFor="amenities">
                Amenities:{" "}
              </CFormLabel>
              {AMENITIES.map((amenity, i) => (
                <CFormCheck
                  key={amenity.id}
                  className="pb-1 pr-4"
                  inline
                  id={amenity.id}
                  value={amenity.label}
                  label={amenity.label}
                  checked={amenityList.includes(amenity.label)}
                  onChange={(e)=>handleCheck(e, amenity.label)}
                />
              ))}
            </div>
          </CCol>
        </CRow>

        <button type="submit" className="btn btn-primary mb-3 px-5">
          Submit
        </button>
      </CForm>
    </>
  );
}

export default AddRoomTypes;
