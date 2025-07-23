import "@testing-library/jest-dom";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";
// @ts-expect-error unused import
import React from "react";
import { useAuth } from "../src/context/useAuth";

jest.mock("../src/context/useAuth");
jest.mock("../src/components/GoogleLoginButton", () => {
  const MockGoogleLoginButton = () => <div>Mock GoogleLoginButton</div>;
  MockGoogleLoginButton.displayName = "MockGoogleLoginButton";
  return MockGoogleLoginButton;
});
jest.mock("../src/components/Profile", () => {
  const MockProfile = () => <div>Profile Page</div>;
  MockProfile.displayName = "MockProfile";
  return MockProfile;
});
jest.mock("../src/components/Food", () => {
  const MockFood = () => <div>Food Page</div>;
  MockFood.displayName = "MockFood";
  return MockFood;
});
jest.mock("../src/components/Exercise", () => {
  const MockExercise = () => <div>Exercise Page</div>;
  MockExercise.displayName = "MockExercise";
  return MockExercise;
});
jest.mock("../src/components/Report", () => {
  const MockReport = () => <div>Report Page</div>;
  MockReport.displayName = "MockReport";
  return MockReport;
});
jest.mock("../src/components/LogoutButton", () => {
  const MockLogoutButton = () => <button>Logout</button>;
  MockLogoutButton.displayName = "MockLogoutButton";
  return MockLogoutButton;
});

describe("App", () => {
  it("shows login when not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ token: null });
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/mock googleloginbutton/i)).toBeInTheDocument();
  });

  it("shows profile page when authenticated and on /profile", () => {
    (useAuth as jest.Mock).mockReturnValue({ token: "abc" });
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/profile page/i)).toBeInTheDocument();
  });

  it("shows food page when authenticated and on /food", () => {
    (useAuth as jest.Mock).mockReturnValue({ token: "abc" });
    render(
      <MemoryRouter initialEntries={["/food"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/food page/i)).toBeInTheDocument();
  });
});
