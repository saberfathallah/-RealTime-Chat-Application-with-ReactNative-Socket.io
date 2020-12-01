import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

let socket;

const reciveRefuseInvitationHook = (
  navigation,
  showNotification,
  reciveRefuseInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${API_URL}?id=${user.id}`);
  }, [API_URL, user.id]);

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
        onPress: () => navigation.navigate(INVITATIONS), // navigate to profil
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveRefuseInvitationHook;
