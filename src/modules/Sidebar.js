import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ROUTES } from "./routes";

export const sidebarItems = [
  { name: "Dashboard", icon: <HomeIcon />, navigation: ROUTES.DASHBOARD },
  { caption: "Expense" },
  {
    name: "Add Expense",
    icon: <AddCardIcon />,
    navigation: ROUTES.ADD_EXPENSE,
  },
  {
    name: "All Expense",
    icon: <AccountBalanceWalletIcon />,
    navigation: ROUTES.ALL_EXPENSE,
  },
  { caption: "Category" },
  {
    name: "Add Category",
    icon: <AddCircleIcon />,
    navigation: ROUTES.ADD_CATEGORY,
  },
  {
    name: "All Categories",
    icon: <CategoryIcon />,
    navigation: ROUTES.ALL_CATEGORIES,
  },
];
