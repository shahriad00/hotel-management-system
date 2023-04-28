import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";

const AllBooking = () => {
  const [checkIn, setCheckIn] = useState([]);

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

  const moveToCheckIn = (id) => {
    axiosInstance
        .patch(`v1/check-in/move-to-check-in/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          axiosInstance
            .get(`v1/check-in`)
            .then((res) => {
              setCheckIn(res.data);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })
        .catch((err) => {
          toast.error(err.message);
        });
  }

  return (
    <>
      <h5 className="font-weight-bold">All Online Booking list</h5>
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
          + Add online booking
        </button>
      </div>

      <table className="table table-bordered bg-white">
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
            checkIn.filter(({ type }) => type === 'booking').map(({ _id, name, mobile, checkIn, selectRooms }, i) => (
              <tr key={_id}>
                <th scope="row" className="text-center">
                  {i + 1}
                </th>
                <td className="">{name}</td>
                <td className="">{mobile}</td>
                <td className="text-center">
                  {selectRooms.map((room, i) => (
                    <span key={room._id}>
                      {room.roomName}
                      {selectRooms.length > 1 &&
                        selectRooms.length - 1 !== i &&
                        " , "}
                    </span>
                  ))}
                </td>
                <td className="text-center">
                  {moment(checkIn).format("DD-MM-YYYY")}
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <span
                      onClick={() => navigate(`/check-in/view-online-booking/${_id}`)}
                      className="btn btn-info btn-sm text-white"
                    >
                      view
                    </span>
                    <span onClick={() => moveToCheckIn(_id)} className="btn btn-warning btn-sm text-white">
                      Move to check-in
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

export default AllBooking;
