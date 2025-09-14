import ZoneCard from "../ChildFIlter/ZoneCard";
import { FilterName } from "../../FilterPanel";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setDate } from "../../../sliceOrders";
export default function ZoneFilter() {
  const selectedZone = useSelector((state: RootState) => state.orders.selected_zone);
  return (
    <div>
      <ZoneCard></ZoneCard>
      <ZoneCard></ZoneCard>
      <ZoneCard></ZoneCard>
    </div>
  );
}
