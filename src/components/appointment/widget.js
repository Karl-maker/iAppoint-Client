import { datePresentation } from "../../utils/date";
import { BiTimeFive } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "../../classes/employee/Employee";

export default function AppointmentWidget({
  text_color,
  appointment,
  displayProfile,
}) {
  let navigate = useNavigate();

  const date = new Date(appointment.date_of_appointment);
  const [expand, setExpand] = useState(false);
  const [statusColor, setStatusColor] = useState("primary");
  const [employee] = useState(new Employee(appointment.employee));

  useEffect(() => {
    if (appointment.status === "success") {
      setStatusColor("success");
    } else if (appointment.status === "cancelled") {
      setStatusColor("danger");
    }
  }, []);

  return (
    <div
      style={{
        borderRadius: "15px",
        border: "0.5px solid",
        borderColor: "#dfe6e9",
        padding: "10px",
      }}
      className="container-flush pull-down"
    >
      <div className="row">
        <div className="col-9 text-wrap">
          {displayProfile ? (
            <>
              {employee && (
                <>
                  <div className="mb-2">
                    {employee.displayProfileChip({ borderWidth: "0px" })}
                  </div>
                </>
              )}
            </>
          ) : (
            <>{appointment.title}</>
          )}
        </div>
        <div
          className="col-3 text-wrap text-end text-muted "
          style={{ fontSize: "12px" }}
        >
          <BiTimeFive className="mx-1 mb-1" />
          {`${datePresentation(date).hour}${datePresentation(date).amOrpm}`}
        </div>
      </div>

      {displayProfile && (
        <div className="row">
          <div className="col-12 text-wrap">{appointment.title}</div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-2 text-start mt-2">
          {!expand ? (
            <IoMdArrowDropdown
              onClick={(e) => {
                setExpand(true);
              }}
            />
          ) : (
            <IoMdArrowDropup
              onClick={(e) => {
                setExpand(false);
              }}
            />
          )}
        </div>
        <div className="col-10 text-end flex-d">
          {/*

          Buttons
          
        */}

          <Chip
            label="view appointment"
            size="small"
            className="mx-2"
            variant="outlined"
            onClick={(e) => {
              navigate(`/appointment/${appointment.id}`);
            }}
            sx={{
              color: text_color,
              svg: text_color,
            }}
            icon={<GrFormView />}
          />

          <Chip
            label={appointment.status}
            size="small"
            color={"primary"}
            sx={{
              color: "white",
            }}
          />
        </div>
      </div>
      {expand && <div className="mt-2">{appointment.description}</div>}
    </div>
  );
}
