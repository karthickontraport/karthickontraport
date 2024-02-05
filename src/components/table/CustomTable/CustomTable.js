import { style } from "@mui/system";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import styles from "./CustomTable.module.css";

const TableRow = ({ rowData, handleEdit }) => (
  <Tr className={styles.td} onClick={handleEdit}>
    {Object.values(rowData).map((data, index) => (
      <Td key={index} style={{ textAlign: "left", padding: "15px" }}>
        {data}
      </Td>
    ))}
  </Tr>
);

const CustomTable = ({ headers, data, handleEdit }) => {
  return (
    <Table className="custom-table">
      <Thead className={styles.thead}>
        <Tr style={{ height: "40px" }}>
          {headers.map((header, index) => (
            <Th
              key={index}
              className="header-cell"
              style={{ textAlign: "left", padding: "15px" }}
            >
              {header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody style={{ background: "#fff" }}>
        {data.map((entry, index) => (
          <TableRow
            key={index}
            rowData={entry}
            handleEdit={() => handleEdit(entry.id)}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
