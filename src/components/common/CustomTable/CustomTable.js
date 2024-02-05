import React from "react";
import { Table } from "antd";
import { AutoSizer } from "react-virtualized";
import style from "./CustomTable.module.css";

const CustomTable = ({ columns, rowKey, data, loading, onRowClick }) => {
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

  return (
    <div>
      <AutoSizer style={{ width: "auto" }}>
        {({ height, width }) => (
          <Table
            virtual
            bordered
            dataSource={data}
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
            scroll={{ y: (height = "100vh") }}
            components={{
              body: {
                cell: (props) => <td {...props} />,
              },
            }}
            onRow={rowProps}
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
