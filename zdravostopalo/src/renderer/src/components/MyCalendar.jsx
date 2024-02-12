import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
      import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

export default function MyCalendar() {
  return(
  <div>
    <Calendar
      localizer={localizer}
      //events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, width: "100%", }}
    />
  </div>
  );
}