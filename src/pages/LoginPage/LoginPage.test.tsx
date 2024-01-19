import { screen } from "@testing-library/react";
import { customRenderWithBrowser } from "../../testUtils/testUtils";
import LoginPage from "./LoginPage";

describe("Given a LoginPage componente", () => {
  describe("When it is rendered on screen", () => {
    test("Then it should show a 'Login to your account' message on a heading", () => {
      const loginTitle = "Login to your account";

      customRenderWithBrowser(<LoginPage />);

      const title = screen.getByRole("heading", {
        name: loginTitle,
      });

      expect(title).toBeInTheDocument();
    });
  });
});
