import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridComponent({ columns, rows }) {
  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        disableColumnSorting
        disableColumnMenu
      />
    </div>
  );
}
