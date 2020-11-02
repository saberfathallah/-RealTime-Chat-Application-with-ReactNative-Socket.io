import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

const reciveInvitationHook = (
  navigation,
  showNotification,
  reciveSendInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveInvitation", (newInvitation) => {
      reciveSendInvitation(newInvitation);

      const {
        userSendInvitation: { firstName, lastName },
      } = newInvitation;

      showNotification({
        title: "new Invitation",
        message: `new Invitation from ${firstName} ${lastName}`,
        onPress: () => navigation.navigate(INVITATIONS),
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveInvitationHook;
