import "./styles.css";
import Header from "./Header";
import Table from "./Table";
import Footer from "./Footer";
import usePagination from "./usePagination";
import Spinner from "./Spinner";
// import useFlights from "./useFlights";
// import { useEffect, useState } from "react";
//import dummyDepartures from "./dummy";

const tableRowsCount = 15;
const tablePageDisplayLength = 20 * 1000;

const flightsConfig = {
  type: "departures",
  pageDisplayLength: tablePageDisplayLength,
  timeStamp: new Date().getTime()
};

const departuresHeaders = [
  "Flight No",
  "Date",
  "Time",
  "Destination",
  "Status",
  "Airline",
  "Logo"
];

export default function App() {
  const [departures, currentPage, totalPages, leftToRight] = usePagination(
    tableRowsCount,
    tablePageDisplayLength,
    flightsConfig
  );

  return (
    <div className="App">
      <div className="AppWrapper">
        <Header
          interval={tablePageDisplayLength}
          toggle={leftToRight}
          isLoaded={departures !== null}
        />
        {departures ? (
          <Table
            data={departures}
            headers={departuresHeaders}
            curr={currentPage}
            total={totalPages}
            rows={tableRowsCount}
          />
        ) : (
          <Spinner />
        )}
        <Footer />
      </div>
    </div>
  );
}
