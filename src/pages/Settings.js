import GuardPage from "../context/GuardPage";
import { EmployeeContext } from "../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Loading from "../template/Loading";
import MenuButton from "../template/MenuButton";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Settings() {
  const EmployeeService = useContext(EmployeeContext);
  const [timePreference, setTimePreference] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/lunch-time/${EmployeeService.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTimePreference(response.time || 12);
        setLoading(false);
      })
      .catch((err) => {
        setTimePreference(12);
        setLoading(false);
      });
  }, []);

  const updateLunchPreference = (time) => {
    fetch(`${BACKEND_URL}/api/lunch-time`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EmployeeService.user.access_token}`,
      },
      body: JSON.stringify({ time }),
    })
      .then((response) => response.json())
      .then((response) => {
        setTimePreference(response.time);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <GuardPage condition={EmployeeService.user.authenticated} redirect="/login">
      <Loading loading={loading}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3 className="display-3">Set Lunch Time</h3>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <p className="">
                Currently your lunch time is set at
                {timePreference === 13 ? (
                  " 1PM"
                ) : (
                  <>{timePreference === 12 ? " 12PM" : " 11AM"}</>
                )}
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <MenuButton
                list={[
                  {
                    label: "11AM",
                    activity: () => {
                      setLoading(true);
                      updateLunchPreference(11);
                    },
                  },
                  {
                    label: "12PM",
                    activity: () => {
                      setLoading(true);
                      updateLunchPreference(12);
                    },
                  },
                  {
                    label: "1PM",
                    activity: () => {
                      setLoading(true);
                      updateLunchPreference(13);
                    },
                  },
                ]}
              >
                <Button>Select Lunch Time</Button>
              </MenuButton>
            </div>
          </div>
        </div>
      </Loading>
    </GuardPage>
  );
}
