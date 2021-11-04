import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import requestHalper from "../../requestHelper";
import AddEvent from "./addEvent";
import moment from "moment";
import "./style.css";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Home = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [events, setEvents] = useState([]);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        requestHalper.get("/activities/all", { query: { user: user.id } }).then((res) => setEvents(res.data));
    }, []);

    return (
        <div style={styles.pageWrapper}>
            <FullCalendar
                headerToolbar={{
                    left: "title",
                    center: "",
                    right: "addEvent today prev,next",
                }}
                customButtons={{
                    addEvent: {
                        text: "Add event",
                        click: () => {
                            setShowAddEvent(true);
                        },
                    },
                }}
                contentHeight="auto"
                allDaySlot={false}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={events.map((event) => ({
                    title: event.name,
                    start: new Date(moment(`${event.date} ${event.startHour}`, "YYYY-MM-DD hh:mm:ss").format("MMM DD, YYYY HH:MM")),
                    end: new Date(moment(`${event.date} ${event.endHour}`, "YYYY-MM-DD hh:mm:ss").format("MMM DD, YYYY HH:MM")),
                }))}
            />
            <AddEvent
                show={showAddEvent}
                onHide={() => setShowAddEvent(false)}
                onAdd={(startDate, startTime, stopTime) => {
                    setShowAddEvent(false);
                }}
            />
        </div>
    );
};

export default Home;