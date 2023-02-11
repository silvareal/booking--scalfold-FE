import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";

import { takeMonth } from "../utils";
import languages from "../languages.json";

import * as S from "../Header/styles";

import { CalendarHeader } from "./CalendarHeader";
import { Box, Skeleton, Typography } from "@mui/material";

function Calendar({
  language,
  colorArrows,
  colorTextHeader,
  colorTextDaysOfTheWeek,
  bgMonth,
  isLoading,
  sizeArrow,
  fontWeightMonthAndYear,
  isContinuous,
  initialDate,
  endDate,
  onClick,
  selectedDates = [],
  getCurrentCalendarDate,
  multipleDates,
  setMultipleDates,
}) {
  const daysWeek =
    language === "pt-BR" ? languages["pt-BR"] : languages["en-US"];
  const [currentDate, setCurrentDate] = useState(new Date());

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

  function isFutureDate(date) {
    return date >= new Date().setHours(0, 0, 0, 0);
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
            {isLoading ? (
              <S.DayWeeksSkeletonLoaderContainer>
                {Array(34)
                  .fill(1)
                  .map((data) => (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={"4em"}
                    />
                  ))}
              </S.DayWeeksSkeletonLoaderContainer>
            ) : (
              data.map((week) => (
                <S.WeeksSection key={week}>
                  {week.map((day) => (
                    <S.Day
                      key={String(day)}
                      onClick={async () => {
                        if (
                          getSelectedDates(day, selectedDates) &&
                          isFutureDate(day)
                        ) {
                          getSelectedMultipleDates(day, multipleDates, onClick);
                        }
                      }}
                      noActiveDate={getSelectedDates(day, selectedDates)}
                      cursor={
                        getSelectedDates(day, selectedDates)
                          ? "pointer"
                          : "not-allowed"
                      }
                      color={`${
                        backgroundColorDateMultiple(day) === "day-selected"
                          ? "#FFFFFF"
                          : getSelectedDates(day, selectedDates)
                          ? "#000000"
                          : "#000000"
                      }`}
                      BgColor={`${
                        backgroundColorDateMultiple(day) === "day-selected"
                          ? "#002F86"
                          : getSelectedDates(day, selectedDates) &&
                            isFutureDate(day)
                          ? "#EBF8FF"
                          : "#FAFAFA"
                      }`}
                    >
                      <p>
                        {format(day, "dd")}
                        {console.log("week", week)}
                      </p>
                    </S.Day>
                  ))}
                </S.WeeksSection>
              ))
            )}
          </S.Month>
        </Box>
      </Box>
    </>
  );
}

export { Calendar };
