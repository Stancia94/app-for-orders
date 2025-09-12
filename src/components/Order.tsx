import styled from "styled-components";
import { getOriginalTime } from "../utils";
type OrderType = {
  id: string;
  status: string;
  start_time: string;
  end_time: string;
};
type OrderProps = {
  data: OrderType;
  style?: React.CSSProperties;
};

export default function Order({ data, style }: OrderProps) {
  const time = getOriginalTime(data.start_time) + ":" + getOriginalTime(data.end_time);
  switch (data.status) {
    case "New":
      return (
        <OrderWrapper style={style}>
          <Name>Заказ</Name>
          <Status>Новый</Status>
          <Time>{time}</Time>
        </OrderWrapper>
      );
    case "Bill":
      return (
        <OrderWrapper style={style}>
          <Name>Заказ</Name>
          <StatusBill>Пречек</StatusBill>
          <Time>{time}</Time>
        </OrderWrapper>
      );
    case "Closed":
      return (
        <OrderWrapper style={style}>
          <Name>Заказ</Name>
          <Status>Закрытый</Status>
          <Time>{time}</Time>
        </OrderWrapper>
      );
    case "Banquet":
      return (
        <BanquetWrapper style={style}>
          <Name>Банкет</Name>
          <Time>{time}</Time>
        </BanquetWrapper>
      );
    default:
      return null;
  }
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 4px;
  cursor: pointer;
  &:hover {
    z-index: 100;
    backdrop-filter: blur(8px);
  }
`;
const BanquetWrapper = styled(OrderWrapper)`
  background-color: rgba(179, 72, 247, 0.16);
  border-left: 2px solid #b348f7;
`;
