// App.js

import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "./App.css";
import { format } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { allTimezone } from "./Provider";

function Session() {
  const { id } = useParams();
  const [currentDay, setCurrentDay] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [currentIntervals, setCurrentIntervals] = useState([]);
  const yearMonth = format(currentCalendarDate, "yyyy-MM");
  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [multipleDates, setMultipleDates] = useState([]);

  const [form, setForm] = useState({
    status: "APPROVED",
    timeZone: timezone,
    slots: [],
  });

  const addTime = (time) => {
    setForm({
      ...form,
      slots: [
        ...form.slots,
        {
          time: new Date(time).toISOString(),
          status: "COMPLETED",
        },
      ],
    });
  };

  const getSession = async () => {
    axios
      .get("http://localhost:3000/session")
      .then(function (response) {
        console.log(response.data);
        setSessions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSchedule = async (yearMonth) => {
    setIsLoading(true);
    axios
      .post(`http://localhost:3000/session/schedule/${id}`, {
        timeZone: timezone,
        yearMonth,
      })
      .then(function (response) {
        console.log(response.data);
        setSchedules(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSchedule(yearMonth);
  }, [currentCalendarDate]);

  const saveDate = async () => {
    axios
      .post("http://localhost:3000/session", {
        ...form,
      })
      .then(function (response) {
        console.log(response);
        setForm({
          status: "APPROVED",
          timeZone: "Africa/Lagos",
          slots: [],
        });

        getSchedule(yearMonth);
        setCurrentDay();
        setMultipleDates([]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSession();
    getSchedule(yearMonth);
  }, []);

  const availableDates = schedules?.map((e) => new Date(e.date)) || [];

  useEffect(() => {
    setCurrentIntervals(
      currentDay !== undefined
        ? schedules?.find(
            (d) =>
              format(new Date(`${d.date}`), "dd/MM/yyyy") ===
              format(currentDay, "dd/MM/yyyy")
          )?.intervals
        : []
    );
  }, [currentDay]);

  return (
    <div
      className="app"
      style={{ maxWidth: "500px", margin: "0 auto", width: "100%" }}
    >
      <h1 className="text-center">
        Akoma Calendar -- <u>{currentDay && currentDay.toDateString()}</u>
      </h1>

      <Calendar
        onClick={(date) => {
          setCurrentDay(date);
        }}
        multipleDates={multipleDates}
        setMultipleDates={setMultipleDates}
        isLoading={isLoading}
        getCurrentCalendarDate={setCurrentCalendarDate}
        selectedDates={availableDates}
      />

      {currentDay ? (
        <div>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={600}>Available Time Slot</Typography>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  boxShadow: "none",
                  padding: "0px",

                  "& .MuiOutlinedInput-notchedOutline ": {
                    border: "none",
                  },

                  "& .MuiSelect-select": {
                    color: "#0356B2",
                    fontWeight: "600",
                    textDecoration: "underline",
                  },
                },
              }}
              fullWidth
              style={{ maxWidth: "300px" }}
              select
              value={timezone}
              onChange={(e) => {
                setTimezone(e.target.value);
                getSchedule(yearMonth);
              }}
            >
              {allTimezone.map(({ name, value }) => (
                <MenuItem key={value} value={value}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box display="flex" gap={1} flexWrap={"wrap"}>
            {currentIntervals.length >= 1 ? (
              currentIntervals?.map((day) => (
                <Button
                  variant={
                    form?.slots.find((slot) => slot.time === day.slots)
                      ? "contained"
                      : "outlined"
                  }
                  disabled={day.status === "unavailable"}
                  onClick={() => addTime(day.slots)}
                >
                  {format(new Date(day.slots), "p")}
                </Button>
              ))
            ) : (
              <Typography textAlign={"center"}>No Availability</Typography>
            )}
          </Box>
        </div>
      ) : null}

      <div
        style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
      >
        {form?.slots?.map((slot) => (
          <div>{format(new Date(slot.time), "PPpp")}</div>
        ))}
      </div>

      <Button
        onClick={saveDate}
        style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
      >
        submit
      </Button>

      <div style={{ marginTop: "20px" }}>
        Booked session <button onClick={getSession}>Refresh</button>
      </div>
      <div>
        <table>
          <tr>
            <th>id</th>
            <th>timezone</th>
            <th>slots</th>
          </tr>

          {sessions?.map((session) => (
            <tr>
              <td>{session.id}</td>
              <td>{session.timeZone}</td>
              <td>
                {session.slots.map((slot) =>
                  format(new Date(slot.time), "PPpp (z)")
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Session;
