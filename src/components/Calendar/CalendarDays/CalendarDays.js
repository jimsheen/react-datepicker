import React from 'react';
import classNames from 'classnames';

import {
  WEEK_DAYS
} from '../../../utils/calendarHelper';

export default ({
  data = [],
  handleClick,
  selectedDates = [],
  date,
}) => {

  const isInRange = day => {
    if (selectedDates.length === 2) {
      const currentDate = new Date(day);
      const date1 = new Date(selectedDates[0]);
      const date2 = new Date(selectedDates[1]);
      if (currentDate > date1 && currentDate < date2) {
        return true;
      }
    }
  }

  const btnClass = day => {
    const currentDate = new Date(day).toString();
    const className = classNames('day', {
      'selected': selectedDates.map(item => item.toString()).indexOf(currentDate) !== -1,
      'between': isInRange(day),
      'outside': day[1] !== date[1]
    })

    return className;
  }

  return (
    <div className="calendar-days">
      {Object.entries(WEEK_DAYS).map(([k, v]) => (
        <div key={v}>{v}</div>
      ))}
      {data.map(item => (
        <button
          key={item.toString()} 
          onClick={() => handleClick(item)} 
          className={btnClass(item)}
        >
          {item[2]}
        </button>
      ))}
    </div>
  )
}