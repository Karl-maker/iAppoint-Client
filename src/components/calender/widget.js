import Calendar from "react-calendar";
import "../../css/Calendar.css";

export default function Calender({ value, onChange }) {
  return (
    <div style={{ width: "100%" }}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
