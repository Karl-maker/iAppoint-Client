import { EmployeeContext } from "../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import GuardPage from "../context/GuardPage";
import Appointment from "../classes/appointment/Appointment";
import AppointmentList from "../components/appointment/list";
import DatePicker from "react-datepicker";
import { Chip } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import Loading from "../template/Loading";
import ErrorBoundary from "../components/error/ErrorBoundary";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Appointments() {
  const EmployeeService = useContext(EmployeeContext);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [myAppointmentsOnly, setMyAppointmentsOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentInfo, setAppointmentInfo] = useState({
    amount: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    fetch(
      `${BACKEND_URL}/api/appointments?month=${
        date.getMonth() + 1
      }&day=${date.getDate()}&year=${date.getFullYear()}&page_number=${pageNumber}&page_size=${10}${
        myAppointmentsOnly && `&employee_id=${EmployeeService.user.id}`
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
          data_list.push(new Appointment(response.appointments[0].data[i]));
        }

        setAppointments(data_list);
        setAppointmentInfo({
          amount: response.appointments[0].metadata[0].total,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [date, myAppointmentsOnly]);

  return (
    <GuardPage condition={EmployeeService.user.authenticated} redirect="/login">
      <Loading loading={loading}>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-5">
              <p className="text-muted" style={{ fontSize: "12px" }}>{`${
                appointmentInfo.amount
              } appointments on ${formatDate(date)}`}</p>
            </div>
            <div className="col-3 text-end">
              {myAppointmentsOnly ? (
                <Chip
                  onClick={() => {
                    setMyAppointmentsOnly(false);
                  }}
                  sx={{
                    fontSize: "12px",
                  }}
                  variant="outlined"
                  label={`mine`}
                  size="small"
                  icon={
                    <FaUserAlt style={{ fontSize: "12px", padding: "2px" }} />
                  }
                />
              ) : (
                <Chip
                  onClick={() => {
                    setMyAppointmentsOnly(true);
                  }}
                  sx={{
                    fontSize: "12px",
                  }}
                  variant="outlined"
                  label={`all`}
                  size="small"
                  icon={
                    <FaUserFriends
                      style={{ fontSize: "12px", padding: "2px" }}
                    />
                  }
                />
              )}
            </div>
            <div className="col-4 text-md-start text-lg-end">
              <DatePicker
                className="datepicker"
                selected={date}
                onChange={(date: Date) => setDate(date)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <ErrorBoundary>
                <AppointmentList
                  appointments={appointments}
                  displayProfile={true}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </Loading>
    </GuardPage>
  );
}
