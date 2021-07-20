import { useState, useEffect } from "react";
import useToggle from "./useToggle";

const usePagination = (data, perPage, nextInterval) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useToggle();
    let slicedData = null,
        totalPages = 1;

    useEffect(() => {
        // Triggers timeout
        const timeout = setTimeout(() => {
            console.log("timeout");
            setToggle();
            setCurrentPage((curr) => {
                if (curr * perPage < (data?.length || 0)) {
                    return ++curr;
                }
                return 1;
            });
        }, nextInterval);
        return () => {
            // Clear interval on component destruction
            clearTimeout(timeout);
        };
    });

    if (data) {
        slicedData = data.slice((currentPage - 1) * perPage, currentPage * perPage);
        totalPages = Math.ceil(data.length / perPage);
    }

    return [slicedData, currentPage, totalPages, toggle];
};

export default usePagination;
