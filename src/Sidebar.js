import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { sidebarItems } from "./modules/sidebar";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent">
      <Divider />
      <List>
        {sidebarItems.map((item, index) => {
          if (item.caption) {
            return (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemText
                  primary={item.caption}
                  sx={{ pl: 3 }}
                />
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
                    justifyContent: "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
