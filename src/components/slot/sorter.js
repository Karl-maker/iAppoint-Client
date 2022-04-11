import { useState, useEffect } from "react";
import Slot from "./widget";

export default function SlotWidget({
  date,
  start,
  end,
  times,
  handleSelect,
  timeSlot,
}) {
  const start_time = new Date(date.setHours(start, 0, 0));
  const end_time = new Date(date.setHours(end, 0, 0));

  const hours = Math.abs(start_time - end_time) / 36e5;
  const [slots, setSlots] = useState(new Array(hours).fill({ taken: false }));

  useEffect(() => {
    setSlots(
      [...slots].map((object, i) => {
        if (
          times.includes(
            new Date(start_time.getTime() + i * 60 * 60 * 1000).getTime()
          )
        ) {
          return {
            ...object,
            taken: true,
          };
        } else return object;
      })
    );
  }, [times, date]);

  return (
    <>
      <ul
        style={{
          margin: "0px",
          padding: "0px",
        }}
      >
        {slots.map((slot, index) => (
          <li
            key={index}
            style={{ float: "left", marginRight: "5px", marginBottom: "5px" }}
          >
            <Slot
              handleSelect={handleSelect}
              avaliable={!slot.taken}
              time={new Date(start_time.getTime() + index * 60 * 60 * 1000)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
