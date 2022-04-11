import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Appointments from "../../pages/Appointments";
import Timetable from "../../pages/Timetable";
import Settings from "../../pages/Settings";
import Appointment from "../../pages/Appointment";

export default function PageNavigation() {
  return (
    <Routes>
      <Route path="/" caseSensitive={false} element={<Home />} />
      <Route path="/about" caseSensitive={false} element={<About />} />
      <Route path="/login" caseSensitive={false} element={<Login />} />
      <Route path="/register" caseSensitive={false} element={<Register />} />
      <Route
        path="/appointments"
        caseSensitive={false}
        element={<Appointments />}
      />
      <Route
        path="/create-appointment"
        caseSensitive={false}
        element={<Timetable />}
      />
      <Route path="/settings" caseSensitive={false} element={<Settings />} />
      <Route
        path="/appointment/:id"
        caseSensitive={false}
        element={<Appointment />}
      />
    </Routes>
  );
}
