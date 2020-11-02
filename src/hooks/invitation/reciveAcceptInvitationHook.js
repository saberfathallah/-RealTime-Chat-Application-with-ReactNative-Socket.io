import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

const reciveAcceptInvitationHook = (
  navigation,
  showNotification,
  reciveAcceptInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveAcceptInvitation", (invitation) => {
      reciveAcceptInvitation(invitation);

      const {
        user: { firstName, lastName },
      } = invitation;

      showNotification({
        title: "Accept Invitation",
        message: `${firstName} ${lastName} Accept your invitation`,
        onPress: () => navigation.navigate(INVITATIONS),
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveAcceptInvitationHook;
