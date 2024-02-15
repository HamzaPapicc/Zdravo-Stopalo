import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

export default function MyCalendar({infoProps}) {
  return(
  <div>
    <Calendar
      localizer={localizer}
      events={infoProps.users}
      startAccessor="start"
      endAccessor="end"
      defaultView='day'
      style={{ height: 920, width: "100%", }}
    />
  </div>
  );
}