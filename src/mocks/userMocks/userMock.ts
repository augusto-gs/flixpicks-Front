import {
  UserCredentialsStructure,
  UserLoggedStructure,
  UserTokenStructure,
} from "../../types";

export const userMock: UserCredentialsStructure = {
  username: "testuser",
  password: "test1234",
};

export const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWFhYmE4NWFlMWNmZjg2Y2FjMTZmZjIiLCJuYW1lIjoiQXVndXN0byBHb21leiIsImlhdCI6MTcwNjI3MjEzMCwiZXhwIjoxNzA4ODY0MTMwfQ.cDYCydtNUdocAkb7y7xwLBGPNrcl8K-WhMIW15RhLTE";

export const subMock = {
  id: "65aaba85ae1cff86cac16ff2",
  username: "Augusto Gomez",
};

export const loggedUserMock: UserTokenStructure = {
  ...subMock,
  token: tokenMock,
};

export const correctlyLoggedUserMock: UserLoggedStructure = {
  ...loggedUserMock,
  isLogged: true,
};
