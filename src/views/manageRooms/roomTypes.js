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
            .then((res) => {setRoomTypes(res.data);console.log(res.data)})
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
          <CFormInput type="text" placeholder="search room" />
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
            <th scope="col">S.No</th>
            <th scope="col">Title</th>
            <th scope="col">Base price</th>
            <th scope="col">Discount price</th>
            <th scope="col">capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes &&
            roomTypes.length > 0 &&
            roomTypes.map(({title,basePrice, discountPrice, capacity, status}) => (
              <tr key={title}>
                <th scope="row" className="align-middle">
                  1
                </th>
                <td className="align-middle">{title}</td>
                <td className="align-middle">{basePrice}</td>
                <td className="align-middle">{discountPrice}</td>
                <td className="align-middle">{capacity}</td>
                <td>
                  <span className={`${status === 'active' ? 'bg-success' : 'bg-danger'} px-2 py-1 text-white rounded align-middle`}>
                    {status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <span className="btn btn-primary btn-sm">
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
