import { screen } from "@testing-library/react";
import movieMock from "../../mocks/movieMocks/movieMock";
import { customRenderWithBrowser } from "../../testUtils/testUtils";
import DetailsPage from "./DetailsPage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<object>("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ movieId: "65637a12d4b93a3787b660f7" }),
  };
});

describe("Given a DetailsPage component", () => {
  describe("When it is rendered on screen", () => {
    test("Then it should show an image with an alternative text 'Cover of Arrival'", () => {
      const alternativeText = "Cover of Arrival";

      customRenderWithBrowser(<DetailsPage />, movieMock);

      const expectedImage = screen.getByAltText(alternativeText);

      expect(expectedImage).toBeInTheDocument();
    });

    test("Then it should show a 'Arrival' text on a heading", () => {
      const title = "Arrival";

      customRenderWithBrowser(<DetailsPage />, movieMock);

      const expectedHeading = screen.getByRole("heading", { name: title });

      expect(expectedHeading).toBeInTheDocument();
    });
  });

  test("Then it should show a button with a 'Delete' text", () => {
    const buttonText = "Delete";

    customRenderWithBrowser(<DetailsPage />, movieMock);

    const expectedButton = screen.getByRole("button", { name: buttonText });

    expect(expectedButton).toBeInTheDocument();
  });

  describe("When it is rendered on screen with a movie that has been seen", () => {
    test("Then it should show a 'Seen ✔️' text", () => {
      movieMock.isSeen = true;
      const expectedText = "Seen ✔️";

      customRenderWithBrowser(<DetailsPage />, movieMock);

      const expectedStatus = screen.getByText(expectedText);

      expect(expectedStatus).toBeInTheDocument();
    });
  });
});
