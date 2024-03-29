import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddCategory({ onCategoryAdd }) {
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const isEditing = !!id;
  const navigate=useNavigate(); 

  useEffect(() => {
    const categoryId = parseInt(id);
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoryData = storedCategories.find(item => item.id === categoryId);
    
    if (categoryData) {
      setCategory(categoryData.name); 
    }
  }, [id]);

  useEffect(() => {
    if (category !== "") {
      const categoryId = parseInt(id); 
      const updatedCategory = { id: categoryId, name: category };
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
      const updatedCategories = storedCategories.map(item => {
        if (item.id === categoryId) {
          return updatedCategory;
        }
        return item;
      });
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  }, [category, id]);

  function handleSubmit(e) {
    e.preventDefault();
    const newCategory = { id: generateRandomId(), name: category };
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = [...storedCategories, newCategory];
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    onCategoryAdd(newCategory);
    setCategory("");
  }

  function handleUpdate(e) {
    e.preventDefault();
    const categoryId = parseInt(id); 
    const updatedCategory = { id: categoryId, name: category };
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = storedCategories.map(item => {
      if (item.id === categoryId) { 
        return updatedCategory;
      }
      return item;
    });
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    navigate("/all-categories")
  }

  function handleChange(e) {
    setCategory(e.target.value);
  }

  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="add-Expense">
            <h1>{isEditing ? "Update Category" : "Add Category"}</h1>
            <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Add a category:</label>
                <input
                  style={{ width: "25vh" }}
                  type="text"
                  value={category}
                  onChange={handleChange}
                />
              </div>
              <div className="button">
                <button style={{ width: "14vh", marginTop: "1vh" }}>
                  {isEditing ? "Update Category" : "Add Category"}
                </button>
                {isEditing && (
                  <button
                    style={{ width: "14vh", marginTop: "1vh", marginLeft: "1rem" }}
                    onClick={handleSubmit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
}
