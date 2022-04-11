export default class AppointmentNote {
  constructor({ employee_id, appointment_id, content, _id }) {
    this._employee_id = employee_id || "";
    this._appointment_id = appointment_id || "";
    this._content = content || "";
    this._id = _id || "";
  }

  get employee_id() {
    return this._employee_id;
  }

  get appointment_id() {
    return this._appointment_id;
  }

  get content() {
    return this._content;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  set employee_id(employee_id) {
    this._employee_id = employee_id;
  }

  set appointment_id(appointment_id) {
    this._appointment_id = appointment_id;
  }

  set content(content) {
    this._content = content;
  }

  create() {
    const body = {
      appointment_id: this._appointment_id,
      content: this._content,
      employee_id: this._employee_id,
    };

    return fetch(`${BACKEND_URL}/api/appointment_note`, {
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

  update() {
    const body = {
      appointment_id: this._appointment_id,
      content: this._content,
      employee_id: this._employee_id,
    };

    return fetch(`${BACKEND_URL}/api/appointment_note/${this._id}`, {
      method: "PUT",
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
    return fetch(`${BACKEND_URL}/api/appointment_note/${this._id}`, {
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
}
