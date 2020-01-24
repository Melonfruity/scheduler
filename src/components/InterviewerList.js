import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => 
          <InterviewerListItem 
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer={() => props.setInterviewer(interviewer.id)}
          />
        )}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired,
}

export default InterviewerList;