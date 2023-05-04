import React, { useEffect, useState } from "react";
import { CCard, CCardBody } from "@coreui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";
import './dashboard.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allRoomStatus, setAllRoomStatus] = useState();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axiosInstance
        .get(`v1/all-room-status`)
        .then((res) => {
          setAllRoomStatus(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const navigate = useNavigate();

  const handleEventClick = (info) => {
    navigate(`/view-guest/${info.event._def.extendedProps.checkInId}`);
  };

  const events =
    allRoomStatus &&
    allRoomStatus.map(({ type, checkInId, roomName, from, to }) => ({
      title: ` Room - ${roomName} (${type})`,
      start: new Date(from),
      end: new Date(to),
      checkInId: checkInId.toString(),
      color:`${type === 'booking' ? '#5D9C59' : '#146C94'}`,
    }));

  return (
    <>
      <CCard className="p-4">
        <CCardBody>
          <>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventContent={renderEventContent}
              aspectRatio={2}
              displayEventTime={false}
              eventClick={handleEventClick}
            />
          </>
        </CCardBody>
      </CCard>
    </>
  );
};
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
export default Dashboard;
