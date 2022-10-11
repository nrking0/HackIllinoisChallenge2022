import "./Calendar.css";
import { useState } from "react";
import { Button } from "@mui/material";
import useEvents from "../../utils/useEvents";

function Calendar() {
    const [date, changeDate] = useState(0);
    const events = useEvents();
    const dates = [
        "Feburary 25th",
        "Feburary 26th",
        "Feburary 27th",
        "Asynchronous Events",
    ];

    const getTime = (time) => {
        const date = new Date(time * 1000);
        let min = date.getMinutes();
        let hour = date.getHours();

        if (min === 0) {
            min = "00";
        }

        if (date.getHours() > 12) {
            return date.getHours() - 12 + ":" + min + " PM";
        } else {
            if (hour === 0) {
                hour = 12;
            }
            return hour + ":" + min + " AM";
        }
    };

    return (
        <div className="page">
            <h2>Event Schedule</h2>
            <div className="calendar">
                <div className="datePicker">
                    <p>Choose a day to see what is happening!</p>
                    {dates.map((day, i) => (
                        <>
                            <Button
                                variant={date === i ? "contained" : "outlined"}
                                onClick={() => changeDate(i)}
                            >
                                {day}
                            </Button>
                            <br />
                        </>
                    ))}
                </div>

                <div className="events">
                    <h3>
                        {date === 0
                            ? "Feburary 25th"
                            : date === 1
                            ? "Feburary 26th"
                            : date === 2
                            ? "Feburary 27th"
                            : "Asynchronous Events"}
                    </h3>

                    <div className="eventList">
                        {events &&
                            events
                                .filter(
                                    (event) =>
                                        (event.startTime >=
                                            1645768800 + date * 86400 &&
                                            event.startTime <=
                                                1645768800 +
                                                    (date + 1) * 86400) ||
                                        (date === 3 && event.isAsync)
                                )
                                .map((event) => (
                                    <>
                                        <div className="event">
                                            <h3>
                                                {event.name}
                                                {event.sponsor.length > 0 &&
                                                    " - Sponsored by " +
                                                        event.sponsor}
                                            </h3>
                                            <h4>
                                                {!event.isAsync &&
                                                (event.startTime ===
                                                    event.endTime
                                                    ? getTime(event.startTime)
                                                    : getTime(event.startTime) +
                                                      " - " +
                                                      getTime(event.endTime))}
                                            </h4>
                                            <p>
                                                {event.ponts > 0 &&
                                                    event.points + "Points"}
                                            </p>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: event.description.replace(
                                                        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim,
                                                        '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>'
                                                    ),
                                                }}
                                            />
                                            <br />
                                        </div>
                                    </>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
