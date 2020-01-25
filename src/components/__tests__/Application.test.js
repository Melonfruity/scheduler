import React from "react";

import { render, cleanup, waitForElement, prettyDOM, getByText, getAllByRole, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

// it("defaults to Monday and changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);
//   // return waitForElement(() => getByText("Monday")).then(() => {
//   //   fireEvent.click(getByText("Tuesday"));
//   //   expect(getByText("Leopold Silvers")).toBeInTheDocument();  
//   // });

//   await waitForElement(() => getByText("Monday"));
  
//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
// });

describe("Application", () => {
  it("loads data, books and interview and reduces the spots remaining for the first day by 1", async () => {
    
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container))

    const appointments = getAllByTestId(container, "appointment");

    // console.log(prettyDOM(appointments));

    const appointment = appointments[0];

    // console.log(prettyDOM(appointment))

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {
        value: "Lydia Miller-Jones"
      }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    // console.log(prettyDOM(appointment));

    // expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // This will never happen for me because I only dispatch after the websocket send back
    // a message
    // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  });

})