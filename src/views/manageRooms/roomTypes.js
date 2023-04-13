import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
        axiosInstance
            .get(`v1/room-type`)
            .then((res) => {setRoomTypes(res.data)})
            .catch((err) => {
                toast.error(err.message);
            });
    }
    return () => {
        isMounted = false;
    };
}, []);

  return (
    <>
      <h5 className="font-weight-bold">Room Type list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <CInputGroup className="input-prepend w-25">
          <CInputGroupText>
            <CIcon icon={cilMagnifyingGlass} />
          </CInputGroupText>
          <CFormInput type="text" placeholder="search room type" />
        </CInputGroup>
        <button
          onClick={() => navigate("/manage-rooms/add-room-types")}
          type="button"
          className="btn btn-primary"
        >
          + Add Room Type
        </button>
      </div>

      <table className="table bg-white">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col" className="text-center">S.No</th>
            <th scope="col" className="text-center">Title</th>
            <th scope="col" className="text-center">Base price</th>
            <th scope="col" className="text-center">Discount price</th>
            <th scope="col" className="text-center">capacity</th>
            <th scope="col" className="text-center">Status</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes &&
            roomTypes.length > 0 &&
            roomTypes.map(({title,basePrice, discountPrice, capacity, status}, i) => (
              <tr key={title}>
                <th scope="row" className="text-center">
                  {i+1}
                </th>
                <td className="text-center">{title}</td>
                <td className="text-center">{basePrice}</td>
                <td className="text-center">{discountPrice}</td>
                <td className="text-center">{capacity}</td>
                <td className="d-flex justify-content-center">
                  <span className={`${status === 'active' ? 'bg-success' : 'bg-danger'} px-2 py-1 text-white rounded text-center`}>
                    {status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <span className="btn btn-warning btn-sm">
                      <BiEdit fontSize={18} color="white" />
                    </span>
                    <span className="btn btn-danger btn-sm">
                      <RiDeleteBin6Line fontSize={18} color="white" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default RoomTypes;
