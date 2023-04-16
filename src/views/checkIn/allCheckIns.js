import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";

const AllCheckIn = () => {
  const [checkIn, setCheckIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/check-in`)
        .then((res) => {
          setCheckIn(res.data);
        })
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
      <h5 className="font-weight-bold">Check In list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <CInputGroup className="input-prepend w-25">
          <CInputGroupText>
            <CIcon icon={cilMagnifyingGlass} />
          </CInputGroupText>
          <CFormInput type="text" placeholder="search check in's" />
        </CInputGroup>
        <button
          onClick={() => navigate("/check-in/add-check-in")}
          type="button"
          className="btn btn-primary"
        >
          + Add Check In
        </button>
      </div>

      <table className="table bg-white">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col" className="text-center">
              S.No
            </th>
            <th scope="col" className="">
              Guest Name
            </th>
            <th scope="col" className="">
              Mobile
            </th>
            <th scope="col" className="text-center">
              Room
            </th>
            <th scope="col" className="text-center">
              Check In
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {checkIn &&
            checkIn.length > 0 &&
            checkIn.map(
              ({ name, mobile, checkIn, selectRooms }, i) => (
                <tr key={name + Date.now()}>
                  <th scope="row" className="text-center">
                    {i + 1}
                  </th>
                  <td className="">{name}</td>
                  <td className="">{mobile}</td>
                  <td className="text-center">
                    {selectRooms.map((room,i) => (
                      <span key={room._id}>
                        {room.roomName}{selectRooms.length > 1 && selectRooms.length - 1 !== i && " , "}
                      </span>
                    ))}
                  </td>
                  <td className="text-center">
                    {moment(checkIn).format("DD-MM-YYYY h:mm a")}
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
              )
            )}
        </tbody>
      </table>
    </>
  );
};

export default AllCheckIn;
