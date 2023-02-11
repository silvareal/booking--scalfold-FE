import styled from "styled-components";

// interface CalendarSectionProps {
//   backgroudColor?: string;
//   padding?: string;
//   borderRadius?: string;
// }

// interface MonthAndYearSectionProps {
//   color?: string;
//   fontWeightMonthAndYear?:
//     | "bold"
//     | "normal"
//     | "bolder"
//     | "lighter"
//     | "initial"
//     | "inherit";
// }

export const CalendarSection = styled.div`
  background: ${(props) => props.backgroudColor || "#FFF"};
  padding: ${(props) => props.padding || "10px"};
  border-radius: ${(props) => props.borderRadius || "5px"};
`;

export const DayWeeksSection = styled.div`
  display: grid;
  gap: 5px 5px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayWeeksSkeletonLoaderContainer = styled.div`
  display: grid;
  gap: 5px 5px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
`;

export const WeeksSection = styled.div`
  display: grid;
  gap: 5px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
`;

// interface DayWeekProps {
//   color?: string;
// }

export const DayWeek = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  justify-content: center;
  padding-top: 6px;
  padding-right: 10px;
  color: ${(props) => props.color || "#000"};
`;

// interface MonthProps {
//   BgColor?: string;
// }

export const Month = styled.div`
  margin-top: 10px;
  border-radius: 4px;
  background-color: ${(props) => props.BgColor || "#FFF"};
`;

// interface DayProps {
//   color?: string;
//   BgColor?: string;
//   borderColor?: string;
//   borderRadius?: string;
//   height?: string;
//   width?: string;
//   bgColor?: string;
//   fontWeight?: string;
//   fontSize?: string;
//   cursor?: string;
// }

export const Day = styled.div`
  position: relative;
  height: ${(props) => props.height || "4em"};
  width: ${(props) => props.width || "100%"};
  display: flex;
  align-items: center;
  justify-content: left;
  align-items: flex-end;
  margin-bottom: 5px;
  background-color: ${(props) => props.BgColor || "#FAFAFA"};
  cursor: ${(props) => props.cursor || "pointer"};
  transition: 0.5s;
  user-select: no-select;

  &:hover {
    opacity: ${(props) => (props.noActiveDate ? "0.7" : "")};
  }

  "&.selectedDay" {
    background-color: ${(props) => props.BgColor || "blue"};
    color: ${(props) => props.color || "black"};
  }

  p {
    font-size: ${(props) => props.fontSize || "1em"};
    font-weight: ${(props) => props.fontWeight || "500px"};
    color: ${(props) => props.color || "#FFF"};
    padding: 8px;
    display: flex;
    line-height: 0px;
  }
`;
