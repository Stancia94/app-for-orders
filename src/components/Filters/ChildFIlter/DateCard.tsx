import { Card } from "../../FilterPanel";
import { MONTHS_GENITIVE } from "../../../constant";
type DateCardProps = {
  date: string;
  onClick: () => void;
  isActive: boolean;
};
function formatDate(date: string) {
  const arr = date.split("-");
  const month = +arr[1] - 1;
  const day = +arr[2];
  return `${day} ${MONTHS_GENITIVE[month]}`;
}
export default function DateCard({ date, onClick, isActive }: DateCardProps) {
  return (
    <Card $active={isActive} onClick={onClick}>
      {formatDate(date)}
    </Card>
  );
}
