import React, { useEffect, useRef, useState } from "react";

const Pagination = ({ curr, total }) => (
  <div className="pagination">{`${curr} / ${total}`}</div>
);

const Table = ({ data, headers, curr, total, rowsCount, ...rest }) => {
  const [tableHeight, setTableHeight] = useState("0px");
  let wrapperRef = useRef(null);
  const paginationH = 32;
  const headerH = 32;
  const borderH = 1;
  const borderW = headers.length;

  useEffect(() => {
    const getBodyRowHeight = (wrapperHeight) =>
      wrapperHeight - headerH - paginationH;
    setTableHeight(getBodyRowHeight(wrapperRef.current.clientHeight));
  }, [rowsCount]);

  const styles = {
    tableCell: {
      borderBottom: `${borderH}px solid #7e0c6e50`,
      width: `calc(100% / ${borderW})`
    },
    bodyRow: { height: `${tableHeight / rowsCount}px` },
    headerRow: {
      height: `${headerH}px`,
      backgroundColor: "#7e0c6e",
      color: "white"
    }
  };

  return (
    <div ref={wrapperRef} className="tableWrapper" {...rest}>
      <table>
        <thead>
          <tr style={styles.headerRow}>
            {data && headers.map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => (
              <tr key={row} style={styles.bodyRow}>
                {row.map((v, i, arr) =>
                  i !== 0 ? (
                    <td key={v.slice(0, 5) + i} style={styles.tableCell}>
                      {v || "-"}
                    </td>
                  ) : (
                    <td key={v.slice(0, 5) + i} style={styles.tableCell}>
                      <img
                        src={v}
                        width="83px"
                        height="24px"
                        alt={arr[i - 1]}
                      />
                    </td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination curr={curr} total={total} />
    </div>
  );
};

export default Table;
