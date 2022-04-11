import { useEffect } from "react";
import EmployeeUser from "../../classes/employee/EmployeeUser";

export default () => {
  const employee = new EmployeeUser();

  useEffect(() => {});

  return <h1>{employee.displayProfileChip()}</h1>;
};
