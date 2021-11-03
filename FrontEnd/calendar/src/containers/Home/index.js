import React, { useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style.css";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Home = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);

    const user = useSelector((state) => state.user);
    console.log("in home", user);

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
        </div>
    );
};

export default Home;
