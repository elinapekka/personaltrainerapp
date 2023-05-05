import React, { useState, useEffect } from 'react';
import { API_URL } from '../constant'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function GetCalendar(){
    const [events, setEvents] = useState([]);
    
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        fetch(API_URL + 'gettrainings')
        .then(response => {
            if (response.ok){
                return response.json()
            } else{
                alert('Something went wrong in GET request when fetching customers')
            }       
        })
        .then(data => {

            let eventdata = []

            data.forEach(d => {
                let endTime = new Date(d.date)
                endTime.setMinutes(endTime.getMinutes() + d.duration)
                let event = {
                    id: d.id,
                    title: d.activity + ' / ' + d.customer.firstname + ' ' + d.customer.lastname,
                    start: new Date(d.date),
                    end: endTime
                }
                eventdata.push(event)
            })
            setEvents(eventdata);
        })
        .catch(err => console.log(err))
    }, []);

    return(
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            />
        </div>
    )


}


export default GetCalendar;