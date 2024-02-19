import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

export default function Ispis({users}) {
  return(
  <div>
    <Calendar
      localizer={localizer}
      events={users}
      startAccessor="start"
      endAccessor="end"
      defaultView="day"
      toolbar={false}
      style={{ height: 920, width: 750 }}
    />
  </div>
  );
}