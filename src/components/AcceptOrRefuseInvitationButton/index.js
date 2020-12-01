import React, { useContext } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";
import { UserContext } from "@/contexts";

import AcceptOrRefuseInvitationButton from "./AcceptOrRefuseInvitationButton";

const AcceptOrRefuseInvitationButtonContainer = ({ user }) => {
  const {
    state: { userToken, user: userConnected },
    acceptInvitation,
    refuseInvitation,
  } = useContext(UserContext);

  const acceptInvitationFunction = (user) => {
    let socket;
    socket = io(`${API_URL}?id=${user.id}`);

    socket.emit("acceptInvitation", { idSend: user.id, userToken });
    acceptInvitation({ user, idInvited: userConnected.id });
  };

  const refuseInvitationFunction = (user) => {
    let socket;
    socket = io(`${API_URL}?id=${user.id}`);

    socket.emit("refuseInvitation", { idSend: user.id, userToken });
    refuseInvitation(user.id, userConnected.id);
  };

  return (
    <AcceptOrRefuseInvitationButton
      acceptInvitationFunction={acceptInvitationFunction}
      refuseInvitationFunction={refuseInvitationFunction}
      user={user}
    />
  );
};

export default AcceptOrRefuseInvitationButtonContainer;
