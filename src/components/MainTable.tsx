import styled from "styled-components";
import ExampleTables from "../ExampleTables.json";
import TablesCeil from "./TablesCeil";
type Times = {
  restaurant: {
    opening_time: string;
    closing_time: string;
  };
};
const mokdata: Times = {
  restaurant: {
    opening_time: "11:00", // Время открытия (на основе этого строится таблица)
    closing_time: "23:40", // Время закрытия (на основе этого строится таблица)
  },
};
// 23:40 - 11:00 = 12:40
function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
const openTime = toMinutes(mokdata.restaurant.opening_time);
const closeTime = toMinutes(mokdata.restaurant.closing_time);
const diff = Math.floor((closeTime - openTime) / 30);
const timeArr: string[] = [];

for (let i = openTime; i < closeTime; i += 30) {
  const h = String(Math.trunc(i / 60));
  const m = String(i % 60).padStart(2, "0");
  const time = `${h}:${m}`;
  timeArr.push(time);
}
console.log(timeArr);

const { tables } = ExampleTables;

export default function MainTable() {
  return (
    <Wrapper className="container">
      <BoardWrapper>
        <TimeBar>
          {timeArr.map((time) => {
            return <TimesCeil key={time}>{time}</TimesCeil>;
          })}
        </TimeBar>
        <Board>
          {tables.map((table) => {
            return <TablesCeil key={table.id} data={table}></TablesCeil>;
          })}
        </Board>
      </BoardWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  overflow: hidden;
`;
const Board = styled.div`
  display: grid;
  grid-auto-rows: 40px;
  grid-auto-columns: 80px;
  padding-right: 20px;
  background-attachment: local;
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 80px 40px, 80px 40px;
  background-position: 80px 0, 0 40px;
  grid-template-rows: repeat(26, 40px);
  grid-template-columns: repeat(auto-fit, 80px);
`;
const BoardWrapper = styled.div`
  display: flex;
  overflow: scroll;
  height: 70vh;
`;
const TimeBar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1b1b1d;
  width: 32px;
  position: sticky;
  left: 10px;
`;
const TimesCeil = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.48);
  padding-top: 40px;
  height: 40px;
  padding-right: 1px;
  margin-right: -1px;
`;
