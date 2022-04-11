import { Chip, Avatar } from "@mui/material";
import EmployeePreference from "./EmployeePreference";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Employee {
  constructor({
    first_name,
    last_name,
    employee_id,
    phone_number,
    email,
    department,
    profile_image,
    _id,
    id,
  }) {
    this._id = id || _id || "";
    this._first_name = first_name || "";
    this._last_name = last_name || "";
    this._employee_id = employee_id || "";
    this._phone_number = phone_number || "";
    this._email = email || "";
    this._department = department || "";
    this._profile_image = profile_image || "";
  }

  // Getters

  get first_name() {
    return this._first_name;
  }

  get last_name() {
    return this._last_name;
  }

  get profile_image() {
    if (this._profile_image) {
      return `${BACKEND_URL}${this._profile_image}`;
    }

    return "";
  }

  get department() {
    return this._department;
  }

  get preferences() {
    return new EmployeePreference(this._employee_id);
  }

  get id() {
    return this._id;
  }

  set first_name(first_name) {
    this._first_name = first_name;
  }

  fetchEmployeeInfo(id) {
    return fetch(`${BACKEND_URL}/api/employee/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        throw error;
      });
  }

  // JSX

  displayProfilePicture(size) {
    if (this.profile_image)
      return (
        <div>
          <a href={this.profile_image} target="_blank" rel="noreferrer">
            <Avatar
              alt={`${this.first_name} ${this.last_name}`}
              src={this.profile_image}
              sx={{
                height: size,
                width: size,
              }}
            />
          </a>
        </div>
      );

    return (
      <Avatar>
        {this.first_name.toUpperCase().charAt(0) ||
          this._email.toUpperCase().charAt(0)}
      </Avatar>
    );
  }

  displayProfileChip({ borderWidth }) {
    return (
      <>
        <Chip
          avatar={this.displayProfilePicture(23)}
          variant="outlined"
          sx={{
            borderWidth,
          }}
          label={`${this.first_name || this._email} ${this.last_name || ""}`}
        />
      </>
    );
  }
}
