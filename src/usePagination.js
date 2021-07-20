import { useState, useEffect } from "react";
import useFlights from "./useFlights";
import useToggle from "./useToggle";

const usePagination = (perPage, nextInterval) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());
  const [isTrue, setIsTrue] = useToggle();
  const [flights] = useFlights("departures", timeStamp);
  let slicedData = null,
    totalPages = 0,
    currPage = 0;

  useEffect(() => {
    // Triggers timeout
    const timeout = setTimeout(() => {
      setIsTrue();
      setCurrentPage((curr) => {
        if (curr + perPage < flights.length) {
          return curr + perPage;
        }
        setTimeStamp(new Date().getTime());
        return 0;
      });
    }, nextInterval);
    return () => {
      // Clear interval on component destruction
      clearTimeout(timeout);
    };
  });

  if (flights) {
    slicedData = flights.slice(currentPage, currentPage + perPage);
    totalPages = Math.ceil(flights.length / perPage);
    currPage = currentPage / perPage + 1;
  }

  return [slicedData, currPage, totalPages, isTrue];
};

export default usePagination;
