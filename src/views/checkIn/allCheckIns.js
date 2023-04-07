import React from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    name: "S.No",
    selector: (row) => row.title,
  },
  {
    name: "Room Type",
    selector: (row) => row.year,
  },
  {
    name: "Room",
    selector: (row) => row.title,
  },
  {
    name: "Room No.",
    selector: (row) => row.year,
  },
  {
    name: "Floor",
    selector: (row) => row.year,
  },
  {
    name: "Status",
    selector: (row) => row.title,
  },
  {
    name: "Action",
    selector: (row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
];
const AllCheckIns = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="py-3 d-flex justify-content-between">
        <h5 className="font-weight-bold">All Check In`s</h5>
        <button
          onClick={() => navigate("/check-in/add-check-in")}
          type="button"
          className="btn btn-primary"
        >
          + Add Check in
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </>
  );
};

export default AllCheckIns;