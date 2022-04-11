import { BottomNavigationAction, BottomNavigation, Paper } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { MdEventAvailable, MdAddCircleOutline } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { ThemeContext } from "../context/ContextProvider";

export default function BottomNav() {
  const navigate = useNavigate();
  const themeService = useContext(ThemeContext);
  const navButtonsStyle = {
    color: themeService.theme === "light" ? "#2f3640" : "white",
    fontSize: 20,
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: themeService.theme === "light" ? "#f5f6fa" : "#2f3640",
        color: themeService.theme === "light" ? "#2f3640" : "white",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels={true}
        value={null}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        sx={{
          backgroundColor:
            themeService.theme === "light" ? "#f5f6fa" : "#2f3640",
          color: themeService.theme === "light" ? "#2f3640" : "white",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<RiHome2Line />}
          onClick={() => {
            navigate("/");
          }}
          sx={navButtonsStyle}
        />
        <BottomNavigationAction
          label="Appointments"
          icon={<MdEventAvailable />}
          onClick={() => {
            navigate("/appointments");
          }}
          sx={navButtonsStyle}
        />
        <BottomNavigationAction
          label="Create"
          icon={<MdAddCircleOutline />}
          onClick={() => {
            navigate("/create-appointment");
          }}
          sx={navButtonsStyle}
        />

        <BottomNavigationAction
          label="Settings"
          icon={<FiSettings />}
          onClick={() => {
            navigate("/settings");
          }}
          sx={navButtonsStyle}
        />
      </BottomNavigation>
    </Paper>
  );
}
