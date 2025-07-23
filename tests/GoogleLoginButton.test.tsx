import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import GoogleLoginButton from "../src/components/GoogleLoginButton";
// @ts-expect-error unused import
import React from "react";
import { useAuth } from "../src/context/useAuth";

jest.mock("../src/context/useAuth");
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: function GoogleLoginMock(props: {
    onSuccess: (resp: { credential: string }) => void;
  }) {
    return (
      <button onClick={() => props.onSuccess({ credential: "test-token" })}>
        Google Login
      </button>
    );
  },
}));

describe("GoogleLoginButton", () => {
  it("calls setToken on successful login", () => {
    const setToken = jest.fn();
    (
      useAuth as unknown as { mockReturnValue: (v: unknown) => void }
    ).mockReturnValue({ setToken });
    render(<GoogleLoginButton />);
    fireEvent.click(screen.getByText("Google Login"));
    expect(setToken).toHaveBeenCalledWith("test-token");
  });
});
