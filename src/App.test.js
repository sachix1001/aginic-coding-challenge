import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import JobState from "./App";



describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});
describe('JobState', () => {
  test('renders JobState component', () => {
    render(<JobState />);
  });
});

