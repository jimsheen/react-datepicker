import React from 'react';

import calendarHelper, {
  CALENDAR_MONTHS,
  getDateArray,
  getNextMonth,
  getPreviousMonth
} from '../../utils/calendarHelper';
import Chevron from '../Chevron';
import CalendarDays from './CalendarDays';
import './Calendar.css';

const Calendar = ({ handleClick, selectedDates }) => {

  const today = new Date();
  const [calendarData, setCalendarData] = React.useState(calendarHelper());
  const [date, setNewDate] = React.useState(getDateArray(today));
  // const [dayDiff, setDayDiff] = React.useState(0);
  // const [selectedDates, setselectedDates] = React.useState([])
  const [year, month] = date;

  const gotoNextMonth = () => {
    const nextMonth = getNextMonth(new Date([year, month]));
    setNewDate([nextMonth.year, nextMonth.month, 1])
  }

  const gotoPrevMonth = () => {
    const prevMonth = getPreviousMonth(new Date([year, month]));
    setNewDate([prevMonth.year, prevMonth.month, 1])
  }

  React.useEffect(() => {
    setCalendarData(calendarHelper(new Date(date)))
  }, [date])

  return (
    <div className="calendar">
			<div className="calendar-month">
				<button
					className="prev-month"
					onClick={gotoPrevMonth}
				>
					<Chevron left />
				</button>
				{Object.keys(CALENDAR_MONTHS)[month - 1]} {year}
				<button 
					className="next-month"
					onClick={gotoNextMonth}
				>
					<Chevron right />
				</button>
			</div>
			<CalendarDays
				date={date}
				data={calendarData} 
				handleClick={handleClick} 
				selectedDates={selectedDates}
			/>
		</div>
  )
}

export default Calendar