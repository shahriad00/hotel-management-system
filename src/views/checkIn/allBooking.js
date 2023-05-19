import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import SearchBar from "src/components/SearchBar/searchBar";
import DeleteModal from "src/components/Modal/deleteModal";

const AllBooking = () => {
  const [booking, setBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [visible, setVisible] = useState(false);
  const [totalPages, setTotalPages] = useState("");
  const [search, setSearch] = useState("");
  const [id, setId] = useState('');

  const navigate = useNavigate();

  const fetchData = () => {
    axiosInstance
      .get(`v1/booking?page=${currentPage}&&limit=${itemsPerPage}&search=${search}`)
      .then((res) => {
        setBooking(res.data?.allBookings);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err) => {
        toast.error(err.message);
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

  const moveToCheckIn = (id) => {
    axiosInstance
      .patch(`v1/check-in/move-to-check-in/${id}`, {type : 'check-in'})
      .then((res) => {
        toast.success(res.data.message);
        fetchData();
        setTimeout(()=> {
          navigate(`/view-guest/${id}`);
        },1200)
        
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`v1/delete-booking/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        fetchData();
        setVisible(false);
        setId('');
      })
      .catch((err) => {
          toast.error(err.message);
          setVisible(false);
          setId('');
      });
  }

  // Handle changing the page
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);

    setTimeout(() => {
      fetchData();
    }, 200);
  };

  //------- handle search ----------
  const handleSearch = () => {
   fetchData();
  }
  return (
    <>
      <h5 className="font-weight-bold">All Online Booking list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <SearchBar placeHolder="Search online bookings" handleSearch={handleSearch} setSearch={setSearch}/>
        <button
          onClick={() => navigate("/check-in/online-booking")}
          type="button"
          className="btn btn-info text-white"
        >
          + Add online booking
        </button>
      </div>

      <table className="table rounded-3 overflow-hidden shadow-sm table-bordered bg-white table-hover">
        <thead>
          <tr className="">
            <th scope="col" className="w-5 text-center">
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
          {booking &&
            booking.length > 0 &&
            booking
              .filter(({ type }) => type === "booking")
              .map(({ _id, name, mobile, checkIn, selectRooms }, i) => (
                <tr key={_id}>
                  <th scope="row" className="text-center">
                    {i + 1}
                  </th>
                  <td className="">{name}</td>
                  <td className="">{mobile}</td>
                  <td className="text-center">
                    {selectRooms.map((room, i) => (
                      <span className="badge bg-dark gap-2 mx-1" key={room._id}>
                      {room.roomName}
                    </span>
                    ))}
                  </td>
                  <td className="text-center">
                    {moment(checkIn).format("DD-MM-YYYY")}
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <span
                        onClick={() =>
                          navigate(`/check-in/view-online-booking/${_id}`)
                        }
                        className="btn btn-info btn-sm text-white"
                      >
                        view
                      </span>
                      <span
                        onClick={() => moveToCheckIn(_id)}
                        className="btn btn-warning btn-sm text-white"
                      >
                        Move to check-in
                      </span>
                      <span
                        onClick={() => {setVisible(true); setId(_id)}}
                        className="btn btn-danger btn-sm text-white"
                      >
                        Delete
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
      <DeleteModal visible={visible} setVisible={setVisible} handleDelete={handleDelete} />
    </>
  );
};

export default AllBooking;
