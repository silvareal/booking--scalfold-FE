import {
  Button,
  Checkbox,
  Container,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
// import "react-calendar/dist/Calendar.css";

export default function Provider() {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const initialRules = days.map((day) => {
    return {
      weekDay: day,
      type: "WEEK_DAY",
      checked: day === "sunday" || day === "saturday" ? false : true,
      intervals: [
        {
          startDate: "09:00",
          endDate: "17:00",
        },
      ],
    };
  });
  const [timezone, setTimezone] = useState("Africa/Lagos");

  const initialData = {
    name: "availability",
    timeZone: timezone,
    rules: [...initialRules],
  };

  const [form, setForm] = useState(initialData);

  const addSchedule = async () => {
    const formattedRules = form.rules.reduce((acc, current) => {
      if (current.checked) {
        acc.push({
          weekDay: current.weekDay,
          type: current.type,
          intervals: [...current.intervals],
        });
      }
      return acc;
    }, []);

    const newForm = { ...form, rules: [...formattedRules] };
    await axios
      .post(`http://localhost:3000/session/schedule`, {
        ...newForm,
      })
      .then(function (response) {
        console.log(response.data);
        setForm(initialData);
        alert(
          "availaibilty created, availabilityId is: " +
            response.data.schedule.id
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChangeCheked = (e) => {
    const { checked, name } = e.target;
    setForm((prev) => {
      let formData = { ...prev };
      eval(`formData.${name} = ${checked}`);
      return formData;
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => {
      let formData = { ...prev };
      eval(`formData.${name} = value`);
      return formData;
    });
  };

  const addTimeInterval = (i) => {
    setForm((prev) => {
      let formData = { ...prev };
      formData.rules[i].intervals.push({
        startDate: "09:00",
        endDate: "17:00",
      });
      return formData;
    });
  };

  return (
    <Container my={3}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <h1>Availability</h1>
          <TextField
            label="Timezone"
            fullWidth
            style={{ maxWidth: "300px" }}
            select
            className="mb-4"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {allTimezone.map(({ name, value }) => (
              <MenuItem key={value} value={value}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          {days.map((day, i) => (
            <div key={i}>
              <Box mt={3}>
                <Typography textTransform={"uppercase"}>{day}</Typography>
              </Box>
              <Stack alignItems={"start"} direction={"row"} gap={3}>
                <Checkbox
                  onChange={onChangeCheked}
                  checked={form.rules[i].checked}
                  name={`rules[${i}].checked`}
                  label={day}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2",
                    }}
                  >
                    {form?.rules?.[i]?.intervals?.map(
                      (interval, intervalIndex) => (
                        <div
                          key={intervalIndex}
                          style={{ marginBottom: "8px" }}
                        >
                          <TextField
                            label="Start TIme"
                            type="time"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300,
                            }}
                            name={`rules[${i}].intervals[${intervalIndex}].startDate`}
                            onChange={onChange}
                            value={
                              form.rules[i].intervals[intervalIndex].startDate
                            }
                          />

                          <TextField
                            label="End Time"
                            type="time"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            name={`rules[${i}].intervals[${intervalIndex}].endDate`}
                            inputProps={{
                              step: 300,
                            }}
                            onChange={onChange}
                            value={
                              form.rules[i].intervals[intervalIndex].endDate
                            }
                          />
                        </div>
                      )
                    )}
                  </div>

                  <IconButton onClick={() => addTimeInterval(i)} title="add">
                    +
                  </IconButton>
                </div>
              </Stack>
            </div>
          ))}
        </div>

        <div>
          <h1>Override Date</h1>
        </div>
      </div>

      <Button onClick={addSchedule}>Submit Schedule</Button>
    </Container>
  );
}

export const allTimezone = [
  { name: "Africa/Lagos (GMT +01:00)", value: "Africa/Lagos" },
  { name: "Africa/Harare (GMT +02:00)", value: "Africa/Harare" },
  { name: "Africa/Kigali (GMT +02:00)", value: "Africa/Kigali" },
  { name: "Africa/Accra (GMT +00:00)", value: "Africa/Accra" },
  { name: "America/New_York(GMT -05:00)", value: "America/New_York" },
  { name: "(America/Chicago) GMT -6", value: "America/Chicago" },
  { name: "(America/Los_Angeles) GMT -8", value: "America/Los_Angeles" },
  { name: "(America/Anchorage) GMT -9", value: "America/Anchorage" },
  { name: "(Pacific/Honolulu) GMT -10", value: "Pacific/Honolulu" },
  { name: "(Europe/London) GMT +0", value: "Europe/London" },
];
