import ZoneCard from "../ChildFIlter/ZoneCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setSelectedZone } from "../../../sliceOrders";
export default function ZoneFilter() {
  const selectedZone = useSelector((state: RootState) => state.orders.selected_zone);
  const availableZone = useSelector((state: RootState) => state.orders.available_zone);
  const dispatch = useDispatch();
  console.log(selectedZone, availableZone);
  return (
    <div>
      {availableZone.map((zone) => {
        return (
          <ZoneCard
            isActive={Boolean(selectedZone.find((zon) => zon === zone))}
            zone={zone}
            key={zone}
            onClick={() => {
              console.log(selectedZone);
              return dispatch(setSelectedZone(zone));
            }}
          ></ZoneCard>
        );
      })}
    </div>
  );
}
