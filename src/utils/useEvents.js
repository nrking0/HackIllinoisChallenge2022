import { useState, useEffect } from "react";

/**
 * This is a custom hook created to fetch mentors data from
 * the HackIllinois API. It gets the data from the HackIllinois
 * API link, and then sets the data into a react state variable 
 * as json.
 * 
 * @returns A JSON object containing the mentors data
 */
const useEvents = () => {
    const [events, setEvents] = useState();

    const getEvents = async () => {
        const response = await fetch(
            "https://api.hackillinois.org/event/"
        );
        const json = await response.json();

        setEvents(json.events);
    };

    useEffect(() => {
        getEvents();
    }, []);

    return events;
};

export default useEvents;