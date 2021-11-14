import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import requestHelper from "../../requestHelper";
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

    const user = localStorage.getItem("user");

    useEffect(() => {
        requestHelper.get("/activities/all", { query: { user: user.id } }).then((res) => setEvents(res.data));
    }, []);

    const handleAddRequest = (values) => {
        try {
            const userObj = JSON.parse(user);
            console.log(values);
            requestHelper
                .post("/activities", {
                    userId: userObj.id,
                    name: values.title,
                    description: values.description,
                    date: moment(values.startDate).format("YYYY-MM-DD"),
                    startHour: values.startTime,
                    endHour: values.stopTime,
                })
                .then(() => {
                    requestHelper
                        .get("/activities/all", { query: { user: user.id } })
                        .then((res) => setEvents(res.data));
                });
        } catch (err) {
            console.log(err);
        }
    };

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
                events={events.map((event) => {
                    return {
                        title: event.name,
                        start: new Date(
                            moment(`${event.date} ${event.startHour}`, "YYYY-MM-DD HH:mm:ss").format(
                                "MMM DD, YYYY HH:mm"
                            )
                        ),
                        end: new Date(
                            moment(`${event.date} ${event.endHour}`, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY HH:mm")
                        ),
                    };
                })}
            />
            <AddEvent
                show={showAddEvent}
                onHide={() => setShowAddEvent(false)}
                onAdd={(values) => {
                    handleAddRequest(values);
                    setShowAddEvent(false);
                }}
            />
        </div>
    );
};

export default Home;
