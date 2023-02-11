import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClear,
} from "react-icons/ai";
import { nextMonth, oldMonth } from "../utils";
import * as S from "./styles";

export function Header({
  currentDate,
  language,
  colorTextHeader,
  fontWeightMonthAndYear,
  setCurrentDate,
  colorArrows,
  sizeArrow,
}) {
  return (
    <>
      <S.HeaderSection>
        <S.MonthAndYearSection
          fontWeightMonthAndYear={fontWeightMonthAndYear}
          color={colorTextHeader}
        >
          <h1>
            {format(currentDate, "MMMM", {
              locale: language === "pt-BR" ? ptBR : enUS,
            })}
          </h1>
          <h1>{format(currentDate, "yyyy")}</h1>
        </S.MonthAndYearSection>
        <S.ButtonsSection>
          <button
            onClick={() => {
              const old = oldMonth(currentDate);
              setCurrentDate(old);
            }}
          >
            <AiOutlineArrowLeft
              size={sizeArrow || "15"}
              color={`${colorArrows}` || "#000"}
              className={"text-2xl"}
            />
          </button>
          <button
            onClick={() => {
              const next = nextMonth(currentDate);
              setCurrentDate(next);
            }}
          >
            <AiOutlineArrowRight
              size={sizeArrow || "15"}
              color={`${colorArrows}` || "#000"}
            />
          </button>
        </S.ButtonsSection>
      </S.HeaderSection>
    </>
  );
}
