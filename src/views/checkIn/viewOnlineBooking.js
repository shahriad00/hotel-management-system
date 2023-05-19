/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import { MdDownload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import ImageModal from "src/components/Modal/imageModal";
import HOST from "src/assets/data/ImageHosting";

const ViewOnlineBooking = () => {
  const [viewImage, setViewImage] = useState();
  const [checkIn, setCheckIn] = useState();
  const [visible, setVisible] = useState(false);
  const [totalPayed, setTotalPayed] = useState("");

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/check-in/${id}`)
        .then((res) => {
          setCheckIn(res?.data);
          console.log(res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
      axiosInstance
        .get(`v1/advance-payment/${id}`)
        .then((res) => {
          setTotalPayed(res.data.totalAmount);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleImageView = (image) => {
    setViewImage(HOST + image);
    setVisible(!visible);
  };

  const handleDownload = (imageUrl) => {
    const URL = HOST + imageUrl;
    fetch(URL, {
      method: "GET",
      headers: {},
    })
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

  return (
    <>
      {/*---------- guest information header ----------------*/}
      <div className="d-flex justify-content-between align-items-center border-top border-end border-start rounded-top my-Header">
        <span>Guest Information</span>
        <span className="fw-400 fs-6">Booking ID: {checkIn?.bookingId}</span>
      </div>
      {/*---------- guest information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Full name</th>
                <td>{checkIn?.name}</td>
                <th>E-mail</th>
                <td>{checkIn?.email}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{checkIn?.address}</td>
                <th>Country</th>
                <td>{checkIn?.country}</td>
              </tr>
              <tr>
                <th>Mobile No.</th>
                <td>{checkIn?.mobile}</td>
                <th>Company</th>
                <td>{checkIn?.companyName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- Booking information header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Booking information
      </div>
      {/*---------- Booking information table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
        <div className="d-flex gap-4 justify-content-between align-items-center w-100">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Check In</th>
                <td>{moment(checkIn?.checkIn).format("DD-MM-YYYY")}</td>
                <th>Check Out</th>
                <td>{moment(checkIn?.checkOut).format("DD-MM-YYYY")}</td>
              </tr>
              <tr>
                <th>Check In form date</th>
                <td>{moment(checkIn?.date).format("DD-MM-YYYY hh:mm a")}</td>
                <th>Duration of Stay</th>
                <td>
                  {checkIn?.durationOfStay}{" "}
                  {checkIn?.durationOfStay > 1 ? "days" : "day"}
                </td>
              </tr>
              <tr>
                <th>ID Card Type</th>
                <td>{checkIn?.guestIdType}</td>
                <th>Booked By</th>
                <td>{checkIn?.bookedBy}</td>
              </tr>
              <tr>
                <th>ID Card Number</th>
                <td>{checkIn?.guestIdNo}</td>
                <th>Referenced By</th>
                <td>{checkIn?.referencedByName}</td>
              </tr>
              <tr>
                <th>Payment Mode</th>
                <td>{checkIn?.paymentType}</td>
                <th>Reason of visit/stay</th>
                <td>{checkIn?.reasonOfStay}</td>
              </tr>
              <tr>
                <th>Total Payed</th>
                <td>{totalPayed ? totalPayed : 0} Tk</td>
                <th>Pick up</th>
                <td>{checkIn?.pickup}</td>
              </tr>
              {
                (Number(checkIn?.pickupCharge) > 0) &&
                <tr>
                  <th>Pick-up charge</th>
                  <td>{checkIn?.pickupCharge} Tk</td>
                  <th></th>
                  <td></td>
                </tr>
              }
              
            </tbody>
          </table>
        </div>
      </div>
      {checkIn?.otherPerson?.length > 0 && (
        <>
          {/*---------- information of other person header ----------------*/}
          <div className="mt-3 border-top border-end border-start rounded-top my-Header">
            Information of Other Person
          </div>
          {/*---------- information of other person table ----------------*/}
          <div className="bg-white rounded-bottom p-4 border">
            <div className="d-flex gap-4 justify-content-between align-items-center w-100">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
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
      {checkIn?.images?.length > 0 && (
        <>
          {/*---------- ID card Uploads header ----------------*/}
          <div className="mt-3 border-top border-end border-start rounded-top my-Header d-print-none">
            Uploaded Id Cards
          </div>
          {/*---------- ID card Uploads table ----------------*/}
          <div className="bg-white rounded-bottom p-4 border d-print-none">
            <div className="d-flex gap-4 justify-content-between align-items-center w-100">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
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
      <a
        className="btn btn-info text-white px-5 mt-3 d-print-none"
        href="javascript:window.print()"
      >
        Print
      </a>
      <ImageModal
        imgUrl={viewImage}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default ViewOnlineBooking;
