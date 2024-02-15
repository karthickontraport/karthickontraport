import React from "react";
import { Skeleton } from "@mui/material";
import "./TableSkeleton.module.css";

const TableSkeleton = () => {
  return (
    <table className="table">
      <thead>
        <tr className="headerRow">
          <th>
            {" "}
            <Skeleton variant="text" width="25%" />
          </th>
          <th>
            {" "}
            <Skeleton variant="text" width="25%" />
          </th>
          <th>
            {" "}
            <Skeleton variant="text" width="25%" />
          </th>
          <th>
            {" "}
            <Skeleton variant="text" width="25%" />
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(12)].map((_, index) => (
          <tr key={index}>
            <td className="cell">
              <Skeleton variant="text" />
            </td>
            <td className="cell">
              <Skeleton variant="text" />
            </td>
            <td className="cell">
              <Skeleton variant="text" />
            </td>
            <td className="cell">
              <Skeleton variant="text" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
