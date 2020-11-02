import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

const reciveRefuseInvitationHook = (
  navigation,
  showNotification,
  reciveRefuseInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveRefuseInvitation", (newInvitation) => {
      reciveRefuseInvitation(
        newInvitation.user.idSend,
        newInvitation.idInvited
      );

      const {
        user: { firstName, lastName },
      } = newInvitation;

      showNotification({
        title: "Refuse Invitation",
        message: `${firstName} ${lastName} refuse your invitation`,
        onPress: () => navigation.navigate(INVITATIONS),
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveRefuseInvitationHook;
