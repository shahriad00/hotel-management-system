import React from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";


const Rooms = () => {
  const navigate = useNavigate();

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
            <th scope="col">S.No</th>
            <th scope="col">Room Type</th>
            <th scope="col">Name</th>
            <th scope="col">Room No.</th>
            <th scope="col">Floor</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="align-middle">
              1
            </th>
            <td className="align-middle">Mark</td>
            <td className="align-middle">Otto</td>
            <td className="align-middle">Mark</td>
            <td className="align-middle">Otto</td>
            <td>
              <span className="bg-success px-2 py-1 text-white rounded align-middle">
                active
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
          <tr>
            <th scope="row" className="align-middle">
              2
            </th>
            <td className="align-middle">Mark</td>
            <td className="align-middle">Otto</td>
            <td className="align-middle">Mark</td>
            <td className="align-middle">Otto</td>
            <td>
              <span className="bg-danger px-2 py-1 text-white rounded">
                Inactive
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
        </tbody>
      </table>
    </>
  );
};

export default Rooms;
