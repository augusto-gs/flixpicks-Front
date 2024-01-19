import { screen } from "@testing-library/react";
import movieMock from "../../mocks/movieMocks/movieMock";
import { customRenderWithBrowser } from "../../testUtils/testUtils";
import Background from "./Background";

describe("Given a background component", () => {
  describe("When it is rendered on screen", () => {
    test("Then it should show an image with 'Background of Arrival' on an alternative text", () => {
      const imageAlternativetext = "Background of Arrival";

      customRenderWithBrowser(<Background />, movieMock);

      const image = screen.getByAltText(imageAlternativetext);

      expect(image).toBeInTheDocument();
    });
  });
});
