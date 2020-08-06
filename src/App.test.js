import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import JobState from "./App";

window.HTMLFormElement.prototype.submit = () => {};

const job = { URL: "https://www.google.com/", completed: false, attempt: 0 };

describe("App", () => {
  let emit;
  beforeAll(() => {
    ({ emit } = window._virtualConsole);
  });
  beforeEach(() => {
    window._virtualConsole.emit = jest.fn();
  });
  afterAll(() => {
    window._virtualConsole.emit = emit;
  });

  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText("Job URL")).toBeInTheDocument();
  });

  test("renders submit, update and clear buttons", () => {
    render(<App />);
    expect(screen.getByTestId("submit")).toHaveTextContent("Submit");
    expect(screen.getByTestId("update")).toHaveTextContent("Update");
    expect(screen.getByTestId("clear")).toHaveTextContent("Clear");
  });

  test("clear a form when submit button is clicked", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("url"), {
      target: " https://www.google.com/",
    });
    fireEvent.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("url")).not.toHaveTextContent(
      "https://www.google.com/"
    );
  });

});
describe("JobState", () => {
  test("renders JobState component", () => {
    render(<JobState/>);
  });
});
