import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import requestHelper from "../../requestHelper";
import AddEvent from "./addEvent";
import moment from "moment";
import "./style.css";
import AddGroup from "../Group/addGroup";
import JoinGroup from "../Group/joinGroup";
import requestHalper from "../../requestHelper";
import { useDispatch } from "react-redux";
import { saveGroups } from "../../redux/groups/actions";
import { getColorForPercentage } from '../../utils';

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Home = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [events, setEvents] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();

    useEffect(() => {
        requestHelper.get("/activities/all", { query: { user: user.id } }).then((res) => setEvents(res.data));
        requestHalper.get(`/users/groups/${user.id}`)
            .then((gres) => gres.data)
            .then((gres) => {
                dispatch(saveGroups(gres))
            })
    }, []);

    const handleAddRequest = (values) => {
        try {
            requestHelper.post("/activities", { userId: user.id, name: values.title, description: values.description, date: moment(values.startDate).format('YYYY-MM-DD'), startHour: values.startTime, endHour: values.stopTime })
                .then(() => {
                    requestHelper.get("/activities/all", { query: { user: user.id } }).then((res) => setEvents(res.data));
                });
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteEvent = (id) => {
        try {
            requestHelper.remove(`/activities/${id}`).then(() => {
                requestHelper.get("/activities/all", { query: { user: user.id } }).then((res) => setEvents(res.data));
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditRequest = (values) => {
        handleDeleteEvent(selectedEvent.id)
        handleAddRequest(values)
        setSelectedEvent({})
    }

    return (
        <div style={styles.pageWrapper}>
            <FullCalendar
                eventClick={data => {
                    const newSelectedEvent = events.filter(elem => {
                        return elem.id === parseInt(data.event.id)
                    });
                    setSelectedEvent(newSelectedEvent[0]);
                    setShowEditEvent(true);
                }}
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
                    const startMoment = moment(`${event.date} ${event.startHour}`, "YYYY-MM-DD HH:mm:ss");
                    const endMoment = moment(`${event.date} ${event.endHour}`, "YYYY-MM-DD HH:mm:ss");

                    return ({
                        id: event.id,
                        title: event.name,
                        start: new Date(startMoment.format("MMM DD, YYYY HH:mm")),
                        end: new Date(endMoment.format("MMM DD, YYYY HH:mm")),
                    })
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
            <AddEvent
                isEditing={!!selectedEvent.id}
                selectedEvent={selectedEvent}
                show={showEditEvent}
                onHide={() => {
                    setSelectedEvent({})
                    setShowEditEvent(false);
                }}
                onAdd={(values) => {
                    handleEditRequest(values);
                    setShowEditEvent(false);
                }}
                onDelete={(id) => {
                    handleDeleteEvent(id);
                    setShowEditEvent(false);
                }

                }
            />
            <AddGroup />
            <JoinGroup />
        </div>
    );
};

export default Home;