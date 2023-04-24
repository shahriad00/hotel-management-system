import React, { useEffect, useState } from "react";
import { CCard, CCardBody } from "@coreui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axiosInstance from "src/services/axiosInstance";
import { toast } from "react-hot-toast";

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

  const events =
    allRoomStatus &&
    allRoomStatus.map(({ roomName, from, to }) => ({
      title: `Room - ${roomName}`,
      start: new Date(from),
      end: new Date(to),
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
