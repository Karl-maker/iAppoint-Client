import Employee from "./Employee";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class EmployeeUser extends Employee {
  constructor() {
    super({});
    this._authenticated = false;
    this._access_token = "";
  }

  // Getters

  get authenticated() {
    return this._authenticated;
  }

  get access_token() {
    return this._access_token;
  }

  async login(email, password) {
    return fetch(`${BACKEND_URL}/api/employee/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          const { email, _id, first_name, last_name } = data.employee;
          this._email = email;
          this._id = _id;
          this._last_name = last_name || "";
          this._first_name = first_name || "";
          this._access_token = data.access_token;
          this._authenticated = true;
        } else {
          throw data;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  logout() {
    return fetch(`${BACKEND_URL}/api/employee/authenticate`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "API-Key",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this._authenticated = false;
      })
      .catch((error) => {
        throw error;
      });
  }

  register(email, password, confirm_password) {
    // Check if passwords match

    if (password !== confirm_password) {
      throw new Error({ message: "Passwords need to match" });
    }

    return fetch(`${BACKEND_URL}/api/employee/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        throw error;
      });
  }

  authenticate() {
    return fetch(`${BACKEND_URL}/api/employee/authenticate`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "API-Key",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          this._access_token = data.access_token;
          return fetch(`${BACKEND_URL}/api/employee`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this._access_token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const { email, _id, first_name, last_name } = data;
              this._email = email;
              this._id = _id;
              this._last_name = last_name || "";
              this._first_name = first_name || "";
              this._authenticated = true;
            })
            .catch((error) => {
              throw error;
            });
        } else {
          // Not logged in
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
