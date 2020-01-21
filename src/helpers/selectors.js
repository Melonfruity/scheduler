export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  const selectedDay = days.find((d) => d.name === day);
  const selectedAppointments = [];
  
  if (!selectedDay) {
    return selectedAppointments;
  }

  for (let index in appointments) {
    const id = appointments[index].id
    if (selectedDay.appointments.includes(id)) {
      selectedAppointments.push(appointments[index]);
    }
  }
  
  return selectedAppointments;
}

export const getInterview = (state, interview) => {

  if (!interview) return null;

  const formattedInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  }

  return formattedInterview;
}