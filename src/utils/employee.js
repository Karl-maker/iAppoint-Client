import Employee from "../classes/employee/Employee";

export function convertListToEmployeeObjects(list, length) {
  let listOfEmployees = [];
  for (let i = 0; i < length; i++) {
    listOfEmployees.push(new Employee(list[i]));
  }

  return listOfEmployees;
}

export function displayCollectionAvatars(max, employeeList) {
  const listItems = employeeList.map((employee) => (
    <li>{employee.displayProfilePicture(23)}</li>
  ));

  return (
    <AvatarGroup max={max}>
      {/*

        Render list of profile pictures
        
    */}
      {listItems}
    </AvatarGroup>
  );
}
