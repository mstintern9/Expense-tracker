import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const categoryId = parseInt(id);
      const storedCategories =
        JSON.parse(localStorage.getItem("categories")) || [];
      const categoryData = storedCategories.find(
        (item) => item.id === categoryId
      );
      if (categoryData) {
        setCategory(categoryData.name);
        setDescription(categoryData.description);
      }
    }
  }, [id, isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    const newCategory = {
      id: generateRandomId(),
      name: category,
      description: description 
    };
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = [...storedCategories, newCategory];
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    navigate("/all-categories");
  }

  function handleUpdate(e) {
    e.preventDefault();
    const categoryId = parseInt(id);
    const updatedCategory = {
      id: categoryId,
      name: category,
      description: description 
    };
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const updatedCategories = storedCategories.map((item) =>
      item.id === categoryId ? updatedCategory : item
    );
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    navigate("/all-categories");
  }

  function handleChange(e) {
    setDescription(e.target.value);
  }

  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={{ marginLeft: "27vh" }} className="add-Expense">
          <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="label">Category:</label>
              <input
                className="inputs"
                type="text"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="label">Description:</label>
              <input
                className="inputs"
                type="text"
                value={description} 
                placeholder="Enter Description..."
                onChange={handleChange}
              />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <button className="button">
                {isEditing ? "Update Category" : "Add Category"}
              </button>
              {isEditing && (
                <button
                  className="button"
                  onClick={() => navigate("/all-categories")}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </Box>
    </>
  );
}
