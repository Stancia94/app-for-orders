import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Restaurant = {
  id: number;
  timezone: string;
  restaurant_name: string;
  opening_time: string;
  closing_time: string;
};
type OrderStatus = "New" | "Bill" | "Closed" | "Banquet";
export type Order = {
  id: string;
  status: OrderStatus;
  start_time: string;
  end_time: string;
};
export type Table = {
  id: string;
  capacity: number;
  number: string;
  zone: string;
  orders: Order[];
};
export type OrdersState = {
  available_days: string[];
  current_day: string;
  restaurant: Restaurant;
  tables: Table[];
  selected_zone: string[];
  available_zone: string[];
};

const initialState: OrdersState = {
  available_days: [],
  current_day: "",
  restaurant: {} as Restaurant,
  tables: [] as Table[],
  selected_zone: [],
  available_zone: [],
};
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setReservations(state, action: PayloadAction<Omit<OrdersState, "selected_zone" | "available_zone">>) {
      state.available_days = action.payload.available_days;
      state.current_day = action.payload.current_day;
      state.restaurant = action.payload.restaurant;
      state.tables = action.payload.tables;
    },
    setAvailableZone: (state, action: PayloadAction<string[]>) => {
      state.available_zone = action.payload;
    },
    setSelectedZone: (state, action: PayloadAction<string>) => {
      const findIndex = state.selected_zone.findIndex((zone) => zone === action.payload);
      if (findIndex === -1) {
        state.selected_zone.push(action.payload);
      } else {
        state.selected_zone.splice(findIndex, 1);
      }
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.current_day = action.payload;
    },
  },
});
export const { setDate, setReservations, setSelectedZone, setAvailableZone } = ordersSlice.actions;
export default ordersSlice.reducer;
