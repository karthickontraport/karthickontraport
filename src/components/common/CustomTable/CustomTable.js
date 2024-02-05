import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { AutoSizer } from "react-virtualized";
import style from "./CustomTable.module.css";

const CustomTable = ({ columns, rowKey, data, loading, onRowClick }) => {
  const [tableHeight, setTableHeight] = useState(window.innerHeight - 350);

  const handleResize = () => {
    setTableHeight(window.innerHeight - 350);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Run only once on component mount

  const handleRowClick = (record) => {
    if (onRowClick) {
      onRowClick(record, record[rowKey]);
    }
  };

  const rowProps = (record) => {
    return {
      onClick: () => handleRowClick(record),
    };
  };

  // Ensure data has at least 50 rows
  const extendedData =
    data.length < 50 ? [...data, ...Array(50 - data.length).fill({})] : data;

  return (
    <div>
      <AutoSizer style={{ width: "auto", height: tableHeight }}>
        {({ height, width }) => (
          <Table
            virtual
            bordered
            dataSource={extendedData}
            rowKey={(record) => record[rowKey]}
            pagination={{
              position: ["bottomCenter"],
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: 50,
              pageSizeOptions: [],
              total: data.length,
              spin: loading,
            }}
            scroll={{ y: height }}
            components={{
              body: {
                cell: (props) => <td {...props} />,
              },
            }}
            onRow={rowProps}
            rowClassName={style.even}
          >
            {columns.map((col) => (
              <Table.Column
                key={col.id}
                title={col.label}
                dataIndex={col.dataIndex}
                width={col.width}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default CustomTable;
