import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CardComponent from "../components/CardComponent";

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

  return (
    <>
      <CardComponent title={"All Categories"}>
        <div className="table">
          <Paper
            sx={{
              boxShadow: "none",
              width: "100%",
              overflow: "hidden",
              margin: "0",
              marginTop: "2vh",
              height: "66vh",
              border: "none",
            }}
          >
            <TableContainer sx={{ maxHeight: 640 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell align="center">{category.id}</TableCell>
                      <TableCell align="center">{category.name}</TableCell>
                      <TableCell align="center">
                        {category.description}
                      </TableCell>
                      <TableCell align="center">
                        <button
                          className="tableButton"
                          onClick={() => handleCategoryEdit(category.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="tableButton"
                          onClick={() => handleCategoryDelete(category.id)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </CardComponent>
    </>
  );
}
