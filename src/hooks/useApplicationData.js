import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';

const xampleWebsocket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);

export const useApplicationData = () => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  // const DISMOUNT = "DISMOUNT";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return {...state, day: action.day};
      case SET_APPLICATION_DATA:
        return {
          ...state,
          ...action.state,
        };
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: action.appointments,
          days: action.days,
      };
      // case DISMOUNT:
      //   return {
      //     ...state,
      //     ...action.state,
      //   }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    dispatch({
      type: SET_DAY,
      day,
    });
  }

  const bookInterview = useCallback((id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(response => {
        // dispatch({
        //   type: SET_INTERVIEW,
        //   appointments,
        //   days: updateSpots('book'),
        // });
        return response;
      })
  },[])

  const cancelInterview = useCallback((id) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null,
    // }
    // const appointments ={
    //   ...state.appointments,
    //   [id]: appointment,
    // }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(response => {
      // dispatch({
      //   type: SET_INTERVIEW,
      //   appointments,
      //   days: updateSpots('cancel')
      // });
      console.log(response)
      return response;
    })  
  },[])

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

  useEffect(() => {

    const days = axios.get(`http://localhost:8001/api/days`);
    const appointments = axios.get(`http://localhost:8001/api/appointments`);
    const interviewers = axios.get(`http://localhost:8001/api/interviewers`);
    console.log('here')
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
      // return () => dispatch({
      //   type: "DISMOUNT",
      //   state: {
      //     day: "Monday",
      //     days: [],
      //     appointments: {},
      //     interviewers: {},
      //   }
      // })
  },[])

  useEffect(() => {
    
      xampleWebsocket.onopen = () => {
        console.log('ping');
      }

      xampleWebsocket.onmessage = (event) => {
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
        xampleWebsocket.send('updating');
      }
    
      xampleWebsocket.onclose = () => {
        xampleWebsocket.close();
      }

  })

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}