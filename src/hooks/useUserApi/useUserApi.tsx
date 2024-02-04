import axios from "axios";
import { UserCredentialsStructure } from "../../types";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../../store/features/UI/uiSlice";
import { toast } from "react-toastify";
import { setStyle } from "../../utils/toastifyFunctions";
import { useAppDispatch } from "../../store/hooks";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const useUserApi = () => {
  const dispatch = useAppDispatch();

  const getUserLogin = async (
    userCredentials: UserCredentialsStructure,
  ): Promise<string | undefined> => {
    try {
      dispatch(showLoadingActionCreator());

      const {
        data: { token },
      } = await axios.post<{ token: string }>("/user/login", {
        username: userCredentials.username,
        password: userCredentials.password,
      });

      dispatch(hideLoadingActionCreator());

      return token;
    } catch {
      dispatch(hideLoadingActionCreator());

      toast.error("Wrong credentials", setStyle("#d65745", "#F3CDC8"));
    }
  };

  return { getUserLogin };
};

export default useUserApi;
