import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {ROUTES} from "../modules/routes";

const sidebarItems = [
  { name: "Dashboard", icon: <HomeIcon />, navigation: ROUTES.DASHBOARD },
  { caption: "Expense" }, 
  { name: "Add Expense", icon: <AddCardIcon />, navigation: ROUTES.ADD_EXPENSE },
  { name: "All Expense", icon: <AccountBalanceWalletIcon />, navigation: ROUTES.ALL_EXPENSE },
  { caption: "Category" }, 
  { name: "Add Category", icon: <AddCircleIcon />, navigation: ROUTES.ADD_CATEGORY },
  { name: "All Categories", icon: <CategoryIcon />, navigation: ROUTES.ALL_CATEGORIES },
];

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
  variant="permanent"
  open={open}
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
      width: drawerWidth,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
      },
    }),
    ...(!open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8) + 1,
      },
      "& .MuiDrawer-paper": {
        width: theme.spacing(7) + 1,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(8) + 1,
        },
      },
    }),
  }}
>
  <DrawerHeader>
    <IconButton onClick={() => setOpen(!open)}>
      {theme.direction === "rtl" ? (
        open ? <ChevronRightIcon /> : <ChevronLeftIcon />
      ) : (
        open ? <ChevronLeftIcon /> : <ChevronRightIcon />
      )}
    </IconButton>
  </DrawerHeader>
  <Divider />
  <List>
    {sidebarItems.map((item, index) => {
      if (item.caption) {
        return (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemText primary={item.caption} sx={{ pl: 3, opacity: open ? 1 : 0 }} />
          </ListItem>
        );
      } else {
        return (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate(item.navigation)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: theme.direction === "rtl" && open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: theme.direction === "rtl" && open ? "auto" : 3,
                  ml: theme.direction === "rtl" && open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        );
      }
    })}
  </List>
</Drawer>

    </Box>
  );
}
