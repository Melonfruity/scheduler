
export const getInterview = (state, interview) => {

  if (!interview) return null;

  const formattedInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  }

  return formattedInterview;
}

export const getInterviewersForDay = (state, day) => {
  const dayOf = state.days.filter((d) => d.name === day)[0];
  
  if (!dayOf) { return []; }
  
  const listOfInterviewers = dayOf.interviewers.map((id) => state.interviewers[id]);

  return listOfInterviewers;
}