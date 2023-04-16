import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";


const Rooms = () => {
  const [room, setRoom] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
        axiosInstance
            .get(`v1/rooms`)
            .then((res) => {setRoom(res.data)})
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
      <h5 className="font-weight-bold">Room list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <CInputGroup className="input-prepend w-25">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="search room" />
        </CInputGroup>
        <button
          onClick={() => navigate("/manage-rooms/add-room")}
          type="button"
          className="btn btn-primary"
        >
          + Add Room
        </button>
      </div>

      <table className="table bg-white">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col" className="text-center">S.No</th>
            <th scope="col" className="text-center">Room Type</th>
            <th scope="col" className="text-center">Name</th>
            <th scope="col" className="text-center">Floor No.</th>
            <th scope="col" className="text-center">Status</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {room &&
            room.length > 0 &&
            room.map(({roomTypeName, name, floorNo, status}, i) => (
              <tr key={name + Date.now()}>
                <th scope="row" className="text-center">
                  {i+1}
                </th>
                <td className="text-center">{roomTypeName}</td>
                <td className="text-center">{name}</td>
                <td className="text-center">{floorNo}</td>
                <td className="d-flex justify-content-center">
                  <span className= {`${status === 'booked' && 'bg-warning' || status === 'available' && 'bg-success' || status === 'inactive' && 'bg-danger' || status === 'maintenance' && 'bg-danger' } px-2 py-1 text-white rounded text-center`}>
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

export default Rooms;
