import { screen, waitFor } from "@testing-library/react";
import { customRenderWithBrowser } from "../../testUtils/testUtils";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";

describe("Given a login form component", () => {
  const userText = "test1234";

  describe("When it is rendered on screen and the user inputs 'test1234' on usernmame field and 'test1234' on the the password field", () => {
    test("Then it should that text on a form input", async () => {
      customRenderWithBrowser(<LoginForm actionOnClick={() => {}} />);

      const loginButton = screen.getByRole("button", { name: "Login" });
      const usernameField = screen.getByRole("textbox", { name: "Username" });
      const passwordField = screen.getByLabelText(/password/i);

      const inputs = [usernameField, passwordField];

      for (const inputElement of inputs) {
        await userEvent.type(inputElement, userText);
      }

      expect(loginButton).not.toBeDisabled();
    });
  });

  describe("When it is rendered on screen and the user inputs 'test1234' on username field and 'test1234' on the the password field and the form button is pressed", () => {
    test("Then the fields should be filled with testuser", async () => {
      customRenderWithBrowser(<LoginForm actionOnClick={() => {}} />);

      await waitFor(() => {
        expect(screen.getByRole("textbox", { name: "Username" })).toHaveValue(
          "testuser",
        );
      });
    });
  });
});
