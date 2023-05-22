import React, { useState } from "react";
import { CAlert, CFormLabel } from "@coreui/react";
import DatePicker from "react-datepicker";
import CIcon from "@coreui/icons-react";
import { cilInfo, cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";

const TotalReport = () => {
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [grandTotalIncome, setGrandTotalIncome] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [allIncome, setAllIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = () => {
    axiosInstance
      .get(
        `v1/all-report/search?page=${currentPage}&limit=${itemsPerPage}&from=${fromDate}&to=${toDate}`
      )
      .then((res) => {
        setAllIncome(res?.data?.allIncome);
        setTotalExpense(res?.data?.grandTotalExpense);
        setTotalIncome(res?.data?.grandTotalIncome);
        setTotalPages(res?.data?.totalPages);
        setGrandTotalIncome(res?.data?.grandTotal);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  const handleSearch = () => {
    fetchData();
  };

  // Handle changing the page
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);

    setTimeout(() => {
      fetchData();
    }, 200);
  };

  return (
    <>
      <h5 className="font-weight-bold">Total Report</h5>
      <hr />
      <div className="py-3 d-flex gap-3">
        <div className="d-flex gap-3 align-items-baseline">
          <CFormLabel className="semi-bold">From:</CFormLabel>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            className="form-control w-100"
          />
        </div>
        <div className="d-flex gap-3 align-items-baseline">
          <CFormLabel className="semi-bold">To:</CFormLabel>
          <DatePicker
            selected={toDate}
            minDate={fromDate}
            onChange={(date) => setToDate(date)}
            className="form-control w-100"
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
      {allIncome?.length > 0 ? (
        <>
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
                allIncome?.map(
                  (
                    { _id, checkOut, selectRooms, grandTotal, bookingId },
                    i
                  ) => (
                    <tr key={_id}>
                      <th scope="row" className="text-center">
                        {i + 1}
                      </th>
                      <td className="text-center">{bookingId}</td>
                      <td className="text-center">
                        {selectRooms.map((room, i) => (
                          <span
                            className="badge bg-dark gap-2 mx-1"
                            key={room._id}
                          >
                            {room.roomName}
                          </span>
                        ))}
                      </td>
                      <td className="text-center">
                        {moment(checkOut).format("DD-MM-YYYY")}
                      </td>
                      <td className="text-center">{grandTotal}/- Tk</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-striped">
            <tbody>
              <tr>
                <th className="w-100 text-end">Total Income:</th>
                <td className="text-end w-10">{totalIncome}/- Tk</td>
              </tr>
              <tr>
                <th className="w-100 text-end">Total Expense:</th>
                <td className="text-end w-10">{totalExpense}/- Tk</td>
              </tr>
              <tr className="bg-success-light">
                <th className="w-100 text-end">Net Profit:</th>
                <td className="text-end w-10 fw-bold">
                  {Number(totalIncome) - Number(totalExpense)}/- Tk
                </td>
              </tr>
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
      ) : (
        <CAlert color="info" className="d-flex align-items-center mt-3">
          <CIcon
            icon={cilInfo}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          <div>Search by Date to get the Total Income</div>
        </CAlert>
      )}
    </>
  );
};

export default TotalReport;
