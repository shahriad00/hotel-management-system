import {
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react";
import React,{ useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AMENITIES from "src/assets/data/amenityData";
import SubmitButton from "src/components/Button/submitButton";
import axiosInstance from "src/services/axiosInstance";

const AddRoomTypes = () => {

  const [title, setTitle] = useState();
  const [basePrice, setBasePrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [status, setStatus] = useState();
  const [capacity, setCapacity] = useState();
  const [amenityList, setAmenityList] = useState([])

  const navigate = useNavigate();

  const handleRoomTypeSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('v1/room-type', {
      title,
      basePrice,
      discountPrice,
      status,
      capacity,
      amenityList
    }).then(res => {
      toast.success(res.data.message);
      navigate('/manage-rooms/room-types');
    })
    .catch((err) => {
      err?.response?.data?.errors.map((err) => {
        return toast.error(err.messages[0]);
      })
    });
  }

  const handleCheck = (e, label) => {
    if (e.target.checked) {
      setAmenityList([...amenityList, label]);
    } else {
      setAmenityList(amenityList.filter(value => value !== label));
    }
  };

  return (
    <>
      <div className="border border-bottom-0 rounded-top my-Header">
        Add Room Type
      </div>
      <CForm
        onSubmit={handleRoomTypeSubmit}
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
              onWheel={(e) => e.target.blur()}
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
                onWheel={(e) => e.target.blur()}
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
                onWheel={(e) => e.target.blur()}
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
        <SubmitButton/>
      </CForm>
    </>
  );
}

export default AddRoomTypes;
