import { configureStore } from "@reduxjs/toolkit";

type State = {
  // Доступные дни для просмотра
  available_days: string[],
  // Текущая дата на сервере (может отличаться от вашей)
  current_day: string,
  restaurant: {
    id: number, // id ресторана
    timezone: string, // Таймзона ресторана (для отображения текущего времени)
    restaurant_name: string, // Название ресторана
    opening_time: string, // Время открытия (на основе этого строится таблица)
    closing_time: string, // Время закрытия (на основе этого строится таблица)
  },
  tables: [
    {
      id: string, // id стола
      capacity: number, // Вместимость стола
      number: number, // Номер стола
      // К какой зоне относится стол
      // Возможные значения: 1 этаж, 2 этаж, Банкетный зал
      // На основе этого строится фильтрация "Отображаемые зоны"
      zone: string,
      // Заказы и банкеты
      orders: [
        {
          id: string,
          // Статус заказа или банкет
          // Возможные значения: New, Bill, Closed, Banquet
          status: string,
          start_time: string,
          end_time: string,
        }
      ],
      // Живая очередь и бронирования
      reservations: [
        {
          id: number,
          name_for_reservation: string,
          num_people: number,
          phone_number: string,
          // Возможные значения: Живая очередь, Новая, Заявка, Открыт, Закрыт
          status: string,
          seating_time: string,
          end_time: string,
        }
      ]
    }
  ]
}

export const store = configureStore({
  reducer: {},
})