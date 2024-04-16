import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import DataGridComponent from "../components/DataGridComponent";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
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

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <button
            className="tableButton"
            onClick={() => handleCategoryEdit(params.row.id)}
          >
            Edit
          </button>
          <button
            className="tableButton"
            onClick={() => handleCategoryDelete(params.row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    action: "",
  }));

  return (
    <>
      <CardComponent title={"All Categories"}>
        <DataGridComponent columns={columns} rows={rows} />
      </CardComponent>
    </>
  );
}
