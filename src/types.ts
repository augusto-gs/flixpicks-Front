export interface UserCredentialsStructure {
  username: string;
  password: string;
}

export interface UserDataStructure {
  id: string;
  username: string;
}

export interface UserTokenStructure extends UserDataStructure {
  token: string;
}

export interface UserLoggedStructure extends UserTokenStructure {
  isLogged: boolean;
}
