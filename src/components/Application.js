import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";
import axios from 'axios';

import "components/Application.scss";

import DayList from './DayList';
import Appointment from './Appointment/index';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const [appointments, setAppointments] = useState([])

  const setDay = (day) => {
    setState({...state, day: day});
    setAppointments(getAppointmentsForDay(state, state.day))
  }

  const schedule = appointments.map((appointment) => {

    const interview = getInterview(state, appointment.Interview);

    return ( <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
      />)
    })

  useEffect(() => {
    const days = axios.get(`http://localhost:8001/api/days`)
    const appointments = axios.get(`http://localhost:8001/api/appointments`)
    const interviewers = axios.get(`http://localhost:8001/api/interviewers`)
    Promise.all([days, appointments, interviewers])
      .then(response => {
        console.log(response)
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }))
      })
      .catch((error) => console.log(error))
  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
