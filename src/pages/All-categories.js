import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import DataGridComponent from "../components/DataGridComponent";
import "./allcategories.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    { field: "name", headerName: "Name", width: 320,headerClassName: "header-cell" },
    { field: "description", headerName: "Description", width: 320 ,headerClassName: "header-cell" },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <>
          <button
            className="tableButton"
            onClick={() => handleCategoryEdit(params.row.id)}
          >
            <EditIcon />
          </button>
          <button
            className="tableButton"
            onClick={() => handleCategoryDelete(params.row.id)}
          >
            <DeleteIcon />
          </button>
        </>
      ),
      headerClassName: "action-cell",
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
