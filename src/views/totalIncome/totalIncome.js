import React, { useEffect, useState } from "react";
import { CFormLabel } from "@coreui/react";
import DatePicker from "react-datepicker";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";

const TotalExpense = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(fromDate);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [allIncome, setAllIncome] = useState([]);
  const [totalPages, setTotalPages] = useState();

  const fetchData = () => {
    axiosInstance
      .get(`v1/all-income?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => {
        setAllIncome(res?.data?.allIncome);
        setTotalPages(res?.data?.totalPages);
        console.log(res?.data?.allIncome);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = () => {
    axiosInstance
      .get(`v1/all-income?page=${currentPage}&limit=${itemsPerPage}&from=${fromDate}&to=${toDate}`)
      .then((res) => {
        setAllIncome(res?.data?.allIncome);
        setTotalPages(res?.data?.totalPages);
        console.log(res?.data?.allIncome);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // Handle changing the page
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);

    setTimeout(() => {
      fetchData();
    }, 200);
  };

  let grandTotalIncome = 0;
  return (
    <>
      <h5 className="font-weight-bold">Total Income</h5>
      <hr />
      <div className="py-3 d-flex gap-3">
        <div className="d-flex gap-3 w-25 align-items-baseline">
          <CFormLabel className="semi-bold">From:</CFormLabel>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            className="form-control form-control w-100"
          />
        </div>
        <div className="d-flex gap-3 w-25 align-items-baseline">
          <CFormLabel className="semi-bold">To:</CFormLabel>
          <DatePicker
            selected={toDate}
            minDate={fromDate}
            onChange={(date) => setToDate(date)}
            className="form-control form-control w-100"
          />
        </div>
        <button
          type="button"
          className="btn btn-info text-white d-flex align-items-center gap-2 shadow"
          onClick={handleSearch}
        >
          Search
          <CIcon icon={cilMagnifyingGlass} />
        </button>
      </div>

      <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-striped">
        <thead>
          <tr className="">
            <th scope="col" className="w-5 text-center">
              S.No
            </th>
            <th scope="col" className="text-center">
              Check-in ID
            </th>
            <th scope="col" className="text-center">
              Room
            </th>
            <th scope="col" className="text-center">
              Date
            </th>
            <th scope="col" className="text-center">
              Income
            </th>
          </tr>
        </thead>
        <tbody>
          {allIncome?.length > 0 &&
            allIncome?.map(({ _id, checkOut, selectRooms, grandTotal, bookingId }, i) => (
              <tr key={_id}>
                <th scope="row" className="text-center">
                  {i + 1}
                </th>
                <td className="text-center">
                  {bookingId}
                </td>
                <td className="text-center">
                  {selectRooms.map((room, i) => (
                    <span className="badge bg-dark gap-2 mx-1" key={room._id}>
                      {room.roomName}
                    </span>
                  ))}
                </td>
                <td className="text-center">
                  {moment(checkOut).format("DD-MM-YYYY")}
                </td>
                <td className="text-center">
                  <span className="d-none">{grandTotalIncome += grandTotal}</span>
                  {grandTotal}
                </td>
              </tr>
            ))}
            { allIncome?.length > 0 && 
              <tr className="bg-success-light">
                <td></td>
                <td></td>
                <td></td>
                <th className="text-end">Grand Total :</th>
                <td className="text-center fw-bold">{grandTotalIncome}</td>
              </tr>
            }
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Number(totalPages)}
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

export default TotalExpense;
