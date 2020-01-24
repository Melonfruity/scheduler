// import Appointment from "components/Appointment";
import React, { useEffect } from 'react';

import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Error from './Error';

import { useVisualMode } from "../../hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
     }
     if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
     }
  }, [props.interview, transition, mode])

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  }

  const canceling = () => {
    transition(SAVING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM, true)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="SAVING"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="DELETE?"
          onCancel={back}
          onConfirm={() => canceling()}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error saving"}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error deleting"}
          onClose={back}
        />
      )}
    </article>
  );
};

export default Appointment;