import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import AdvanceModal from "src/components/Modal/advanceModal";
import RoomServiceModal from "src/components/Modal/roomServiceModal";
import ReactPaginate from "react-paginate";
import SearchBar from './../../components/SearchBar/searchBar';

const AllCheckIn = () => {
  const [checkIn, setCheckIn] = useState([]);
  const [visible, setVisible] = useState(false);
  const [block, setBlock] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [advanceHistory, setAdvanceHistory] = useState(0);
  const [itemName, setItemName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [checkInId, setCheckInId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/check-in?page=${currentPage}&limit=${itemsPerPage}`)
        .then((res) => {
          setCheckIn(res?.data?.allCheckIns);
          setTotalPages(res?.data?.totalPages);
          console.log(res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // --------- get advance amount in modal -----------

  const getAdvanceAmount = (id) => {
    axiosInstance
      .get(`v1/advance-payment/${id}`)
      .then((res) => {
        setAdvanceHistory(res.data.totalAmount);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setCheckInId(id);
    setVisible(!visible);
  };

  // -------- add advance amount in modal ----------

  const addAdvanceAmount = (id) => {
    if (advanceAmount !== 0 && paymentType !== "") {
      axiosInstance
        .post(`v1/advance-payment`, {
          checkInID: id,
          paymentType: paymentType,
          amount: advanceAmount,
        })
        .then((res) => {
          setAdvanceHistory(res.data.totalAmount);
          setAdvanceAmount(0);
          setPaymentType('');
          setVisible(false);
          toast.success("Advance added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("fill the information properly!");
    }
  };

  // --------------- add room service item ----------------------

  const addRoomService = (id) => {
    if (itemPrice !== 0 && itemName !== "" && roomName !== "") {
      axiosInstance
        .post(`v1/room-service`, {
          checkInID: id,
          roomName,
          itemName,
          itemPrice,
        })
        .then((res) => {
          setItemName("");
          setRoomName("");
          setItemPrice(0);
          toast.success("Room service added successfully");
          setBlock(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          console.log(err);
        });
    } else {
      toast.error("fill the information properly!");
    }
  };

  // Handle changing the page
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);

    setTimeout(() => {
      axiosInstance
        .get(`v1/check-in?page=${currentPage}&limit=${itemsPerPage}`)
        .then((res) => {
          setCheckIn(res?.data?.allCheckIns);
          setTotalPages(res?.data?.totalPages);
          console.log(res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }, 200);
  };

  //------- handle search ----------
  const handleSearch = () => {
    axiosInstance
    .get(`v1/check-in?page=${currentPage}&limit=${itemsPerPage}&search=${search}`)
    .then((res) => {
      setCheckIn(res?.data?.allCheckIns);
      setTotalPages(res?.data?.totalPages);
      console.log(res?.data?.allCheckIns);
    })
    .catch((err) => {
      toast.error(err.message);
    });
}

  return (
    <>
      <h5 className="font-weight-bold">Check In list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
      <SearchBar placeHolder="Search Check-in's" handleSearch={handleSearch} setSearch={setSearch}/>
        <button
          onClick={() => navigate("/check-in/add-check-in")}
          type="button"
          className="btn btn-info text-white"
        >
          + Add Check In
        </button>
      </div>

      <table className="table-bordered table rounded-3 overflow-hidden bg-white shadow-sm table-striped">
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
          {checkIn &&
            checkIn.length > 0 &&
            checkIn
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
                          navigate(`/view-guest/${_id}`)
                        }
                        className="btn btn-info btn-sm text-white"
                      >
                        view
                      </span>
                      <span
                        onClick={() => {
                          getAdvanceAmount(_id);
                        }}
                        className="btn btn-warning btn-sm text-white"
                      >
                        advance pay
                      </span>
                      <span
                        onClick={() => {
                          setCheckInId(_id);
                          setBlock(!block);
                        }}
                        className="btn bg-teal btn-sm text-white"
                      >
                        room service
                      </span>
                      <span
                        onClick={() => navigate(`/check-out/${_id}`)}
                        className="btn btn-danger btn-sm text-white"
                      >
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

      <AdvanceModal
        visible={visible}
        setVisible={setVisible}
        advanceAmount={advanceAmount}
        setAdvanceAmount={setAdvanceAmount}
        advanceHistory={advanceHistory}
        setPaymentType={setPaymentType}
        checkInId={checkInId}
        addAdvanceAmount={addAdvanceAmount}
      />
      <RoomServiceModal
        block={block}
        setBlock={setBlock}
        checkInId={checkInId}
        itemName={itemName}
        setItemName={setItemName}
        roomName={roomName}
        setRoomName={setRoomName}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        addRoomService={addRoomService}
      />
    </>
  );
};

export default AllCheckIn;
