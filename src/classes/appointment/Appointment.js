const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Appointment {
  constructor({
    title,
    description,
    client,
    status,
    date_of_appointment,
    createdAt,
    employee_id,
    employee,
    _id,
    confirmed,
    notes,
  }) {
    this._id = _id;
    this._title = title || "";
    this._description = description || "";
    this._client = client || {};
    this._date_of_appointment = date_of_appointment || "";
    this._created_at = createdAt || "";
    this._employee_id = employee_id || "";
    this._status = status || "pending";
    this._notes = notes || null;
    this._employee = employee || {};
  }

  // Getters

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get notes() {
    return this._notes;
  }

  get description() {
    return this._description;
  }

  get client() {
    return this._client;
  }

  get date_of_appointment() {
    return this._date_of_appointment;
  }

  get created_at() {
    return this._created_at;
  }

  get employee_id() {
    return this._employee_id;
  }

  get status() {
    return this._status;
  }

  get employee() {
    return this._employee[0];
  }

  set title(title) {
    this._title = title;
  }

  set description(description) {
    this._description = description;
  }

  set client(client) {
    this._client = client;
  }

  set date_of_appointment(date_of_appointment) {
    this._date_of_appointment = date_of_appointment;
  }

  set employee_id(employee_id) {
    this._employee_id = employee_id;
  }

  create() {
    const body = {
      title: this._title,
      description: this._description,
      client: this._client,
      date_of_appointment: this._date_of_appointment,
      employee_id: this._employee_id,
    };

    return fetch(`${BACKEND_URL}/api/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        throw error;
      });
  }

  delete() {
    return fetch(`${BACKEND_URL}/api/appointment/${this._id}`, {
      method: "DELETE",
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

  update(body, access_token) {
    return fetch(`${BACKEND_URL}/api/appointment/${this._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        throw error;
      });
  }
}
