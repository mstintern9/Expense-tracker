import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  const handleCategoryEdit = (id) => {
    navigate(`/add-category/${id}`);
  };

  const handleCategoryDelete = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{marginLeft:"27vh" ,display:"flex", flexDirection:"column"}}>
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
                      <button onClick={() => handleCategoryEdit(category.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleCategoryDelete(category.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
    </>
  );
}
