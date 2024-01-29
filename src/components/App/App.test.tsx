import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import mainTheme from "../../styles/mainTheme";
import { customRender, mockLocalStorage } from "../../testUtils/testUtils";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/msw/node";
import { errorHandlers } from "../../mocks/msw/errorHandlers";
import movieMock from "../../mocks/movieMocks/movieMock";

const { getItemMock } = mockLocalStorage();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<object>("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ movieId: "65637a12d4b93a3787b660f7" }),
  };
});

beforeEach(() => {
  getItemMock.mockReturnValue("tokenStorage");
});

describe("Given an App component", () => {
  describe("When it is rendered on screen on the HomePage", () => {
    test("Then you should see a title 'Our movies' title on a heading", () => {
      const expectedTitle = "Our movies";

      customRender(
        <MemoryRouter initialEntries={["/home"]}>
          <ThemeProvider theme={mainTheme}>
            <App />
          </ThemeProvider>
        </MemoryRouter>,
      );

      const title = screen.getByRole("heading", { name: expectedTitle });

      expect(title).toBeInTheDocument();
    });

    test("Then you should see an 'Arrival' text in a heading on a card", () => {
      const expectedTitle = "Arrival";

      customRender(
        <MemoryRouter initialEntries={["/home"]}>
          <ThemeProvider theme={mainTheme}>
            <App />
          </ThemeProvider>
        </MemoryRouter>,
      );

      const title = screen.getByRole("heading", { name: expectedTitle });

      expect(title).toBeInTheDocument();
    });

    test("Then you should see a 'Cover of La La Land' alternative text on an image in a card", () => {
      const expectedAlternativeText = "Cover of La La Land";

      customRender(
        <MemoryRouter initialEntries={["/home"]}>
          <ThemeProvider theme={mainTheme}>
            <App />
          </ThemeProvider>
        </MemoryRouter>,
      );

      const image = screen.getByAltText(expectedAlternativeText);

      expect(image).toBeInTheDocument();
    });
  });

  describe("When it is rendered on screen and the user clicks the delete button of the movie Arrival", () => {
    test("Then it should delete the Arrival movie", async () => {
      const expectedButtonName = "Delete";
      const expectedMovieTitle = "Arrival";

      customRender(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const deleteButton = screen.getAllByRole("button", {
        name: expectedButtonName,
      });

      const movieTitle = screen.queryByRole("heading", {
        name: expectedMovieTitle,
      });

      for (const button of deleteButton) {
        await userEvent.click(button);
      }

      expect(movieTitle).not.toBeInTheDocument();
    });

    describe("When it is rendered on screen and the user clicks the modify button of the movie Arrival", () => {
      test("Then it should navigate to the Modify page", async () => {
        const buttonName = "Modify";
        const modifyPageTitle = "Modify a movie";

        customRender(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );

        const modifyButton = screen.getAllByRole("button", {
          name: buttonName,
        });

        await userEvent.click(modifyButton[0]);

        const modifyMoviepageTitle = await screen.findByRole("heading", {
          name: modifyPageTitle,
        });

        expect(modifyMoviepageTitle).toBeInTheDocument();
      });
    });

    describe("When it is rendered and you navigate to the AddPage", () => {
      test("Then it should show the AddPage with 'Add your own movie' message", async () => {
        const addMoviePageLinkText = "Add movie Add movie navigation icon";
        const addMoviePageHeadingText = "Add your own movie";

        customRender(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );

        const addMoviePageLink = screen.getByRole("link", {
          name: addMoviePageLinkText,
        });

        await userEvent.click(addMoviePageLink);

        const addMoviePageHeading = await screen.findByRole("heading", {
          name: addMoviePageHeadingText,
        });

        expect(addMoviePageHeading).toBeInTheDocument();
      });
    });

    describe("When it is rendered on the AddPage and you fill the form fields and click the submit button", () => {
      test("Then you should navigate to the ListPage and see a 'Our movies' title on a heading and a 'Sucess! You have added your own movie' feedback message", async () => {
        const buttonText = "Add";
        const listPageHeadingText = "Our movies";
        const testText = "https://prueba.com";
        const fieldNames = [
          "Name",
          "Director",
          "Writer",
          "Starring",
          "Genre",
          "Image Url",
          "Description",
        ];
        const releaseDateLabel = "Release date";

        customRender(
          <MemoryRouter initialEntries={["/add-movie"]}>
            <App />
          </MemoryRouter>,
        );

        const addButton = screen.getByRole("button", { name: buttonText });

        const releaseDateField = screen.getByLabelText(releaseDateLabel);

        const scoreField = screen.getByRole("slider", { name: "Score 2.5" });

        for (const text of fieldNames) {
          await userEvent.type(
            screen.getByRole("textbox", { name: text }),
            testText,
          );
        }

        await fireEvent.change(releaseDateField, {
          target: { value: "2023-12-19" },
        });

        await fireEvent.change(scoreField, { target: { value: "4.0" } });

        await userEvent.click(addButton);

        const listPageHeading = await screen.findByRole("heading", {
          name: listPageHeadingText,
        });

        const feedbackMessage = await screen.getByText(
          "Sucess! You have added your own movie",
        );

        expect(listPageHeading).toBeInTheDocument();
        expect(feedbackMessage).toBeInTheDocument();
      });
    });

    describe("When it is rendered and the user clicks on the MovieCard's detail button and the request for the selected card fails", () => {
      test("Then it should show a feedback component with a 'Error! Failed to select a movie' message", async () => {
        server.use(errorHandlers[3]);

        const buttonText = "Details";
        const errorFeedbackMessage = "Error! Failed to select a movie";

        customRender(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );

        const button = screen.getAllByRole("button", { name: buttonText });

        await userEvent.click(button[0]);

        const expectedErrorFeedback =
          await screen.findByText(errorFeedbackMessage);

        expect(expectedErrorFeedback).toBeInTheDocument();
      });
    });

    describe("When it is rendered on the modify movie page and the user changes the name of the movie Arrival and clicks on the button to submit", () => {
      test("Then you should see the details from the movie Arrival on the form and navigate to the home page", async () => {
        const nameField = "Name";
        const buttonText = "Modify";
        const inputName = "Arrival";

        customRender(
          <MemoryRouter initialEntries={["/:movieId/modify"]}>
            <App />
          </MemoryRouter>,
          movieMock,
        );

        const nameFieldInput = screen.getByRole("textbox", { name: nameField });

        const modifyButton = await screen.getByRole("button", {
          name: buttonText,
        });

        await userEvent.click(modifyButton);

        const homePageTitle = await screen.findByRole("heading", {
          name: "Our movies",
        });

        expect(nameFieldInput).toHaveValue(inputName);
        expect(homePageTitle).toBeInTheDocument();
      });
    });

    describe("When it is rendered on the detail page and the user clicks the button to delete movie", () => {
      test("Then it should navigate to the home page", async () => {
        const buttonText = "Delete";

        customRender(
          <MemoryRouter initialEntries={["/:movieId"]}>
            <App />
          </MemoryRouter>,
          movieMock,
        );

        const deleteButton = screen.getByRole("button", { name: buttonText });

        await userEvent.click(deleteButton);

        const homePageTitle = await screen.findByRole("heading", {
          name: "Our movies",
        });

        expect(homePageTitle).toBeInTheDocument();
      });
    });

    describe("When it is rendered on the detail page and the user clicks the 'Modify' button", () => {
      test("Then it should navigate to the modify page", async () => {
        const buttonText = "Modify";
        const nameField = "Name";

        customRender(
          <MemoryRouter initialEntries={["/:movieId"]}>
            <App />
          </MemoryRouter>,
          movieMock,
        );

        const modifyButton = screen.getByRole("button", { name: buttonText });

        await userEvent.click(modifyButton);

        const nameFieldInput = await screen.findByRole("textbox", {
          name: nameField,
        });

        expect(nameFieldInput).toBeInTheDocument();
      });
    });
  });

  describe("When it is rendered on the modify movie page and the user clicks the modify button and an error is thrown", () => {
    test("Then it should show an 'Error! Failed to modify movie' message", async () => {
      server.use(errorHandlers[4]);
      const errorFeedbackMessage = "Error! Failed to modify a movie";

      customRender(
        <MemoryRouter initialEntries={[`/:movieId/modify`]}>
          <App />
        </MemoryRouter>,
        movieMock,
      );

      const modifyButton = screen.getByRole("button", { name: "Modify" });

      await userEvent.click(modifyButton);

      const expectedErrorFeedback =
        await screen.findByText(errorFeedbackMessage);

      expect(expectedErrorFeedback).toBeInTheDocument();
    });
  });

  describe("When it is rendered on the login page and the user doesn't make any input", () => {
    test("Then it should show empty fields and a disabled button", async () => {
      customRender(
        <MemoryRouter initialEntries={[`/login`]}>
          <App />
        </MemoryRouter>,
      );

      const loginButton = screen.getByRole("button", { name: "Login" });

      expect(loginButton).toBeDisabled();

      screen.getAllByRole("textbox").forEach((inputField) => {
        expect(inputField).toHaveValue("");
      });
    });
  });

  describe("When it is rendered on the login page and the user fills all inputs with correct username and password", () => {
    test("Then you should see a 'Our movies' title on a heading", async () => {
      const fieldNames = ["Username", "Password"];
      const userText = "test1234";
      const homePageTitle = "Our movies";

      customRender(
        <MemoryRouter initialEntries={[`/login`]}>
          <App />
        </MemoryRouter>,
      );

      for (const text of fieldNames) {
        await userEvent.type(
          screen.getByRole("textbox", { name: text }),
          userText,
        );
      }

      const loginButton = screen.getByRole("button", { name: "Login" });

      await userEvent.click(loginButton);

      const title = await screen.findByRole("heading", { name: homePageTitle });

      expect(title).toBeInTheDocument();
    });
  });
});
