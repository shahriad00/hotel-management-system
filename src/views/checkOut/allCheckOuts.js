import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";

const AllCheckOuts = () => {
  const [checkIn, setCheckIn] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
      .get(`v1/check-out?page=${currentPage}&limit=${itemsPerPage}`)
        .then((res) => {
          setCheckIn(res?.data?.allCheckOuts);
          setTotalPages(res?.data?.totalPages);
        })
        .catch((err) => {
          toast.error(err.message);
          localStorage.removeItem('token');
          window.location.replace('#/login');
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle changing the page
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);

    setTimeout(() => {
      axiosInstance
        .get(`v1/check-out?page=${currentPage}&limit=${itemsPerPage}`)
        .then((res) => {
          setCheckIn(res?.data?.allCheckOuts);
          setTotalPages(res?.data?.totalPages);
          console.log(res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }, 100);
  };


  return (
    <>
      <h5 className="font-weight-bold">Check Out list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <CInputGroup className="input-prepend w-25">
          <CInputGroupText>
            <CIcon icon={cilMagnifyingGlass} />
          </CInputGroupText>
          <CFormInput type="text" placeholder="search check outs's" />
        </CInputGroup>
      </div>

      <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-hover">
        <thead>
          <tr className="">
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
            checkIn
              .map(({ _id, name, mobile, checkIn, selectRooms }, i) => (
              <tr key={_id}>
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
                      onClick={() => navigate(`/check-in/view-check-in/${_id}`)}
                      className="btn btn-info btn-sm text-white"
                    >
                      view
                    </span>
                    <span onClick={() => navigate(`/check-out/${_id}`)} className="btn btn-danger btn-sm text-white">
                      check out
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default AllCheckOuts;
