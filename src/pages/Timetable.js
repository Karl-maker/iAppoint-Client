import { useState, useContext, useEffect } from "react";
import Calender from "../components/calender/widget";
import { EmployeeContext } from "../context/ContextProvider";
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import SlotWidget from "../components/slot/sorter";
import Employee from "../classes/employee/Employee";
import { datePresentation, formatDate } from "../utils/date";
import Loading from "../template/Loading";
import EmployeesList from "../components/employee/list";

const steps = ["Select employee", "Set date", "Enter information"];

export default function Timetable() {
  const EmployeeService = useContext(EmployeeContext);

  const [credentials, setCredentials] = useState({
    date_of_appointment: null,
    description: "",
    title: "",
    employee_id: EmployeeService.user.id || "",
    client: {
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    },
  });
  const [date, setDate] = useState(new Date());
  const [employee, setEmployee] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [appointmentSlots, setAppointmentSlots] = useState([]);

  const handleEmployeeSelect = (employee) => {
    setEmployee(employee);
    setCredentials((prevState) => ({
      ...prevState,
      employee_id: employee.id,
    }));
    setActiveStep(1);
  };

  const handleSelectSlot = (time, avaliablity) => {
    if (avaliablity) {
      setCredentials((prevState) => ({
        ...prevState,
        date_of_appointment: time,
      }));
      setActiveStep(2);
    }
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/appointments?month=${
        date.getMonth() + 1
      }&day=${date.getDate()}&year=${date.getFullYear()}&page_number=${0}&page_size=${20}&employee_id=${
        credentials.employee_id
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
        let date_list = [];

        for (let i = 0; i < response.appointments[0].data.length; i++) {
          date_list.push(
            new Date(
              response.appointments[0].data[i].date_of_appointment
            ).getTime()
          );
          /*

          appointment slot needs to have a collection or widget that:

          1. creates list from each our apart from start time to end time and one hour apart
          2. select slot and get back time info to create appointment
          3. block off slot that is already taken

          */
        }

        // Get Lunch Time

        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/lunch-time/${credentials.employee_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            date_list.push(
              new Date(date.setHours(result.time || 12, 0, 0)).getTime()
            );

            setAppointmentSlots(date_list);
          })
          .catch((error) => {
            // If no lunch default is 12
            console.log(error);
            date_list.push(new Date(date.setHours(12, 0, 0)).getTime());
            setAppointmentSlots(date_list);
          });
      })
      .catch(() => {});
  }, [date, credentials.employee_id]);

  const submitAppointment = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SelectDate = () => {
    return (
      <>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-12 mt-2">
            <Calender value={date} onChange={setDate} />
          </div>

          <div className="col-lg-6 col-md-12 mt-5">
            {date.getDay() !== 0 && date.getDay() !== 6 ? (
              <SlotWidget
                date={date}
                start={8}
                end={date.getDay() !== 5 ? 15 : 16}
                times={appointmentSlots}
                handleSelect={handleSelectSlot}
              />
            ) : (
              <div className="text-center">
                Not Allowed To Set Appointment on Sunday or Saturday
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step
              sx={{ "&$css-opt7yd-MuiStepIcon-text": { color: "#ffff" } }}
              key={label}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {activeStep === 0 && (
        <div className="mt-3">
          <h3 className="display-5 mb-4">List of Employees</h3>
          <EmployeesList handleSelect={handleEmployeeSelect} />
        </div>
      )}
      {activeStep === 1 && <SelectDate />}
      {activeStep === 2 && (
        <>
          <div className=" mt-2">
            {employee && employee.displayProfileChip({ borderWidth: "1px" })}
            {credentials.date_of_appointment && (
              <Chip
                className="mx-1"
                label={`${formatDate(credentials.date_of_appointment)} ${
                  datePresentation(credentials.date_of_appointment).hour
                }${datePresentation(credentials.date_of_appointment).amOrpm}`}
              />
            )}
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <TextField
                key="title"
                size="small"
                label="Title"
                variant="outlined"
                value={credentials.title}
                onChange={(e) => {
                  setCredentials((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <TextField
                sx={{
                  height: "100px",
                }}
                fullWidth
                key="description"
                size="large"
                label="Description"
                variant="outlined"
                value={credentials.description}
                onChange={(e) => {
                  setCredentials((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <hr style={{ marginTop: "0px" }} />
          <p className="text-center  mt-3">Client Information</p>
          <div className="row mt-2">
            <div className="col-6">
              <TextField
                key="First Name"
                size="small"
                label="First Name"
                variant="outlined"
                value={credentials.client.first_name}
                onChange={(e) => {
                  setCredentials((prevState) => ({
                    ...prevState,
                    client: { ...prevState.client, first_name: e.target.value },
                  }));
                }}
              />
            </div>
            <div className="col-6">
              <TextField
                key="Last Name"
                size="small"
                label="Last Name"
                variant="outlined"
                value={credentials.client.last_name}
                onChange={(e) => {
                  setCredentials((prevState) => ({
                    ...prevState,
                    client: { ...prevState.client, last_name: e.target.value },
                  }));
                }}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <TextField
                key="Email"
                size="small"
                label="Email"
                variant="outlined"
                value={credentials.client.email}
                onChange={(e) => {
                  setCredentials((prevState) => ({
                    ...prevState,
                    client: { ...prevState.client, email: e.target.value },
                  }));
                }}
              />
            </div>
            <div className="col-6">
              <TextField
                key="Phone Number"
                size="small"
                label="Phone Number"
                variant="outlined"
                value={credentials.client.phone_number}
                onChange={(e) => {
                  setCredentials((prevState) => ({
                    ...prevState,
                    client: {
                      ...prevState.client,
                      phone_number: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <Button onClick={submitAppointment}>Create Appointment</Button>
          </div>
        </>
      )}
    </div>
  );
}
