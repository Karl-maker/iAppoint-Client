import { datePresentation } from "../../utils/date";
import { Chip } from "@mui/material";

export default function Slot({ avaliable, time, handleSelect }) {
  return (
    <div
      style={{ display: "table", overflow: "hidden" }}
      onClick={() => {
        handleSelect(time, avaliable);
      }}
    >
      <Chip
        color="primary"
        avatar={
          <h5
            style={{
              marginTop: "16px",
              marginRight: "2px",
              marginLeft: "5px",
              backgroundColor: "transparent",
            }}
          >
            {datePresentation(time).hour}
            {datePresentation(time).amOrpm}
          </h5>
        }
        label={avaliable ? <>Avaliable</> : <>Not Avaliable</>}
        variant={avaliable ? "outlined" : ""}
      />
    </div>
  );
}
