import { useCallback } from "react";
import { UserDataStructure } from "../../types";
import { jwtDecode } from "jwt-decode";

const useToken = () => {
  const getDecodedToken = useCallback(
    async (token: string): Promise<UserDataStructure> => {
      const decodeToken: { sub: string; name: string } = jwtDecode(token);

      const userData = {
        id: decodeToken.sub,
        username: decodeToken.name,
      };

      return userData;
    },
    [],
  );

  return { getDecodedToken };
};

export default useToken;
