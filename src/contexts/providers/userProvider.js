import React, { useReducer, useMemo, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import signInService from "@/services/userServices/signInService";
import signUpService from "@/services/userServices/signUpService";
import { UserContext } from "../index";
import { setToken } from "@/utils/auth";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_UP":
          return {
            ...prevState,
            signup: true,
          };

        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
          };

        case "SIGN_OUT":
          return {
            ...prevState,
            user: {},
            userToken: null,
          };
      }
    },
    {
      userToken: null,
      user: {},
      signup: false,
    }
  );

  const userContext = useMemo(
    () => ({
      signIn: async (userInput) => {
        const signInResponse = await signInService(userInput);
        const { accessToken, user } = signInResponse;

        dispatch({
          type: "SIGN_IN",
          token: accessToken,
          isFirstSignIn: true,
          user,
        });
        setToken(accessToken);
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (userInput) => {
        const signUpResponse = await signUpService(userInput);
        console.log("signUpResponse", signUpResponse);

        dispatch({
          type: "SIGN_UP",
          token: "dummy-auth-token",
          user: "saber",
        });
      },
    }),
    []
  );

  return (
    <UserContext.Provider value={{ ...userContext, state }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
