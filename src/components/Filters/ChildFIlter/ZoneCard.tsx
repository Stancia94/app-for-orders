import { Card } from "../../FilterPanel";
type ZoneCardProps = {
  zone: string;
  onClick: () => void;
  isActive: boolean;
};
export default function ZoneCard({ zone, onClick, isActive }: ZoneCardProps) {
  return (
    <Card onClick={onClick} $active={isActive}>
      {zone}
    </Card>
  );
}
