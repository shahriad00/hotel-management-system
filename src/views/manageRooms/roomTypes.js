import React from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const RoomTypes = () => {
  const navigate = useNavigate();

  return (
    <>
      <h5 className="font-weight-bold">Room Type list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <input
          className="form-control mr-sm-2 w-25"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
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
            <th scope="col">price</th>
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

export default RoomTypes;
