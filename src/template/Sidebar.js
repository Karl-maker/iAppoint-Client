import { ThemeContext } from "../context/ContextProvider";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

export default function SideBar() {
  const themeService = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: themeService.theme === "light" ? "#f5f6fa" : "#2f3640",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="col-12 text-center pt-5">
        <IconButton
          aria-label="home"
          onClick={() => {
            navigate("/");
          }}
        >
          <RiHome2Line className="m-2" />
        </IconButton>
      </div>

      <div className="col-12 text-center pt-5">
        <IconButton
          aria-label="create"
          onClick={() => {
            navigate("/create-appointment");
          }}
        >
          <MdAddCircleOutline className="m-2" />
        </IconButton>
      </div>

      <div className="col-12 text-center pt-5">
        <IconButton
          aria-label="appointments"
          onClick={() => {
            navigate("/appointments");
          }}
        >
          <BsCalendarCheck className="m-2" />
        </IconButton>
      </div>

      <div className="col-12 text-center pt-5">
        <IconButton
          aria-label="settings"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <FiSettings className="m-2" />
        </IconButton>
      </div>
    </div>
  );
}
