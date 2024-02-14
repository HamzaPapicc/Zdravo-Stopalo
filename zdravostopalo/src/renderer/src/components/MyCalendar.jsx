import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

// const myEventsList=[
//   {
//     title: "DeBumi, Biscuit",
//     start: dayjs("2024-02-12 15:15").toDate(),
//     end: dayjs("2024-02-12 20:00").toDate(),
//   },
// ];

export default function MyCalendar({eventsProps}) {
  return(
  <div>
    <Calendar
      localizer={localizer}
      events={eventsProps.myEventsList}
      startAccessor="start"
      endAccessor="end"
      defaultView='day'
      style={{ height: 920, width: "100%", }}
    />
  </div>
  );
}