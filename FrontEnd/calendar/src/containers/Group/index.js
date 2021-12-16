import React, { useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import requestHelper from "../../requestHelper";
import moment from "moment";
import AddGroup from "./addGroup";
import "./style.css";

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Group = () => {
    const [events, setEvents] = useState([]);
    // console.log(events)

    const user = JSON.parse(localStorage.getItem("user"));
    const groupCode = localStorage.getItem("selectedGroup");
    const group = JSON.parse(localStorage.getItem("groups")).filter(e => e.code == groupCode);

    //collecting the number of events in every hour
    let eventsDict = {}
    for (let [indx, event] of Object.entries(events)){
        // intersection of events 
        // key: hour
        // value: number of events in that hour (interval: (key:key+1))
        const start = new Date(moment(`${event.date} ${event.startHour}`, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY HH:mm"));
        let hours = event.endHour.split(':')[0] - event.startHour.split(':')[0];
        const startHour = new Date(0);
        startHour.setHours(event.startHour.split(':')[0])
        for (let i=0; i<hours; i++){
            const oneH = new Date(0);
            oneH.setHours(i);
            let currentHour = Number(startHour.toTimeString().split(" ")[0].split(":")[0]) + Number(oneH.toTimeString().split(" ")[0].split(":")[0]);
            if (eventsDict[currentHour]){
                eventsDict[currentHour] += 1
            }
            else{
                eventsDict[currentHour] = 1
            }
        }
    }

    //display all users of the group
    //count how many users are in a group => use the css styling to display a color for each percentage group
    //heatmap ref https://reactjsexample.com/a-customizable-calendar-heatmap-react-component-built-on-svg/
    

    useEffect(() => {
        requestHelper.get("/activities/group/params", { query: { code: groupCode} }).then((res) => setEvents(res.data));
    }, [groupCode]);

    return (
        <div style={styles.pageWrapper}>
            <FullCalendar
                headerToolbar={{
                    left: "title",
                    center: "groupName",
                    right: "today prev,next",
                }}
                customButtons={{
                    groupName: {
                        text: `${group[0].name} - ${group[0].code}`,
                    },
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

            <AddGroup />
        </div>
    );
};

export default Group;