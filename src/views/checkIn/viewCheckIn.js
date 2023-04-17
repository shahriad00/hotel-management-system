import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "src/services/axiosInstance";
import { MdDownload } from 'react-icons/md';
import { IoEye } from "react-icons/io5";
import ImageModal from "src/components/Modal/imageModal";

const ViewCheckIn = () => {
  const [viewImage, setViewImage] = useState();
  const [checkIn, setCheckIn] = useState();
  const [visible, setVisible] = useState(false);

  const { id } = useParams();
  const host = 'http://localhost:4000';

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
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageView = (image) => {
    setViewImage(host+image);
    setVisible(!visible);
  }

  const handleDownload = (imageUrl) => {
    const URL = host + imageUrl;
    fetch(
        URL,
        {
          method: "GET",
          headers: {}
        }
      )
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
    <ImageModal imgUrl={viewImage} visible={visible} setVisible={setVisible}/>
      {/*---------- guest information header ----------------*/}
      <div className="border-top border-end border-start rounded-top my-Header">
        Guest Information
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
                <th>Check In</th>
                <td>{moment(checkIn?.checkIn).format("DD-MM-YYYY hh:mm a")}</td>
                <th>Check Out</th>
                <td>
                  {moment(checkIn?.checkOut).format("DD-MM-YYYY hh:mm a")}
                </td>
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
            </tbody>
          </table>
        </div>
      </div>
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
              {
                checkIn?.otherPerson?.map((person, i) => (
                  <tr key={person._id}>
                    <td>{i+1}</td>
                    <td>{person?.name}</td>
                    <td>{person?.idType}</td>
                    <td>{person?.idNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*---------- ID card Uploads header ----------------*/}
      <div className="mt-3 border-top border-end border-start rounded-top my-Header">
        Uploaded Id Cards
      </div>
      {/*---------- ID card Uploads table ----------------*/}
      <div className="bg-white rounded-bottom p-4 border">
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
                {
                checkIn?.images?.map((image, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td className="d-flex justify-content-center gap-3"> 
                    <button onClick={() => handleImageView(image)} title="view" type="button" className="btn btn-sm px-2 bg-blue">
                        <IoEye color="white" fontSize={20}/>
                    </button>
                    <button onClick={() => handleDownload(image)} title="download" type="button" className="btn btn-sm px-2 bg-teal">
                        <MdDownload color="white" fontSize={20}/>
                    </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewCheckIn;
