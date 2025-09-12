import styled from "styled-components";
import ExampleTables from "../ExampleTables.json";
import TablesCeil from "./TablesCeil";
import Order from "./Order";
import { toMinutes, getOriginalTime } from "../utils";
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

const opentTimeRestaurant = toMinutes(mokdata.restaurant.opening_time);
const closeTime = toMinutes(mokdata.restaurant.closing_time);

const diff = Math.floor((closeTime - opentTimeRestaurant) / 30);
const timeArr: string[] = [];

for (let i = opentTimeRestaurant; i < closeTime; i += 30) {
  const h = String(Math.trunc(i / 60));
  const m = String(i % 60).padStart(2, "0");
  const time = `${h}:${m}`;
  timeArr.push(time);
}
const { tables } = ExampleTables;
const timeScale = 40 / 30;

const tablesFormat = tables.map((table) => ({
  ...table,
  orders: table.orders.map((order) => ({
    ...order,
    level: 0,
    startTimeMinutes: toMinutes(getOriginalTime(order.start_time)),
    endTimeMinutes: toMinutes(getOriginalTime(order.end_time)),
  })),
}));
console.log(tablesFormat);
for (let i = 0; i < tablesFormat.length; i++) {
  for (let j = 0; j < tablesFormat[i].orders.length; j++) {
    const currentOrder = tablesFormat[i].orders[j];
    for (let x = j + 1; x < tablesFormat[i].orders.length; x++) {
      const anotherOrder = tablesFormat[i].orders[x];
      if (
        currentOrder.startTimeMinutes < anotherOrder.endTimeMinutes &&
        currentOrder.endTimeMinutes > anotherOrder.startTimeMinutes
      ) {
        anotherOrder.level = currentOrder.level + 1;
      }
    }
  }
}
console.log(tablesFormat);
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
            {tables.map((table) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { orders, ...rest } = table;
              return <TablesCeil key={table.id} data={rest}></TablesCeil>;
            })}
          </TableBar>
          <Board>
            {tablesFormat.map((table) =>
              table.orders.map((order) => {
                const topOffset = order.startTimeMinutes - opentTimeRestaurant;
                const heightOrder = order.endTimeMinutes - order.startTimeMinutes;
                // в 40 пикселях 30 минут => 1минута = 40/30

                const index = tables.findIndex((el) => el.id === table.id);
                const leftOffset = index * 80;
                return (
                  <Order
                    data={order}
                    key={order.id}
                    style={{
                      top: `${topOffset * timeScale}px`,
                      height: `${heightOrder * timeScale}px`,
                      left: `${leftOffset + order.level * 4}px`,
                      width: `${80 - order.level * 4}px`,
                    }}
                  ></Order>
                );
              })
            )}
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
  z-index: 10;
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
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
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
  padding-top: 34px;
  height: fit-content;
`;
const TimesCeil = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.48);
  min-height: 40px;
`;
