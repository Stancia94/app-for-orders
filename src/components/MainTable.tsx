import styled from "styled-components";
import TablesCeil from "./TablesCeil";
import Order from "./Order";
import { toMinutes, getOriginalTime } from "../utils";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
export default function MainTable() {
  const orders = useSelector((state: RootState) => state.orders);

  const opentTimeRestaurant = toMinutes(orders.restaurant.opening_time);
  const closeTime = toMinutes(orders.restaurant.closing_time);
  const diff = Math.floor((closeTime - opentTimeRestaurant) / 30);
  const timeArr: string[] = [];

  for (let i = opentTimeRestaurant; i < closeTime; i += 30) {
    const h = String(Math.trunc(i / 60));
    const m = String(i % 60).padStart(2, "0");
    const time = `${h}:${m}`;
    timeArr.push(time);
  }
  const Y_SCALE = 40 / 30;

  const tables = orders.tables;
  const tablesFormat = tables.map((table) => ({
    ...table,
    orders: table.orders.map((order) => ({
      ...order,
      overlayLevel: 0,
      leftLevel: 0,
      intersectionLevel: 1,
      startTimeMinutes: toMinutes(getOriginalTime(order.start_time)),
      endTimeMinutes: toMinutes(getOriginalTime(order.end_time)),
    })),
  }));

  for (let i = 0; i < tablesFormat.length; i++) {
    const orders = tablesFormat[i].orders;
    for (let j = 0; j < orders.length; j++) {
      const currentOrder = orders[j];
      for (let x = j + 1; x < orders.length; x++) {
        const anotherOrder = orders[x];
        if (
          currentOrder.startTimeMinutes < anotherOrder.endTimeMinutes &&
          currentOrder.endTimeMinutes > anotherOrder.startTimeMinutes
        ) {
          anotherOrder.overlayLevel = currentOrder.overlayLevel + 1;
        }
        if (anotherOrder.startTimeMinutes - currentOrder.startTimeMinutes < 30) {
          anotherOrder.leftLevel = currentOrder.leftLevel + 1;
        }
      }
      let count = 1;
      for (let k = 0; k < orders.length; k++) {
        const anotherOrder = orders[k];
        if (
          Math.abs(anotherOrder.startTimeMinutes - currentOrder.startTimeMinutes) < 30 &&
          anotherOrder !== currentOrder
        ) {
          count++;
        }
        currentOrder.intersectionLevel = count;
      }
    }
  }
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
          <Board $rows={diff} $columns={tables.length}>
            {tablesFormat.map((table) =>
              table.orders.map((order) => {
                const topOffset = order.startTimeMinutes - opentTimeRestaurant;
                const heightOrder = order.endTimeMinutes - order.startTimeMinutes;
                // в 40 пикселях 30 минут => 1минута = 40/30
                const index = tables.findIndex((el) => el.id === table.id);
                let finalWidth, leftOffset;
                if (order.intersectionLevel > 1) {
                  finalWidth = (80 - order.overlayLevel * 4) / order.intersectionLevel;
                  leftOffset = index * 80 + order.leftLevel * finalWidth + order.overlayLevel * 4;
                } else {
                  finalWidth = 80 - order.overlayLevel * 4;
                  leftOffset = index * 80 + order.overlayLevel * 4;
                }
                return (
                  <Order
                    data={order}
                    key={order.id}
                    style={{
                      top: `${topOffset * Y_SCALE}px`,
                      height: `${heightOrder * Y_SCALE}px`,
                      left: `${leftOffset}px`,
                      width: `${finalWidth}px`,
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
const Board = styled.div<{ $rows: number; $columns: number }>`
  display: grid;
  background-attachment: local;
  position: relative;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 80px 40px, 80px 40px;
  background-position: 80px 0, 0 40px;
  grid-template-rows: ${({ $rows }) => `repeat(${$rows + 1}, 40px)`};
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 80px)`};
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
