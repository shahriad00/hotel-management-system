import { cilInfo, cilMagnifyingGlass } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert, CFormLabel } from "@coreui/react";
import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import LoadingButton from "src/components/Button/loadingButton";
import AddExpenseModal from "src/components/Modal/addExpenseModal";
import axiosInstance from "src/services/axiosInstance";

const AllExpense = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState("");
  const [allExpense, setAllExpense] = useState([]);
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [grandTotalExpense, setGrandTotalExpense] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    axiosInstance
      .get(
        `v1/expense/search?page=${currentPage}&limit=${itemsPerPage}&from=${moment(
          fromDate
        ).format("YYYY-MM-DD")}&to=${moment(toDate).format("YYYY-MM-DD")}`
      )
      .then((res) => {
        setAllExpense(res?.data?.allExpense);
        setTotalPages(res?.data?.totalPages);
        setGrandTotalExpense(res?.data?.grandTotal);
        if (res?.data?.allExpense.length === 0) {
          toast.error("No data found in this date range");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  const addExpense = () => {
    if (title !== "" && amount !== 0 && !isNaN(amount)) {
      axiosInstance
        .post(`v1/expense`, {
          title,
          amount,
          details,
        })
        .then((res) => {
          toast.success("Expense added successfully!");
          setVisible(false);
          setTitle("");
          setDetails("");
          setAmount(0);
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        });
    } else {
      toast.error("Empty field!");
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
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
      <h5 className="font-weight-bold">Total Expense</h5>
      <hr />
      <div className="d-flex align-items-center justify-content-between">
        <div className="py-3 d-flex gap-3">
          <div className="d-flex gap-3 w-50 align-items-baseline">
            <CFormLabel className="semi-bold">From:</CFormLabel>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="form-control w-100"
            />
          </div>
          <div className="d-flex gap-3 w-50 align-items-baseline">
            <CFormLabel className="semi-bold">To:</CFormLabel>
            <DatePicker
              selected={toDate}
              minDate={fromDate}
              onChange={(date) => setToDate(date)}
              className="form-control w-100"
            />
          </div>
          {isLoading ? (
            <LoadingButton className="btn px-3 text-white btn-width" />
          ) : (
            <button
              type="button"
              className="btn btn-info text-white d-flex align-items-center justify-content-center gap-2 shadow w-25"
              onClick={handleSearch}
            >
              Search
              <CIcon icon={cilMagnifyingGlass} />
            </button>
          )}
        </div>
        <button
          onClick={() => setVisible(true)}
          type="button"
          className="btn btn-info text-white shadow"
        >
          + Add Expense
        </button>
      </div>
      {allExpense?.length > 0 ? (
        <>
          <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-striped">
            <thead>
              <tr className="">
                <th scope="col" className="w-5 text-center">
                  S.No
                </th>
                <th scope="col" className="text-center">
                  Title
                </th>
                <th scope="col" className="text-center">
                  Details
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {allExpense?.length > 0 &&
                allExpense?.map(({ _id, title, amount, details, date }, i) => (
                  <tr key={_id}>
                    <th scope="row" className="text-center">
                      {i + 1}
                    </th>
                    <td className="text-center">{title}</td>
                    <td className="text-center w-25">{details}...</td>
                    <td className="text-center">
                      {moment(date).format("DD-MM-YYYY")}
                    </td>
                    <td className="text-center">{amount}/- Tk</td>
                  </tr>
                ))}
              {allExpense?.length > 0 && (
                <tr className="bg-success-light">
                  <td></td>
                  <td></td>
                  <td></td>
                  <th className="text-end">Grand Total :</th>
                  <td className="text-center fw-bold">
                    {grandTotalExpense}/- Tk
                  </td>
                </tr>
              )}
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
          <div>Search by Date to get the Total Expense</div>
        </CAlert>
      )}
      <AddExpenseModal
        visible={visible}
        setVisible={setVisible}
        title={title}
        setTitle={setTitle}
        amount={amount}
        setAmount={setAmount}
        details={details}
        setDetails={setDetails}
        addExpense={addExpense}
      />
    </>
  );
};

export default AllExpense;
