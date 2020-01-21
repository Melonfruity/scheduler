import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = ({ interviewers, interviewer, setInterviewer }) => {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewerItem, i) => 
          <InterviewerListItem 
            key={interviewerItem.id}
            name={interviewerItem.name}
            avatar={interviewerItem.avatar}
            selected={interviewerItem.id === interviewer}
            setInterviewer={() => setInterviewer(interviewerItem.id)}
          />
        )}
      </ul>
    </section>
  );
}

export default InterviewerList;