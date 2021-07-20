import { useCallback, useState } from "react";

const headers = [
    "Image",
    "FlightNo",
    "Date",
    "Time",
    "PortOfCallA",
    "Status",
    //"Airline",
];

const filteredFlights = (flights) => {
    return flights.reduce((list, flight) => {
        return list.concat([
            headers.map((header) => {
                return flight[header];
            }),
        ]);
    }, []);
};

const useFlights = (type) => {
    const URL = "https://kabrudlev2.edinburghairport.com/api/flights/" + type;
    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchArrivals = useCallback(async () => {
        let apiResponse, flights;

        setLoading(true);
        setError(null);

        try {
            apiResponse = await fetch(URL);
            if (!apiResponse.ok) {
                throw new Error(apiResponse.statusText);
            }
            flights = await apiResponse.json();
            if (!flights) {
                throw new Error("Arrivals JSON parse was not successfull.");
            }
        } catch (error) {
            setLoading(false);
            setError(error);
            return;
        }

        setFlights(filteredFlights(flights));
        setLoading(false);
    }, [URL]);

    return [flights, fetchArrivals, loading, error];
};

export default useFlights;
