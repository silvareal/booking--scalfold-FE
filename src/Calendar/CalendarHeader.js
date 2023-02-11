import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { nextMonth, oldMonth } from "../utils";
import { Box, IconButton, Typography } from "@mui/material";

export function CalendarHeader({
  currentDate,
  language,
  colorTextHeader,
  fontWeightMonthAndYear,
  setCurrentDate,
  colorArrows,
  sizeArrow,
}) {
  const onChangePreviousMonth = () => {
    const old = oldMonth(currentDate);
    setCurrentDate(old);
  };
  const onChangeNextMonth = () => {
    const next = nextMonth(currentDate);
    setCurrentDate(next);
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <IconButton
        size="medium"
        sx={{
          background: "#FAFAFA",
        }}
        onClick={onChangePreviousMonth}
      >
        <AiOutlineArrowLeft
          size={sizeArrow || "15"}
          color={`${colorArrows}` || "#000"}
          className={"text-2xl"}
        />
      </IconButton>

      <Box
        fontWeightMonthAndYear={fontWeightMonthAndYear}
        color={colorTextHeader}
      >
        <Typography fontWeight={700} color={"#676767"}>
          {format(currentDate, "MMMM", {
            locale: language === "pt-BR" ? ptBR : enUS,
          })}{" "}
          {format(currentDate, "yyyy")}
        </Typography>
      </Box>

      <IconButton
        sx={{
          background: "#FAFAFA",
        }}
        size="medium"
        onClick={onChangeNextMonth}
      >
        <AiOutlineArrowRight
          size={sizeArrow || "12"}
          color={`${colorArrows}` || "#000"}
        />
      </IconButton>
    </Box>
  );
}
