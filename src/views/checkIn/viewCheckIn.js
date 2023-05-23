/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import { MdDownload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { AiOutlinePrinter } from "react-icons/ai";
import ImageModal from "src/components/Modal/imageModal";
import HOST from "src/assets/data/ImageHosting";

const ViewCheckIn = () => {
  const [viewImage, setViewImage] = useState();
  const [checkIn, setCheckIn] = useState();
  const [visible, setVisible] = useState(false);
  const [advancePayment, setAdvancePayment] = useState([]);
  const [totalPayed, setTotalPayed] = useState("");
  const [roomService, setRoomService] = useState();

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      //--------------- get single check-in ----------
      axiosInstance
        .get(`v1/check-in/${id}`)
        .then((res) => {
          setCheckIn(res?.data);
          console.log("data -> ", res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
      //------------ get advance payment -----------
      axiosInstance
        .get(`v1/advance-payment/${id}`)
        .then((res) => {
          setAdvancePayment(res.data.advanceAmount);
          setTotalPayed(res.data.totalAmount);
          console.log(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
      //------------ get room service ------------
      axiosInstance
        .get(`v1/room-service/${id}`)
        .then((res) => {
          setRoomService(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  //image modal
  const handleImageView = (image) => {
    setViewImage(HOST + image);
    setVisible(!visible);
  };

  // download image
  const handleDownload = (imageUrl) => {
    const URL = HOST + imageUrl;
    fetch(URL, { method: "GET", headers: {} })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.download = "id-card.png";
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let roomTotal = 0;
  let roomServiceTotal = 0;
  let GST = 0;
  let total = 0;

  function percentage(percent, total) {
    return ((percent / 100) * total).toFixed(0);
  }

  return (
    <>
      <ImageModal
        imgUrl={viewImage}
        visible={visible}
        setVisible={setVisible}
      />
      {/*---------- guest information header ----------------*/}
      <div className="d-flex justify-content-between align-items-center border-top border-end border-start rounded-top my-Header">
        <span>Guest Information</span>
        <span className="fw-400 fs-6">Check-in ID: {checkIn?.bookingId}</span>
      </div>
      {/*---------- guest information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Full name :</th>
                <td>{checkIn?.name}</td>
                <th>E-mail :</th>
                <td>{checkIn?.email}</td>
              </tr>
              <tr>
                <th>Address :</th>
                <td>{checkIn?.address}</td>
                <th>Country :</th>
                <td>{checkIn?.country}</td>
              </tr>
              <tr>
                <th>Mobile No :</th>
                <td>{checkIn?.mobile}</td>
                <th>Company :</th>
                <td>{checkIn?.companyName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- check in / check out information header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Check in / Check out information
      </div>
      {/*---------- check in / check out information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Check In :</th>
                <td>{moment(checkIn?.checkIn).format("DD-MM-YYYY")}</td>
                <th>Check Out :</th>
                <td>{moment(checkIn?.checkOut).format("DD-MM-YYYY")}</td>
              </tr>
              <tr>
                <th>Check In form date :</th>
                <td>{moment(checkIn?.date).format("DD-MM-YYYY hh:mm a")}</td>
                <th>Duration of Stay :</th>
                <td>
                  {checkIn?.durationOfStay}{" "}
                  {checkIn?.durationOfStay > 1 ? "days" : "day"}
                </td>
              </tr>
              <tr>
                <th>ID Card Type :</th>
                <td>{checkIn?.guestIdType}</td>
                <th>Booked By :</th>
                <td>{checkIn?.bookedBy}</td>
              </tr>
              <tr>
                <th>ID Card Number :</th>
                <td>{checkIn?.guestIdNo}</td>
                <th>Referenced By :</th>
                <td>{checkIn?.referencedByName}</td>
              </tr>
              <tr>
                <th>Payment Mode :</th>
                <td>{checkIn?.paymentType}</td>
                <th>Reason of visit/stay :</th>
                <td>{checkIn?.reasonOfStay}</td>
              </tr>
              <tr>
                <th>Total Payed :</th>
                <td>{totalPayed ? totalPayed : 0} Tk</td>
                <th></th>
                <td></td>
              </tr>
              {(Number(checkIn?.pickupCharge) > 0) && (
                <tr>
                  <th>Pick-up charge</th>
                  <td>{checkIn?.pickupCharge} Tk</td>
                  <th></th>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- information of other person ----------------*/}
      {checkIn?.otherPerson?.length > 0 && (
        <>
          <div className="mt-3 border-top border-end border-start rounded-top my-Header">
            Information of Other Person
          </div>
          {/*---------- information of other person table ----------------*/}
          <div className="bg-white rounded-bottom p-4 border">
            <div className="d-flex gap-4 justify-content-between align-items-center w-100">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="max-w-25" scope="col">
                      S.No
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">ID Type</th>
                    <th scope="col">ID No.</th>
                  </tr>
                </thead>
                <tbody>
                  {checkIn?.otherPerson?.map((person, i) => (
                    <tr key={person._id}>
                      <td>{i + 1}</td>
                      <td>{person?.name}</td>
                      <td>{person?.idType}</td>
                      <td>{person?.idNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {/*---------- ID card Uploads header ----------------*/}
      {checkIn?.images?.length > 0 && (
        <>
          <div className="mt-3 border-top border-end border-start rounded-top my-Header">
            Uploaded Id Cards
          </div>
          {/*---------- ID card Uploads table ----------------*/}
          <div className="bg-white rounded-bottom p-4 border">
            <div className="d-flex gap-4 justify-content-between align-items-center w-100">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">
                      S.No
                    </th>
                    <th scope="col" className="text-center">
                      Uploaded image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {checkIn?.images?.map((image, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="d-flex justify-content-center gap-3">
                        <button
                          onClick={() => handleImageView(image)}
                          title="view"
                          type="button"
                          className="btn btn-sm px-2 bg-blue"
                        >
                          <IoEye color="white" fontSize={20} />
                        </button>
                        <button
                          onClick={() => handleDownload(image)}
                          title="download"
                          type="button"
                          className="btn btn-sm px-2 bg-teal"
                        >
                          <MdDownload color="white" fontSize={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {/*---------- Payment information header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Payment Information
      </div>
      {/*---------- Payment information section ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="w-100 mb-4">
          <h5>Room List:</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="max-w-25 text-center" scope="col">
                  S.No
                </th>
                <th scope="col" className="text-center">
                  Room
                </th>
                <th scope="col" className="text-center">
                  Duration of stay
                </th>
                <th scope="col" className="text-center">
                  Base Price
                </th>
                <th scope="col" className="text-center">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {checkIn?.selectRooms?.map((room, i) => (
                <tr key={i}>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center">{room.roomName}</td>
                  <td className="text-center">{checkIn?.durationOfStay}</td>
                  <td className="text-center">{room.roomPrice}/-</td>
                  <td className="text-center">
                    <span className="d-none">
                      {(roomTotal += room.roomPrice * checkIn?.durationOfStay)}
                    </span>
                    {room.roomPrice * checkIn?.durationOfStay} Tk
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table table-bordered">
            <tbody>
              <tr className="bg-success-light">
                <th className="w-100 text-end">Sub Total:</th>
                <td className="text-end w-10">{roomTotal}/- Tk</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* ----------------- Room  service section ---------------------*/}
        {roomService?.length > 0 && (
          <div className="w-100 mb-4">
            <h5>Room Service:</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center max-w-25" scope="col">
                    S.No
                  </th>
                  <th scope="col" className="text-center">
                    Item
                  </th>
                  <th scope="col" className="text-center">
                    Room name
                  </th>
                  <th scope="col" className="text-center">
                    Date
                  </th>
                  <th scope="col" className="text-center">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {roomService?.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="w-50 text-center">{item.itemName}</td>
                    <td className="text-center">{item.roomName}</td>
                    <td className="text-center">
                      {moment(item.date).format("DD-MM-YYYY")}
                    </td>
                    <td className="text-center">
                      <span className="d-none">
                        {(roomServiceTotal += item.itemPrice)}
                      </span>
                      {item.itemPrice}/- Tk
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table table-bordered">
              <tbody>
                <tr className="bg-success-light">
                  <th className="w-100 text-end">Sub Total:</th>
                  <td className="text-end w-10">{roomServiceTotal}/- Tk</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {/* ----------------- Advance Payment section ---------------------*/}
        {advancePayment?.length > 0 && totalPayed && (
          <div className="w-100 mb-5">
            <h5>Payed Amount:</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center max-w-25" scope="col">
                    S.No
                  </th>
                  <th scope="col" className="text-center">
                    Payment Type
                  </th>
                  <th scope="col" className="text-center">
                    Payment Date
                  </th>
                  <th scope="col" className="text-center">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {advancePayment?.map((obj, i) => (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{obj.paymentType}</td>
                    <td className="text-center">
                      {moment(obj.paymentDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="text-center">{obj.amount} Tk</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table table-bordered">
              <tbody>
                <tr className="bg-success-light">
                  <th className="w-100 text-end">Total Payed:</th>
                  <td className="text-end w-10">{totalPayed}/- Tk</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {/* ----------------- Grand Total section ---------------------*/}
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th className="w-100 text-end">Total:</th>
              <td className="text-end w-10">
                {(total = roomTotal + roomServiceTotal)}/- Tk
              </td>
            </tr>
            {(Number(checkIn?.pickupCharge) > 0) && (
              <tr>
                <th className="w-100 text-end">Pick-up charge</th>
                <td className="text-end w-10">{checkIn?.pickupCharge}/- Tk</td>
              </tr>
            )}
            <tr>
              <th className="w-100 text-end">GST ({GST}%):</th>
              <td className="text-end w-10">{percentage(GST, total)}/- Tk</td>
            </tr>
            {(totalPayed > 0) && (
              <tr>
                <th className="w-100 text-end">Total Payed:</th>
                <td className="text-end w-10">{totalPayed}/- Tk</td>
              </tr>
            )}
            <tr>
              <th className="w-100 text-end">Discount:</th>
              <td className="text-end w-10">{checkIn?.discount}/- Tk</td>
            </tr>
            <tr className="bg-warning-light">
              <th className="w-100 text-end">Grand Total:</th>
              <td className="text-end w-10">
                {total -
                  percentage(GST, total) -
                  totalPayed -
                  checkIn?.discount +
                  (checkIn?.pickupCharge ? Number(checkIn?.pickupCharge) : 0)}
                /- Tk
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <a
        className="btn btn-info text-white px-5 mt-3 d-print-none"
        href="javascript:window.print()"
      >
        <AiOutlinePrinter fontSize={22} /> Print
      </a>
    </>
  );
};

export default ViewCheckIn;
