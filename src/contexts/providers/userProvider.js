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
  getListUserInvited,
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
            invitations: action.invitations,
            friends: action.friends,
            listSendInvitation: action.listSendInvitation,
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
            listSendInvitation: [
              ...prevState.listSendInvitation,
              action.newInvitation,
            ],
          };

        case "RECIVE_SEND_INVIATION":
          return {
            ...prevState,
            invitations: [...prevState.invitations, action.newInvitation],
          };

        case "ACCEPT_INVITATION":
          return {
            ...prevState,
            invitations: prevState.invitations.filter(
              (invitation) =>
                invitation.idInvited !== action.invitation.idInvited &&
                invitation.userSendInvitation.id === action.invitation.user.id
            ),
            friends: [...prevState.friends, action.invitation.user],
          };

        case "RECIVE_ACCEPT_INVIATION":
          return {
            ...prevState,
            listSendInvitation: prevState.listSendInvitation.filter(
              (invitation) => invitation.idInvited !== action.invitation.idSend
            ),
            friends: [...prevState.friends, action.invitation.user],
          };

        case "ANNULATE_INVIATION":
          return {
            ...prevState,
            invitations: prevState.invitations.filter(
              (invitation) => invitation.idInvited !== action.idInvited
            ),
            listSendInvitation: prevState.listSendInvitation.filter(
              (invitation) => invitation.idInvited !== action.idInvited
            ),
          };

        case "REFUSE_INVIATION":
          return {
            ...prevState,
            invitations: prevState.invitations.filter(
              (invitation) =>
                invitation.idInvited !== action.idInvited &&
                invitation.userSendInvitation.id === action.idSend
            ),
          };

        case "RECIVE_REFUSE_INVIATION":
          return {
            ...prevState,
            listSendInvitation: prevState.listSendInvitation.filter(
              (invitation) =>
                invitation.idInvited !== action.idInvited &&
                invitation.userSendInvitation.id === action.idSend
            ),
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
      listSendInvitation: [],
    }
  );

  const userContext = useMemo(
    () => ({
      signIn: async (userInput) => {
        const signInResponse = await signInService(userInput);
        const { accessToken, user } = signInResponse;
        await setToken(accessToken);
        const { invitations } = await getAllInvitationService();
        const { listUserInvited } = await getListUserInvited();
        const { friends } = await getFriendsListService();

        dispatch({
          type: "SIGN_IN",
          token: accessToken,
          user,
          invitations,
          friends,
          listSendInvitation: listUserInvited,
        });
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

      // getAllInvittions: async () => {
      //   const allInvitations = await getAllInvitationService();

      //   dispatch({
      //     type: "GET_ALL_INVITATIONS",
      //     invitations: allInvitations.invitations,
      //   });
      // },

      sendInvitation: async (newInvitation) => {
        dispatch({
          type: "SEND_INVIATION",
          newInvitation: newInvitation,
        });
      },

      reciveSendInvitation: async (newInvitation) => {
        dispatch({
          type: "RECIVE_SEND_INVIATION",
          newInvitation: newInvitation,
        });
      },

      annulateInvitation: async (idInvited) => {
        dispatch({
          type: "ANNULATE_INVIATION",
          idInvited,
        });
      },

      acceptInvitation: async (invitation) => {
        dispatch({
          type: "ACCEPT_INVITATION",
          invitation,
        });
      },

      reciveAcceptInvitation: async (invitation) => {
        dispatch({
          type: "RECIVE_ACCEPT_INVIATION",
          invitation,
        });
      },

      refuseInvitation: async (idSend, idInvited) => {
        dispatch({
          type: "REFUSE_INVIATION",
          idSend,
          idInvited,
        });
      },

      reciveRefuseInvitation: async (idSend, idInvited) => {
        dispatch({
          type: "RECIVE_REFUSE_INVIATION",
          idSend,
          idInvited,
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
