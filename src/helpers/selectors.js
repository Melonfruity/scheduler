// Returns the appoints for a selected day
export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  const selectedDay = days.find((d) => d.name === day);
  const selectedAppointments = [];
  
  // If there is no day then return an empty object
  if (!selectedDay) {
    return selectedAppointments;
  }

  // iterate through the appointments array and push only the ones for that day into the array
  for (let index in appointments) {
    const id = appointments[index].id;
    if (selectedDay.appointments.includes(id)) {
      selectedAppointments.push(appointments[index]);
    }
  }
  
  return selectedAppointments;
}

// gets a specific interview 
export const getInterview = (state, interview) => {

  if (!interview) return null;

  const formattedInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  }

  return formattedInterview;
}

// get the interviewers that are available for that day
export const getInterviewersForDay = (state, day) => {
  const dayOf = state.days.filter((d) => d.name === day)[0];
  
  if (!dayOf) { 
    return [];
  }
  
  const listOfInterviewers = dayOf.interviewers.map((id) => state.interviewers[id]);

  return listOfInterviewers;
}