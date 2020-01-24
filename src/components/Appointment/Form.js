import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null)

  const reset = () => {
    setName("");
    setInterviewer("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

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
            onClick={interviewer ? () => props.onSave(name, interviewer) : (e) => e.preventDefault()}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}

export default Form;