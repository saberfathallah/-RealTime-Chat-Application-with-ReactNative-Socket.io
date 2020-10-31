import React, { useReducer, useMemo } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import {
  signInService,
  signUpService,
  getAllUsersService,
} from "@/services/userServices";
import {
  getAllInvitationService,
  getFriendsListService,
} from "@/services/inviationServices";
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
            userToken: null,
          };
        case "GET_ALL_USERS":
          return {
            ...prevState,
            users: action.users,
          };

        case "GET_ALL_INVITATIONS":
          return {
            ...prevState,
            invitations: action.invitations,
          };

        case "SEND_INVIATION":
          return {
            ...prevState,
            invitations: [...prevState.invitations, action.newInvitation],
          };
      }
    },
    {
      userToken: null,
      user: {},
      signup: false,
      users: [],
      invitations: [],
      friends: [],
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
        await setToken(accessToken);
      },
      signOut: async () => {
        await AsyncStorage.clear();

        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (userInput) => {
        const signUpResponse = await signUpService(userInput);

        dispatch({
          type: "SIGN_UP",
          token: "dummy-auth-token",
          user: "saber",
        });
      },

      getAllUsers: async () => {
        const allUsersResponse = await getAllUsersService();

        dispatch({
          type: "GET_ALL_USERS",
          users: allUsersResponse.users,
        });
      },

      getAllInvittions: async () => {
        const allInvitations = await getAllInvitationService();

        dispatch({
          type: "GET_ALL_INVITATIONS",
          invitations: allInvitations.invitations,
        });
      },

      sendInvitation: async (newInvitation) => {
        dispatch({
          type: "SEND_INVIATION",
          newInvitation: newInvitation,
        });
      },

      getFriends: async () => {
        const friends = await getFriendsListService();

        dispatch({
          type: "GET_FRIENDS",
          friends: friends.friends,
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
