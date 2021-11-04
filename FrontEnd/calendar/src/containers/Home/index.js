import React, { useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEvent from "./addEvent";
import "./style.css";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Home = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);

    const user = useSelector((state) => state.user);

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
                events={[]}
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
