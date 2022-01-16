import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import requestHelper from "../../requestHelper";
import moment from "moment";
import AddGroup from "./addGroup";
import "./style.css";
import JoinGroup from "./joinGroup";
import requestHalper from "../../requestHelper";
import { useDispatch, useSelector } from "react-redux";
import { saveGroups } from "../../redux/groups/actions";
import { getColorForPercentage } from '../../utils';

const styles = {
    pageWrapper: {
        padding: 20,
    },
};

const Group = () => {
    const [events, setEvents] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const groupCode = localStorage.getItem("selectedGroup");
    const group = useSelector(state => state.group.list).filter(e => e.code == groupCode);

    const dispatch = useDispatch();

    const getNumberOfEvents = () => {
        //collecting the number of events in every hour
        let eventsDict = {}
        for (let [indx, event] of Object.entries(events)) {
            // intersection of events 
            // key: hour
            // value: number of events in that hour (interval: (key:key+1))
            const start = new Date(moment(`${event.date} ${event.startHour}`, "YYYY-MM-DD HH:mm:ss").format("MMM DD, YYYY HH:mm"));
            let hours = event.endHour.split(':')[0] - event.startHour.split(':')[0];
            const startHour = new Date(0);
            startHour.setHours(event.startHour.split(':')[0])
            for (let i = 0; i < hours; i++) {
                const oneH = new Date(0);
                oneH.setHours(i);
                let currentHour = Number(startHour.toTimeString().split(" ")[0].split(":")[0]) + Number(oneH.toTimeString().split(" ")[0].split(":")[0]);
                if (eventsDict[currentHour]) {
                    eventsDict[currentHour] += 1
                }
                else {
                    eventsDict[currentHour] = 1
                }
            }
        }
    }

    //display all users of the group
    //count how many users are in a group => use the css styling to display a color for each percentage group
    //heatmap ref https://reactjsexample.com/a-customizable-calendar-heatmap-react-component-built-on-svg/

    const breakEventsByHour = (list) => {
        const newList = []
        const eventsByDate = {}

        list.forEach(event => {
            let start = parseInt(event.startHour.split(':')[0])
            const end = parseInt(event.endHour.split(':')[0])

            do {
                const startMoment = moment(`${event.date} ${start}:00:00`, "YYYY-MM-DD HH:mm:ss");
                const endMoment = moment(`${event.date} ${start + 1}:00:00`, "YYYY-MM-DD HH:mm:ss");

                newList.push({
                    nbOfEvents: 1,
                    dateString: event.date,
                    id: event.id,
                    title: event.name,
                    start: new Date(startMoment.format("MMM DD, YYYY HH:mm")),
                    end: new Date(endMoment.format("MMM DD, YYYY HH:mm")),
                })

                start += 1
            } while (start < end)

            for (let i = 0; i < newList.length; i += 1) {
                for (let j = i + 1; j < newList.length; j += 1) {
                    if (+newList[i].start === +newList[j].start) {
                        newList[i].nbOfEvents += 1
                        newList.splice(j, 1)
                    }
                }
            }
        })

        newList.forEach(el => {
            if (eventsByDate[el.dateString]) {
                eventsByDate[el.dateString] += el.nbOfEvents
            } else {
                eventsByDate[el.dateString] = el.nbOfEvents
            }
        })

        console.log(newList, eventsByDate);

        return newList.map(el => {
            return {
                ...el,
                color: getColorForPercentage(el.nbOfEvents / eventsByDate[el.dateString] < 0.85 ? el.nbOfEvents / eventsByDate[el.dateString] : el.nbOfEvents / eventsByDate[el.dateString] + 0.25),
            }
        })
    }

    useEffect(() => {
        requestHelper.get("/activities/group/params", { query: { code: groupCode } }).then((res) => setEvents(breakEventsByHour(res.data)));
        requestHalper.get(`/users/groups/${user.id}`)
            .then((gres) => gres.data)
            .then((gres) => {
                dispatch(saveGroups(gres));
            })
    }, [groupCode]);

    return (
        group[0] ?
            <div style={styles.pageWrapper}>
                <FullCalendar
                    eventTextColor='black'
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
                    events={events}
                />

                <AddGroup />
                <JoinGroup />
            </div>
            : null
    );
};

export default Group;