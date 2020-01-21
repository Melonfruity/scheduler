import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({...state, day: day});
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(response => {
        setState({...state, appointments});
        return response;
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    }
    const appointments ={
      ...state.appointments,
      [id]: appointment,
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(response => {
      setState({...state, appointments});
      return response;
    })  
  }

  useEffect(() => {
    const days = axios.get(`http://localhost:8001/api/days`)
    const appointments = axios.get(`http://localhost:8001/api/appointments`)
    const interviewers = axios.get(`http://localhost:8001/api/interviewers`)
    Promise.all([days, appointments, interviewers])
      .then(response => {
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }))
      })
      .catch((error) => console.log(error))
  },[])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}