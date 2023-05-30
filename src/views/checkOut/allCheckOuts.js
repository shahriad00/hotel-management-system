import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import SearchBar from "src/components/SearchBar/searchBar";
import Skeleton from "react-loading-skeleton";

const AllCheckOuts = () => {
  const [checkIn, setCheckIn] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = () => {
    axiosInstance
      .get(`v1/check-out?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => {
        setCheckIn(res?.data?.allCheckOuts);
        setTotalPages(res?.data?.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setIsLoading(false);
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

  // Handle changing the page
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);

    setTimeout(() => {
      fetchData();
    }, 200);
  };

  const handleSearch = () => {
    axiosInstance
      .get(
        `v1/check-out?page=${currentPage}&limit=${itemsPerPage}&search=${search}`
      )
      .then((res) => {
        setCheckIn(res?.data?.allCheckOuts);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <h5 className="font-weight-bold">Check Out list</h5>
      <hr />
      <div className="py-3">
        <SearchBar
          placeHolder="Search Check-outs's"
          handleSearch={handleSearch}
          setSearch={setSearch}
        />
      </div>
      {isLoading ? (
        <Skeleton count={10} height={30} />
      ) : (
        <>
          <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-striped">
            <thead>
              <tr className="py-3">
                <th scope="col" className="w-5 text-center">
                  S No.
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
                  Check Out
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
                  (
                    { _id, name, mobile, checkIn, checkOut, selectRooms },
                    i
                  ) => (
                    <tr key={_id}>
                      <th scope="row" className="text-center">
                        {i + 1}
                      </th>
                      <td className="">{name}</td>
                      <td className="">{mobile}</td>
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
                        {moment(checkIn).format("DD-MM-YYYY")}
                      </td>
                      <td className="text-center">
                        {moment(checkOut).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                          <span
                            onClick={() => navigate(`/view-guest/${_id}`)}
                            className="btn bg-info-light btn-sm text-white"
                          >
                            view
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                )}
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
      )}
    </>
  );
};

export default AllCheckOuts;
