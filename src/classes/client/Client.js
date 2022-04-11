const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class Client {
  constructor({ first_name, last_name, club_member_id, phone_number, email }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number || null;
    this.email = email || null;
  }

  get first_name() {
    return this._first_name;
  }

  get last_name() {
    return this._last_name;
  }

  get phone_number() {
    return this._phone_number;
  }

  get email() {
    return this._email;
  }

  set first_name(first_name) {
    this._first_name = first_name;
  }

  set last_name(last_name) {
    this._last_name = last_name;
  }

  set phone_number(phone_number) {
    this._phone_number = phone_number;
  }

  set email(email) {
    this._email = email;
  }
}
