import { createContext, useState, useEffect } from "react";
import EmployeeUser from "../classes/employee/EmployeeUser";
import useLocalStorage from "../utils/useLocalStorage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../template/Loading";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#55efc4",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#00b894",
    },
  },
});

export const EmployeeContext = createContext({});
export const ThemeContext = createContext({});

export function ContextProvider({ children }) {
  const employee = new EmployeeUser({});
  const [user, setUser] = useState(employee);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Attempt to login

    user.authenticate().then(() => {
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  return (
    <Loading loading={loading}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <EmployeeContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={theme}>{children}</div>
          </ThemeContext.Provider>
        </EmployeeContext.Provider>
      </ThemeProvider>
    </Loading>
  );
}
