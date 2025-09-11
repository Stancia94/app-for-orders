import styled from "styled-components";
import ExampleTables from "../ExampleTables.json";
import TablesCeil from "./TablesCeil";
import Order from "./Order";
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

function getOriginalTime(iso: string): string {
  const match = iso.match(/T(\d{2}:\d{2})/);
  return match ? match[1] : "";
}
const { tables } = ExampleTables;

const allOrder = tables.reduce((acc, table) => {
  acc = [...acc, ...table.orders];
  return acc;
}, [] as (typeof tables)[number]["orders"]);

allOrder.map((order) => {
  order.start_time = getOriginalTime(order.start_time);
  order.end_time = getOriginalTime(order.end_time);
});
console.log(allOrder);

type Table = (typeof tables)[number];

const allTable = tables.reduce<Omit<Table, "orders">[]>((acc, table) => {
  const { orders, ...rest } = table;
  acc.push(rest);
  return acc;
}, []);

const matrix = [];
for (let i = 0; i < diff; i++) {
  const row = new Array(allTable.length).fill(0);
  matrix.push(row);
}
console.log(matrix);
// [0][0]
// [0][1]
const matrixEx = [
  //     индекс
  // время [1, 2, 3],
  [4, 3, 5],
  [6, 7, 8],
];

export default function MainTable() {
  return (
    <Wrapper className="container">
      <XWrapper>
        <TimeBar>
          {timeArr.map((time) => {
            return <TimesCeil key={time}>{time}</TimesCeil>;
          })}
        </TimeBar>
        <YWrapper>
          <TableBar>
            {allTable.map((table) => {
              return <TablesCeil key={table.id} data={table}></TablesCeil>;
            })}
          </TableBar>
          <Board>
            <Order></Order>
          </Board>
        </YWrapper>
      </XWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  overflow: hidden;
`;
const TableBar = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #1b1b1d;
  padding-left: 40px;
  margin-left: -40px;
`;
const YWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;
const Board = styled.div`
  display: grid;
  background-attachment: local;
  position: relative;
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 80px 40px, 80px 40px;
  background-position: 80px 0, 0 40px;
  grid-template-rows: repeat(${diff + 1}, 40px);
  grid-template-columns: repeat(${tables.length}, 80px);
`;
const XWrapper = styled.div`
  display: flex;
  overflow: scroll;
  height: 70vh;
  scrollbar-width: thin;
`;
const TimeBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 32px;
  position: sticky;
  left: 0;
  padding-top: 40px;
  height: fit-content;
`;
const TimesCeil = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.48);
  min-height: 40px;
`;
