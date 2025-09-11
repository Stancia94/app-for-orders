import type { JSX } from "react";
import styled from "styled-components";
const order = {
  id: "8ed4dfd6-ed9b-4230-9399-e271d2ba00d0",
  status: "New",
  start_time: "2025-04-04T12:32:47.885000+10:00",
  end_time: "2025-04-04T13:01:41.598000+10:00",
};
function renderOrder(status: string): JSX.Element | null {
  switch (status) {
    case "New":
      return (
        <OrderWrapper>
          <Name>Заказ</Name>
          <Status>Новый</Status>
          <Time>13:00-14:00</Time>
        </OrderWrapper>
      );
    case "Bill":
      return (
        <OrderWrapper>
          <Name>Заказ</Name>
          <StatusBill>Пречек</StatusBill>
          <Time>13:00-14:00</Time>
        </OrderWrapper>
      );
    case "Closed":
      return (
        <OrderWrapper>
          <Name>Заказ</Name>
          <Status>Закрытый</Status>
          <Time>13:00-14:00</Time>
        </OrderWrapper>
      );
    case "Banquet":
      return (
        <BanquetWrapper>
          <Name>Банкет</Name>
          <Time>13:00-14:00</Time>
        </BanquetWrapper>
      );
    default:
      return null;
  }
}
export default function Order() {
  return renderOrder(order.status);
}
const Status = styled.div`
  font-size: 8px;
  line-height: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.12);
  padding: 2px;
`;
const StatusBill = styled(Status)`
  background-color: rgba(74, 201, 155, 0.32);
`;
const Name = styled.div`
  font-size: 11px;
  line-height: 14px;
`;
const Time = styled.div`
  font-size: 11px;
`;
const OrderWrapper = styled.div`
  background-color: rgba(127, 215, 204, 0.16);
  border-left: 2px solid #7fd7cc;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 10px;
  width: 80px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 4px;
`;
const BanquetWrapper = styled(OrderWrapper)`
  background-color: rgba(179, 72, 247, 0.16);
  border-left: 2px solid #b348f7;
`;
