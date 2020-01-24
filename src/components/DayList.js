import React from 'react';
import DayListItem from './DayListItem';

// list of items for the navbar
const DayList = ({ days, day, setDay }) => {
  
  return (
    <ul>
      {days.map((dayItem, i) =>
        <DayListItem 
          name={dayItem.name} 
          spots={dayItem.spots} 
          selected={dayItem.name === day}
          setDay={() => setDay(dayItem.name)}
          key={i}
        />
      )}
    </ul>
  )
};

export default DayList;