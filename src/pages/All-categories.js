import React from "react";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
export default function AllCategories({
  categories,
  onCategoryEdit,
  onCategoryDelete,
}) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ display: "flex",flexDirection:"column" }}>
          <h1>All categories</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td align="center">{category.id}</td>
                    <td align="center">{category.name}</td>
                    <td align="center">
                    <button onClick={()=> onCategoryEdit(category.id)} >Edit</button>
                      <button onClick={() => onCategoryDelete(category.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      </Box>
    </>
  );
}
