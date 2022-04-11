import Loading from "../../template/Loading";
import { useState, useEffect } from "react";
import Employee from "../../classes/employee/Employee";

export default function EmployeesList({ handleSelect }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let data_list = [];
        for (let i = 0; i < response.employees[0].data.length; i++) {
          data_list.push(new Employee(response.employees[0].data[i]));
        }
        setEmployees(data_list);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Loading loading={loading}>
      <ul style={{ paddingLeft: "0px" }}>
        {employees.map((employee) => {
          return (
            <li
              key={employee.id}
              onClick={() => {
                handleSelect(employee);
              }}
            >
              {employee.displayProfileChip({ borderWidth: "0px" })}
            </li>
          );
        })}
      </ul>
    </Loading>
  );
}
