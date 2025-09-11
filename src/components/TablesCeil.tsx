import styled from "styled-components";

type Table = {
  id: string;
  capacity: number;
  number: string;
  zone: string;
};

export default function TablesCeil({ data }: { data: Table }) {
  return (
    <Table>
      <div>
        #<b style={{ fontSize: "13px", color: "white" }}>{data.number}</b>
      </div>
      <div>{data.capacity} чел</div>
      <div style={{ gridColumn: "span 2" }}>
        {data.zone === "Банкетный зал" ? "Банк.зал" : data.zone}
      </div>
    </Table>
  );
}
const Table = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(2, auto);
  color: rgba(255, 255, 255, 0.64);
  font-size: 11px;
  justify-items: center;

  z-index: 20;
  padding-top: 5px;
  width: 80px;
`;
