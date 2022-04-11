import { EmployeeContext } from "../context/ContextProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DrawerButton from "./DrawerButton";

export default function Header() {
  const employeeService = useContext(EmployeeContext);
  let navigate = useNavigate();

  const handleLoginButton = (e) => {
    navigate("/login");
  };

  function profileDrawer() {
    return (
      <>
        <div className="row m-3">
          <div className="col-12 d-flex justify-content-center">
            {employeeService.user.displayProfilePicture(130)}
          </div>
        </div>
        <hr />
        <div className="row">
          <Button
            onClick={(e) => {
              employeeService.user.logout().then(() => {
                navigate("/login");
              });
            }}
          >
            Log Out
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-10 text-start p-0 m-0">
        <p
          className="m-0"
          onClick={(e) => {
            navigate("/");
          }}
        >
          iAppoint
        </p>
      </div>

      <div className="col-2 d-flex justify-content-end p-0">
        {employeeService.user.authenticated ? (
          <DrawerButton anchor="right" element={profileDrawer()}>
            {employeeService.user.displayProfilePicture(90)}
          </DrawerButton>
        ) : (
          <Button onClick={handleLoginButton}>LOGIN</Button>
        )}
      </div>
    </>
  );
}
