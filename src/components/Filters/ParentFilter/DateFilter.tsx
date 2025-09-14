import DateCard from "../ChildFIlter/DateCard";
import styled from "styled-components";
import { FilterName } from "../../FilterPanel";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setDate } from "../../../sliceOrders";

export default function DateFilter() {
  const selectedDate = useSelector((state: RootState) => state.orders.current_day);
  const availableDays = useSelector((state: RootState) => state.orders.available_days);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <FilterName>Дата</FilterName>
      {selectedDate}
      <List>
        {availableDays.map((date) => {
          return (
            <DateCard
              isActive={date === selectedDate}
              date={date}
              key={date}
              onClick={() => dispatch(setDate(date))}
            ></DateCard>
          );
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
