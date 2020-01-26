import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import schedulerReducer from '../reducers/application'
const ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);

export const useApplicationData = () => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  // reducer and initial state for the application
  const [state, dispatch] = useReducer(schedulerReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // sets the day of the state on select
  const setDay = (day) => {
    dispatch({
      type: SET_DAY,
      day,
    });
  }

  // book an interview on save function
  const bookInterview = useCallback((id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
  },[state])

  // cancels an interview on delete 
  const cancelInterview = useCallback((id) => axios.delete(`/api/appointments/${id}`),[])

  // updates the total days available days shown
  const updateSpots = useCallback((change) => {
    const updatedDays = state.days.map((day) => {
      if (day.name === state.day) {
        if (change === 'book' && day.spots - 1 >= 0) {
          return { ...day, spots: day.spots - 1 }
        } else if (change === 'cancel' && day.spots + 1 <= 5) {
          return { ...day, spots: day.spots + 1 }
        }
      }
      return day;
    })
    return updatedDays;
  },[state])

  // gets all the data for the server and set as initial state
  useEffect(() => {

    const days = axios.get(`/api/days`);
    const appointments = axios.get(`/api/appointments`);
    const interviewers = axios.get(`/api/interviewers`);
    
    Promise.all([days, appointments, interviewers])
      .then(response => {
        dispatch({
          type: SET_APPLICATION_DATA,
          state: {
            days: response[0].data,
            appointments: response[1].data,
            interviewers: response[2].data,
          }
        });
      })
      .catch((error) => console.log(error))
  },[])

  // opens a web socket connection with the server
  // whene an interview is booked or created update all clients
  useEffect(() => {
    
      ws.onopen = () => {
        console.log('ping');
      };

      ws.onmessage = (event) => {
        // updates current state values based on whether it was a book or cancel
        const data = JSON.parse(event.data);
        if (data.type) {
          const appointment = {
            ...state.appointments[data.id],
            interview: data.interview,
          }

          const appointments ={
            ...state.appointments,
            [data.id]: appointment,
          }

          dispatch({
            type: SET_INTERVIEW,
            appointments,
            days: updateSpots(data.interview ? 'book' : 'cancel'),
          });
        }
        ws.send('updating');
      };
    
      ws.onclose = () => {
        ws.close();
      }
  });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}