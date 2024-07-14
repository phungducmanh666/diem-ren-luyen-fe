import React from "react";
import DataTable from "react-data-table-component";
import SubHeader from "./subHeader/SubHeader";
import { IoIosArrowDown } from "react-icons/io";

function CustomeDataTable({ onSearch, columns, data, searchText, ...props }) {
  return (
    <DataTable
      {...props}
      columns={columns}
      data={data}
      subHeader
      subHeaderComponent={
        <SubHeader searchText={searchText} onSearch={onSearch} size="sm" />
      }
      sortIcon={<IoIosArrowDown />}
      highlightOnHover
      pointerOnHover
      responsive
      pagination
      paginationServer
    />
  );
}

export default CustomeDataTable;
