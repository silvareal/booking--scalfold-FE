import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";

import { takeMonth } from "./utils";
import languages from "./languages.json";

import * as S from "./Header/styles";

import { CalendarHeader } from "./Calendar/CalendarHeader";
import { Box } from "@mui/material";

function Calendar({
  language,
  bgColor,
  padding,
  borderRadius,
  colorArrows,
  colorTextHeader,
  colorTextDaysOfTheWeek,
  bgMonth,
  colorDays,
  wDay,
  hDay,
  sizeArrow,
  fontWeightMonthAndYear,
  colorSelectDay,
  circleSelectDayColor,
  isContinuous,
  initialDate,
  endDate,
  onClick,
  selectedDates = [],
  getCurrentCalendarDate,
}) {
  const daysWeek =
    language === "pt-BR" ? languages["pt-BR"] : languages["en-US"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [multipleDates, setMultipleDates] = useState([]);

  useEffect(() => {
    getCurrentCalendarDate(currentDate);
  }, [currentDate]);

  const data = takeMonth(currentDate)();

  function getSelectedMultipleDates(date, multipleDates, onClick) {
    const dateExists = multipleDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if (initialDate) {
      if (date < initialDate) {
        return false;
      }
    }

    if (endDate) {
      if (date > addDays(endDate, 1)) {
        return false;
      }
    }

    if (isContinuous) {
      if (multipleDates.length >= 2) {
        return;
      } else {
        if (dateExists) {
          const newDates = multipleDates.filter(
            (d) => format(d, "dd/MM/yyyy") !== format(date, "dd/MM/yyyy")
          );
          setMultipleDates(newDates);
          onClick(undefined);
        } else {
          setMultipleDates([...multipleDates, date]);
          onClick(date);
        }
      }
    } else {
      if (dateExists) {
        const newDates = multipleDates.filter(
          (d) => format(d, "dd/MM/yyyy") !== format(date, "dd/MM/yyyy")
        );
        setMultipleDates(newDates);
        onClick(undefined);
      } else {
        setMultipleDates([...multipleDates, date]);
        onClick(date);
      }
    }
  }

  function getSelectedDates(date, selectedDates) {
    const dateExists = selectedDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if (initialDate) {
      if (date < initialDate) {
        return false;
      }
    }

    if (endDate) {
      if (date > addDays(endDate, 1)) {
        return false;
      }
    }

    if (dateExists) {
      return true;
    }
    return false;
  }

  function getDates(initialDate, stopDate) {
    const dateArray = [];
    let initial = initialDate;
    while (initial <= stopDate) {
      dateArray.push(initial);
      initial = addDays(initial, 1);
    }

    return dateArray;
  }

  function backgroundColorDateMultiple(date) {
    if (isContinuous) {
      const arr = getDates(multipleDates[0], multipleDates[1]);
      const dateExists = arr.find(
        (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
      );

      if (dateExists) {
        return "day-selected";
      }
    }
    const dateExists = multipleDates.find(
      (d) => format(d, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
    );

    if (dateExists) {
      return "day-selected";
    }
  }

  function isFistOfMultipleDates(day) {
    if (multipleDates.length === 1) {
      return "one-item";
    }

    if (String(day) === String(multipleDates[0])) {
      return true;
    }
  }

  function isLastOfMultipleDates(day) {
    if (String(day) === String(multipleDates[multipleDates.length - 1])) {
      return true;
    }
  }

  return (
    <>
      <Box>
        <Box>
          <CalendarHeader
            colorTextHeader={colorTextHeader || "#000"}
            currentDate={currentDate}
            language={language}
            fontWeightMonthAndYear={fontWeightMonthAndYear || "normal"}
            setCurrentDate={setCurrentDate}
            colorArrows={colorArrows || "#000"}
            sizeArrow={sizeArrow || "1rem"}
          />
          <S.DayWeeksSection>
            {daysWeek.map((dayName, i) => (
              <S.DayWeek key={dayName} color={colorTextDaysOfTheWeek}>
                {dayName}
              </S.DayWeek>
            ))}
          </S.DayWeeksSection>
          <S.Month BgColor={bgMonth}>
            {data.map((week) => (
              <S.WeeksSection key={week}>
                {week.map((day) => (
                  <S.Day
                    key={String(day)}
                    onClick={async () => {
                      if (getSelectedDates(day, selectedDates)) {
                        getSelectedMultipleDates(day, multipleDates, onClick);
                      }
                    }}
                    cursor={
                      getSelectedDates(day, selectedDates)
                        ? "pointer"
                        : "not-allowed"
                    }
                    color={`${
                      backgroundColorDateMultiple(day) === "day-selected"
                        ? colorSelectDay
                        : colorDays
                    }`}
                    // fontWeight={`${
                    //   backgroundColorDateMultiple(day) === "day-selected"
                    //     ? "bold"
                    //     : ""
                    // }`}
                    // fontSize={`${
                    //   backgroundColorDateMultiple(day) === "day-selected"
                    //     ? "1.3rem"
                    //     : ""
                    // }`}
                    // width={wDay}
                    // height={hDay}
                  >
                    <S.TextDay
                      onClick={() => {
                        if (getSelectedDates(day, selectedDates)) {
                          getSelectedMultipleDates(day, multipleDates, onClick);
                        }
                      }}
                      color={`${
                        getSelectedDates(day, selectedDates)
                          ? "blue"
                          : backgroundColorDateMultiple(day) === "day-selected"
                          ? colorSelectDay
                          : colorDays
                      }`}
                      fontWeight={`${
                        backgroundColorDateMultiple(day) === "day-selected"
                          ? "bold"
                          : ""
                      }`}
                    >
                      {format(day, "dd")}
                    </S.TextDay>
                    {/* {!isContinuous && (
                      <S.Circle
                        bgColor={circleSelectDayColor}
                        display={`${
                          backgroundColorDateMultiple(day) === "day-selected"
                            ? ""
                            : "none"
                        }`}
                      >
                        {" "}
                      </S.Circle>
                    )}
                    {isContinuous && (
                      <S.ContinuosBackground
                        bgColor={circleSelectDayColor}
                        display={`${
                          backgroundColorDateMultiple(day) === "day-selected"
                            ? ""
                            : "none"
                        }`}
                        borderRadius={
                          isFistOfMultipleDates(day)
                            ? "20px 0px 0 20px"
                            : "0" && isLastOfMultipleDates(day)
                            ? "0 20px 20px 0"
                            : "0"
                        }
                        style={{
                          borderRadius: `${
                            isFistOfMultipleDates(day) === "one-item"
                              ? "20px"
                              : ""
                          }`,
                        }}
                      >
                        {" "}
                      </S.ContinuosBackground>
                    )} */}
                  </S.Day>
                ))}
              </S.WeeksSection>
            ))}
          </S.Month>
        </Box>
      </Box>
    </>
  );
}

export { Calendar };
