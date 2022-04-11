import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Appointment from "../classes/appointment/Appointment";
import Loading from "../template/Loading";
import { AiFillFolderOpen } from "react-icons/ai";
import { Card, Chip } from "@mui/material";
import { DisplayUnknownObjectWithNoKey } from "../utils/display-text/display-unknown-data";
import { formatDate, datePresentation } from "../utils/date";
import MenuButton from "../template/MenuButton";
import { EmployeeContext } from "../context/ContextProvider";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AppointmentPage() {
  const EmployeeService = useContext(EmployeeContext);
  let { id } = useParams();

  const [appointment, setAppointment] = useState({});
  const [client, setClient] = useState(<></>);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/appointment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setAppointment(new Appointment(response.appointment[0]));
        setClient(
          DisplayUnknownObjectWithNoKey(response.appointment[0].client)
        );
        setStatus(response.appointment[0].status);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (status) => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/appointment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EmployeeService.user.access_token}`,
      },
      body: JSON.stringify(status),
    })
      .then((response) => response.json())
      .then((response) => {
        setStatus(response.appointment.status);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Loading loading={loading}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4">Appointment</h1>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <p className="">{appointment.title}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <p className="">{appointment.description}</p>
          </div>
        </div>

        <Card variant="outlined" className="p-2">
          <div className="row">
            <div className="col-12">
              <p className="">
                <AiFillFolderOpen
                  style={{
                    color: "#fdcb6e",
                    marginRight: "2px",
                    fontSize: "18px",
                    marginBottom: "2px",
                  }}
                />
                Client Info
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="">{client}</p>
            </div>
          </div>
        </Card>

        <div className="row mt-2">
          <div className="col-12">
            <MenuButton
              list={[
                {
                  label: "Active",
                  activity: () => {
                    setLoading(true);
                    handleUpdate({ status: "active" });
                  },
                },
                {
                  label: "Cancel",
                  activity: () => {
                    setLoading(true);
                    handleUpdate({ status: "cancelled" });
                  },
                },
                {
                  label: "Complete",
                  activity: () => {
                    setLoading(true);
                    handleUpdate({ status: "completed" });
                  },
                },
                {
                  label: "Confirm",
                  activity: () => {
                    setLoading(true);
                    handleUpdate({ status: "confirmed" });
                  },
                },
              ]}
            >
              <Chip
                style={{ float: "left" }}
                label={status}
                size="small"
                variant="outlined"
                sx={{
                  color: "black",
                  marginRight: "2px",
                  marginTop: "2px",
                }}
              />
            </MenuButton>

            <Chip
              label={formatDate(new Date(appointment.date_of_appointment))}
              size="small"
              sx={{
                color: "black",
                marginRight: "2px",
              }}
            />

            <Chip
              label={`
                ${
                  datePresentation(new Date(appointment.date_of_appointment))
                    .hour
                }
                ${
                  datePresentation(new Date(appointment.date_of_appointment))
                    .amOrpm
                }
              `}
              size="small"
              sx={{
                color: "black",
              }}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
}
