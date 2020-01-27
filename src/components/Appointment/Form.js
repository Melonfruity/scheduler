import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null)
  const [error, setError] = useState("");
  
  const reset = () => {
    setName("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = (interviewer, name) => {
    if (interviewer && name) {
      return true;
    } else if (!name){
      setError("student name cannot be blank");
      return false;
    // } else {
    //   setError("select a interviewer");
    //   return false;
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            /*
              This must be a controlled component
            */
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers} 
          interviewer={Number(interviewer)} 
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => cancel()}
          >
            Cancel
          </Button>
          <Button
            confirm
            onClick={(e) => validate(interviewer, name) ? props.onSave(name, interviewer) : e.preventDefault()}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;