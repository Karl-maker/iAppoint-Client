import GuardPage from "../context/GuardPage";
import { useContext, useState } from "react";
import { EmployeeContext } from "../context/ContextProvider";
import { TextField, CircularProgress, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const EmployeeService = useContext(EmployeeContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    try {
      await EmployeeService.user.register(
        credentials.email,
        credentials.password,
        credentials.confirm_password
      );
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <GuardPage condition={!EmployeeService.user.authenticated} redirect="/">
      <div className="container-flush">
        <div className="row">
          <div className="col-12 mt-5 text-center">
            <h1 className="display-4">Welcome To iAppoint</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3 text-center">
            <h1 className="display-6">Register if you are an Employee</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center mt-4 px-5">
            <TextField
              id="email-input"
              size="small"
              label="Email"
              variant="outlined"
              className="m-2"
              value={credentials.email}
              onChange={(e) => {
                setCredentials((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 text-center mt-2 px-5">
            <TextField
              id="password-input"
              size="small"
              label="Password"
              variant="outlined"
              className="m-2"
              value={credentials.password}
              onChange={(e) => {
                setCredentials((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
            <TextField
              id="confirm-password-input"
              size="small"
              label="Confirm Password"
              variant="outlined"
              className="m-2"
              value={credentials.confirm_password}
              onChange={(e) => {
                setCredentials((prevState) => ({
                  ...prevState,
                  confirm_password: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-2 px-5">
            <p
              className="text-center"
              style={{
                fontSize: "10px",
                color: "#c0392b",
                padding: "0px",
                margin: "0px",
              }}
            >
              {error && error.message}
            </p>
            <Button
              className="mt-4"
              variant="contained"
              sx={{
                borderRadius: "5px",
                borderColor: "transparent",
                width: "222.8px",
                color: "#ffff",
              }}
              onClick={(e) => {
                setLoading(true);
                handleSignUp(e);
              }}
              disableElevation
            >
              {loading ? <CircularProgress color="inherit" /> : <>Sign Up</>}
            </Button>
            <p className="text-muted mt-1" style={{ fontSize: "12px" }}>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </GuardPage>
  );
}
