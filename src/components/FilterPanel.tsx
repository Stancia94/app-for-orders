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
export const Card = styled.button<{ $active: boolean }>`
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $active }) => ($active ? "#007AFF" : "rgba(255, 255, 255, 0.04)")};
  height: 36px;
  font-size: 11px;
`;

export const FilterName = styled.div`
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 4px;
  line-height: 14px;
`;
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  column-gap: 16px;
`;
const Heading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 16px;
`;
