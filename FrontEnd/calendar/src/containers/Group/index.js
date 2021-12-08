import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import requestHelper from "../../requestHelper";
import moment from "moment";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Group = () => {
    const [events, setEvents] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const groupCode = localStorage.getItem("selectedGroup");
    

    useEffect(() => {
        requestHelper.get("/activities/group/params", { query: { code: groupCode} }).then((res) => setEvents(res.data));
    }, [groupCode]);

    return (
        <div style={styles.pageWrapper}>
            <FullCalendar
                headerToolbar={{
                    left: "title",
                    center: "",
                    right: "today prev,next",
                }}
                contentHeight="auto"
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={events.map((event) => {
                    return ({
                        id: event.id,
                        title: event.name,
                        start: new Date(moment(`${event.date} ${event.startHour}`, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY HH:mm")),
                        end: new Date(moment(`${event.date} ${event.endHour}`, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY HH:mm")),
                    })
                })}
            />
        </div>
    );
};

export default Group;