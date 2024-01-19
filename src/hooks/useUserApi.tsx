import axios from "axios";
import { UserCredentials } from "../types";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const useUserApi = () => {
  const getLoginUser = async (
    userCredentials: UserCredentials,
  ): Promise<string | undefined> => {
    const {
      data: { token },
    } = await axios.post<{ token: string }>("/user/login", {
      userCredentials,
    });

    return token;
  };

  return { getLoginUser };
};

export default useUserApi;
