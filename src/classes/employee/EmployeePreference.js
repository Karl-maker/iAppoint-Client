const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class EmployeePreference {
  constructor(employee_id) {
    this.lunch_time = null;
    this.employee_id = employee_id;
  }

  get lunch_time() {
    return this._lunch_time;
  }

  get employee_id() {
    return this.employee_id;
  }

  set lunch_time(lunch_time) {
    // 12pm / 1pm

    this._lunch_time = lunch_time;
  }

  updateLunchTime(access_token) {
    return fetch(`${BACKEND_URL}/api/employee_preference`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        lunch_time: this._lunch_time,
      },
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        throw error;
      });
  }

  fetchEmployeePreference() {
    return fetch(`${BACKEND_URL}/api/employee_preference`, {
      method: "GET",
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
}
