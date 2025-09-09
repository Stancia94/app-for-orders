import { Card } from "../../FilterPanel";
type Date = {
  date: string;
};
export default function DateCard({ date }: Date) {
  return <Card>{date}</Card>;
}
