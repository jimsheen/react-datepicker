import React from 'react';

import './DatePicker.css';

import {
  getDateArray,
  isBeforeDay,
  dateDiff,
  getDateISO,
  isLeapYear
} from '../../utils/calendarHelper';

import FactForDate from '../FactForDate';

import Calendar from '../Calendar';

export default () => {

  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [selectedDates, setselectedDates] = React.useState([])
  const [dayDiff, setDayDiff] = React.useState(0);

  const handleClick = date => {
    const datesSet = selectedDates.length === 2;
    const newDate = new Date(date);
    if (!selectedDates[0] || datesSet) {
      setselectedDates([newDate]);
      setFromDate(getDateISO(new Date(date)))
    } else {
      if (isBeforeDay(newDate, selectedDates[0])) {
        if (datesSet) {
          setselectedDates([newDate, selectedDates[1]]);
          setFromDate(getDateISO(new Date(date)))
        } else {
          setselectedDates([newDate]);
          setFromDate(getDateISO(new Date(date)))
        }
      } else {
        setselectedDates([selectedDates[0], newDate])
        setToDate(getDateISO(new Date(date)));
        setDayDiff(Math.round(dateDiff(newDate, selectedDates[0]) / (1000 * 3600 * 24)));
      }
    }
  }

  const leapYear = selectedDates.length === 2 &&
    selectedDates.some(date => isLeapYear(getDateArray(date)[0]))

  const getCertainDays = (days, date1, date2) => {
    const ndays = 1 + Math.round((date2 - date1) / (24 * 3600 * 1000));
    const sum = (a, b) => a + Math.floor((ndays + (date1.getDay() + 6 - b) % 7) / 7);
    return days.reduce(sum, 0);
  }

  return (
    <div className="date-picker">
			<label htmlFor="from">From: </label>
			<input 
				type="date" 
				value={fromDate} 
				readOnly
				onFocus={() => setCalendarOpen(true)}
			/>
			&nbsp;
			<label htmlFor="from">To: </label>
			<input 
				type="date" 
				value={toDate} 
				readOnly
				onFocus={() => setCalendarOpen(true)}
			/>
			{calendarOpen &&
				<React.Fragment>
				<Calendar 
					handleClick={handleClick} 
					selectedDates={selectedDates} 
					fromDate={fromDate}
				/>
				<p>Days in range: {dayDiff}</p> 
				<p>Selected dates in leap year {leapYear ? 'Yes' : 'No'}</p>
				<p>Mondays in range: {getCertainDays([1],new Date(selectedDates[0]),new Date(selectedDates[1]))}</p>
				<FactForDate fromDate={fromDate} />
				</React.Fragment>
			}
		</div>
  )
}