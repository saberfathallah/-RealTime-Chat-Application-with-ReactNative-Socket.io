import React, { useReducer, useMemo } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import { signInService, signUpService, getAllUsersService } from "@/services/userServices";
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

        case "GET_ALL_USERS":
          return {
            ...prevState,
            users: action.users,
          };
      }
    },
    {
      userToken: null,
      user: {},
      signup: false,
      users:[],
    }
  );

  const userContext = useMemo(
    () => ({
      signIn: async (userInput) => {
        console.log("userInput", userInput)
        const signInResponse = await signInService(userInput);
        console.log("signInResponse", signInResponse)

        const { accessToken, user } = signInResponse;
        console.log("user", user)

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
      getAllUsers: async () => {
        console.log("herrrreeeee");
        const allUsersResponse = await getAllUsersService();
        console.log("allUsersRessssponse", allUsersResponse);

        dispatch({
          type: "GET_ALL_USERS",
          users: allUsersResponse.users,
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
