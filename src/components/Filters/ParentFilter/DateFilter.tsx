import DateCard from "../ChildFIlter/DateCard";
import { MONTHS_GENITIVE } from "../../../constant";
import styled from "styled-components";
import { FilterName } from "../../FilterPanel";
type AvailableDate = {
  available_days: string[];
};
const mokdata: AvailableDate = {
  available_days: ["2025-04-04", "2025-04-05", "2025-04-06", "2025-04-07", "2025-04-08"],
};
mokdata.available_days = mokdata.available_days.map((date) => {
  const parseDateArr = date.split("-");
  const parsedDate = `${parseInt(parseDateArr[2])} ${MONTHS_GENITIVE[parseInt(parseDateArr[1]) - 1]}`;
  return parsedDate;
});
export default function DateFilter() {
  return (
    <Wrapper>
      <FilterName>Дата</FilterName>
      <List>
        {mokdata.available_days.map((date) => {
          return <DateCard date={date} key={date}></DateCard>;
        })}
      </List>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;
const List = styled.div`
  display: flex;
  column-gap: 8px;
`;
