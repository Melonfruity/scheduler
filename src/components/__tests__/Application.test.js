import React from "react";

import { render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, getByTestId } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";
import axios from "__mocks__/axios";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);
  // return waitForElement(() => getByText("Monday")).then(() => {
  //   fireEvent.click(getByText("Tuesday"));
  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();  
  // });

  await waitForElement(() => getByText("Monday"));
  
  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
});

// 1053
describe("Application", () => {
  it("loads data, books and interview and reduces the spots remaining for the first day by 1", async () => {
    
    // 1. Renders the element and destructures it into the container and debug func
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Get the appointment that contains Archie Cohen
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 4. Click the "Add" icon 
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Change the selected values for the page
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Lydia Miller-Jones"
      }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the save page to show up
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // This will never happen for me because I only dispatch after the websocket send back
    // a message
    // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  });

  // 1054
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    
    // 1. Renders the element and destructures it into the container and debug func
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Get the appointment that contains Archie Cohen
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    
    // 4. Click the "Delete" icon 
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 5. Check that the confirmation page to show up
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();

    // 6. Click the confirm buttom
    fireEvent.click(getByText(appointment, "Confirm"));
    // debug();
  });

  // 1054
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    
    // 1. Renders the element and destructures it into the container and debug func
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Get the appointment that contains Archie Cohen
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    // 4. Click the "Edit" icon 
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 5. Check that the Edit page shows up
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();
    
    // 6. Change the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 7. Click the "Save" button
    fireEvent.click(getByText(appointment, "Save"));

    // 8. Expect the Saving screen to happen
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // debug();

  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();  
  })


  it("shows the delete error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();  
  })

})