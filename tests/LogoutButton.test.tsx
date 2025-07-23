import { fireEvent, render, screen } from "@testing-library/react";
import LogoutButton from "../src/components/LogoutButton";
// @ts-expect-error unused import
import React from "react";
import { useAuth } from "../src/context/useAuth";

jest.mock("../src/context/useAuth");

describe("LogoutButton", () => {
  it("calls logout on click", () => {
    const logout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ logout });
    render(<LogoutButton />);
    fireEvent.click(screen.getByText("Logout"));
    expect(logout).toHaveBeenCalled();
  });
});
