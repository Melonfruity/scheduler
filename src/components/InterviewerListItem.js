import React from 'react';
import './InterviewerListItem.scss'
import classNames from 'classnames';

const InterviewerListItem = ({ id, name, avatar, selected, setInterviewer }) => {

  // css classes for the interviewer items
  const interviewerItemClass = classNames(
    'interviewers__item',
    {
      'interviewers__item--selected': selected,
    },
  );
  
  return (
    <li
      className={interviewerItemClass}
      onClick={setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;