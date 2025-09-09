import styled from "styled-components";
type Times = {
  restaurant: {
    opening_time: string; // Время открытия (на основе этого строится таблица)
    closing_time: string; // Время закрытия (на основе этого строится таблица)
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
console.log(openTime);
const diff = Math.floor((closeTime - openTime) / 30);
const timeArr: string[] = [];

for (let i = openTime; i < closeTime; i += 30) {
  const h = String(Math.trunc(i / 60));
  const m = String(i % 60).padStart(2, "0");
  const time = `${h}:${m}`;
  timeArr.push(time);
}
console.log(timeArr);
export default function MainTable() {
  return (
    <Table>
      {diff}
      {timeArr.map((time) => {
        return <TimesCeil>{time}</TimesCeil>;
      })}
    </Table>
  );
}
const Table = styled.div`
  display: grid;
  grid-auto-rows: 40px;
  grid-template-columns: repeat(auto-fill, 80px);
`;
const TimesCeil = styled.div`
  grid-column: 1;
`;
