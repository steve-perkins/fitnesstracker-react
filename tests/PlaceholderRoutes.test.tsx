import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../src/context/AuthProvider";
import Exercise from "../src/components/Exercise";
import Food from "../src/components/Food";
import Profile from "../src/components/Profile";
// @ts-expect-error unused import
import React from "react";
import Report from "../src/components/Report";

describe("Placeholder route components", () => {
  it("renders Profile", () => {
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>,
    );
    const headings = screen.getAllByText(/profile/i);
    expect(headings.length).toBeGreaterThan(0);
  });
  it("renders Food", () => {
    render(<Food />);
    const foodElements = screen.getAllByText(/food/i);
    expect(foodElements.length).toBeGreaterThan(0);
  });
  it("renders Exercise", () => {
    render(<Exercise />);
    const exerciseElements = screen.getAllByText(/exercise/i);
    expect(exerciseElements.length).toBeGreaterThan(0);
  });
  it("renders Report", () => {
    render(<Report />);
    const reportElements = screen.getAllByText(/report/i);
    expect(reportElements.length).toBeGreaterThan(0);
  });
});
