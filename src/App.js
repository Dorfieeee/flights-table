import "./styles.css";
import Header from "./Header";
import Table from "./Table";
import Footer from "./Footer";
import useAutoPagination from "./useAutoPagination";
import Spinner from "./Spinner";
import useFlights from "./useFlights";
import { useEffect, useState } from "react";
//import dummyDepartures from "./dummy";

const departuresHeaders = [
    "Logo",
    "Flight No",
    "Date",
    "Time",
    "Destination",
    "Status",
    //"Airline",
];

export default function App() {
    const [slideDuration] = useState(20 * 1000);
    const [rowsCount] = useState(15);
    const [departures, fetchDepartures, loading, error] =
        useFlights("departures");

    const [slicedDepartures, currentPage, totalPages, toggle] =
        useAutoPagination(departures, rowsCount, slideDuration);

    useEffect(() => {
        fetchDepartures();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(fetchDepartures, slideDuration * totalPages + 150);
        return () => clearTimeout(timeout);
    }, [departures]);

    return (
        <div className="App">
            <div className="AppWrapper">
                <Header
                    interval={slideDuration}
                    toggle={toggle}
                    isLoaded={!loading && departures}
                />
                {departures ? (
                    <>
                        <Table
                            data={slicedDepartures}
                            headers={departuresHeaders}
                            curr={currentPage}
                            total={totalPages}
                            rowsCount={rowsCount}
                        />
                    </>
                ) : (
                    <Spinner />
                )}
                <Footer />
            </div>
        </div>
    );
}
