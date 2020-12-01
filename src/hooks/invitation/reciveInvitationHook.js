import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

let socket;

const reciveInvitationHook = (
  navigation,
  showNotification,
  reciveSendInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${API_URL}?id=${user.id}`);
  }, [API_URL, user.id]);

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
