import { useContext } from "react";
import { ThemeContext } from "../../context/ContextProvider";
import AppointmentWidget from "./widget";

export default function AppointmentList({ appointments, displayProfile }) {
  const themeService = useContext(ThemeContext);

  if (appointments.length <= 0)
    return (
      <p className="text-center mt-5">
        ¯\_ (ツ)_/¯
        <br />
        No Appointments Avaliable
      </p>
    );

  return (
    <ul style={{ paddingLeft: "0px" }}>
      {appointments.map((appointment) => (
        <li key={appointment.id} style={{ marginTop: "10px" }}>
          <AppointmentWidget
            displayProfile={displayProfile || false}
            appointment={appointment}
            text_color={themeService.theme === "light" ? "#2d3436" : "white"}
          />
        </li>
      ))}
    </ul>
  );
}
