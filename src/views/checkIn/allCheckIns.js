import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMagnifyingGlass } from "@coreui/icons";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import AdvanceModal from "src/components/Modal/advanceModal";
import RoomServiceModal from "src/components/Modal/roomServiceModal";

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
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/check-in`)
        .then((res) => {
          setCheckIn(res.data);
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
  }

  // -------- add advance amount in modal ----------

  const addAdvanceAmount = (id) => {
    if ( advanceAmount !== 0 && paymentType !== '' ){
      axiosInstance
      .post(`v1/advance-payment`, {
        checkInID: id,
        paymentType: paymentType,
        amount: advanceAmount,
      })
      .then((res) => {
        setAdvanceHistory(res.data.totalAmount);
        setAdvanceAmount(0);
        toast.success('Advance added successfully')
      })
      .catch((err) => {
        console.log(err);
      });
    } else{
      toast.error('fill the information properly!')
    }
  };

  // --------------- add room service item ----------------------

  const addRoomService = (id) => {
    if ( itemPrice !== 0 && itemName !== '' && roomName !== ''){
      axiosInstance
      .post(`v1/room-service`, {
        checkInID: id,
        roomName,
        itemName,
        itemPrice,
      })
      .then((res) => {
        setItemName('');
        setRoomName('');
        setItemPrice(0);
        toast.success('Room service added successfully');
        setBlock(false);

      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });
    } else{
      toast.error('fill the information properly!')
    }
  };


  return (
    <>
      <h5 className="font-weight-bold">Check In list</h5>
      <hr />
      <div className="py-3 d-flex justify-content-between">
        <CInputGroup className="input-prepend w-25">
          <CInputGroupText>
            <CIcon icon={cilMagnifyingGlass} />
          </CInputGroupText>
          <CFormInput type="text" placeholder="search check in's" />
        </CInputGroup>
        <button
          onClick={() => navigate("/check-in/add-check-in")}
          type="button"
          className="btn btn-primary"
        >
          + Add Check In
        </button>
      </div>

      <table className="table table-bordered bg-white">
        <thead>
          <tr className="bg-dark text-white">
            <th scope="col" className="text-center">
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
              .filter(({ type, isCheckedOut }) => type === 'check-in' && isCheckedOut === false)
              .map(({ _id, name, mobile, checkIn, selectRooms }, i) => (
              <tr key={_id}>
                <th scope="row" className="text-center">
                  {i + 1}
                </th>
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
                    <span
                      onClick={() => {
                        getAdvanceAmount(_id);
                      }}
                      className="btn btn-warning btn-sm text-white"
                    >
                      advance pay
                    </span>
                    <span onClick={()=> {setCheckInId(_id);setBlock(!block)}} className="btn bg-teal btn-sm text-white">
                      room service
                    </span>
                    <span className="btn btn-danger btn-sm text-white">
                      check out
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
