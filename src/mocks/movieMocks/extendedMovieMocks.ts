import { Movie } from "../../store/features/movies/types";
import { moviesMock } from "./moviesMocks";

const extendedMovieMocks: Movie[] = [
  moviesMock[0],
  moviesMock[1],
  {
    _id: "65637a12d4b93a3787b66106",
    name: "Superbad",
    director: "Greg Mottola",
    writer: "Seth Rogen, Evan Goldberg",
    stars: "Michael Cera,Jonah Hill",
    releaseDate: "2007-08-17",
    genre: "Comedy",
    description:
      "Two high school friends embark on a wild night of adventure in an attempt to make the most of their last days before graduation.",
    imageUrl: "https://i.ibb.co/YWG8sPY/superbad.webp",
    score: "4.5",
    isSeen: false,
  },
];

export default extendedMovieMocks;
