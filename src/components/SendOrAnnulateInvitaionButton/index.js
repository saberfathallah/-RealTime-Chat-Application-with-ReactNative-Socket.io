import React, { useContext } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

import { UserContext } from "@/contexts";
import SendOrAnnulateInvitaionButton from "./SendOrAnnulateInvitaionButton";

const SendOrAnnulateInvitaionButtonContainer = ({ user, isInvited }) => {
  const {
    state: { userToken, user: userConnected },
    sendInvitation,
    annulateInvitation,
  } = useContext(UserContext);

  const sentOrAnnulateInvitation = (user, isInvited) => {
    let socket;
    socket = io(`${API_URL}?id=${user.id}`);
    if (isInvited) {
      socket.emit("annulateInvitation", { idInvited: user.id, userToken });
      annulateInvitation(user.id);
    } else {
      socket.emit("sendInvitation", { idInvited: user.id, userToken });
      const { firstName, lastName, email, id } = userConnected;

      sendInvitation({
        userSendInvitation: { firstName, lastName, email, id },
        status: "pending",
        idInvited: user.id,
      });
    }
  };
  return (
    <SendOrAnnulateInvitaionButton
      sentOrAnnulateInvitation={sentOrAnnulateInvitation}
      user={user}
      isInvited={isInvited}
    />
  );
};

export default SendOrAnnulateInvitaionButtonContainer;
