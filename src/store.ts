import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./sliceOrders";
// import rawMokData from "./MokData.json";
import rawMokData from "./MokDataAllDays.json";
import type { OrdersState } from "./sliceOrders";
const MokData = rawMokData as Omit<OrdersState, "selected_zone" | "available_zone">;

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  preloadedState: {
    orders: {
      ...MokData,
      selected_zone: [],
      available_zone: [],
    }
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;