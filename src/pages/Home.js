import { EmployeeContext } from "../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import GuardPage from "../context/GuardPage";
import Appointment from "../classes/appointment/Appointment";
import AppointmentList from "../components/appointment/list";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Home() {
  const EmployeeService = useContext(EmployeeContext);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState({
    amount: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    fetch(
      `${BACKEND_URL}/api/appointments?month=${
        date.getMonth() + 1
      }&day=${date.getDate()}&year=${date.getFullYear()}&page_number=${pageNumber}&page_size=${10}&employee_id=${
        EmployeeService.user.id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        let data_list = [];

        for (let i = 0; i < response.appointments[0].data.length; i++) {
          setAppointments((appointment) => [
            ...appointment,
            new Appointment(response.appointments[0].data[i]),
          ]);
        }

        setAppointmentInfo({
          amount: response.appointments[0].metadata[0].total,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <GuardPage condition={EmployeeService.user.authenticated} redirect="/login">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4">{`Upcoming Appointments`}</h1>
            <p className="text-muted" style={{ fontSize: "12px" }}>{`${
              appointmentInfo.amount
            } results on ${formatDate(date)}`}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <AppointmentList appointments={appointments} />
          </div>
        </div>
      </div>
    </GuardPage>
  );
}
