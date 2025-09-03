import styled from "styled-components";
import "../utils.css";
import ZoneFilter from "./Filters/ParentFilter/ZoneFilter";
import DateFilter from "./Filters/ParentFilter/DateFilter";
export default function FilterPanel() {
  return (
    <Wrapper className="container">
      <Heading>Бронирования</Heading>
      <ZoneFilter></ZoneFilter>
      <DateFilter></DateFilter>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  padding-top: 32px;
  column-gap: 16px;
`;
const Heading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;
