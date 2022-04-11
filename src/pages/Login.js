import GuardPage from "../context/GuardPage";
import { useContext, useState } from "react";
import { EmployeeContext } from "../context/ContextProvider";
import { TextField, CircularProgress, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const EmployeeService = useContext(EmployeeContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      await EmployeeService.user.login(credentials.email, credentials.password);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
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
            <h1 className="display-6">Login if you are an Employee</h1>
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
            <TextField
              className="m-2"
              id="password-input"
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
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
                handleLogin(e);
              }}
              disableElevation
            >
              {loading ? <CircularProgress color="inherit" /> : <>Log in</>}
            </Button>
            <p className="text-muted mt-1" style={{ fontSize: "12px" }}>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </GuardPage>
  );
}
