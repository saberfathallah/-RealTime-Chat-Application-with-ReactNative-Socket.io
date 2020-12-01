import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

let socket;

const reciveAcceptInvitationHook = (
  navigation,
  showNotification,
  reciveAcceptInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${API_URL}?id=${user.id}`);
  }, [API_URL, user.id]);

  useEffect(() => {
    socket.on("reciveAcceptInvitation", (invitation) => {
      reciveAcceptInvitation(invitation);

      const {
        user: { firstName, lastName },
      } = invitation;

      showNotification({
        title: "Accept Invitation",
        message: `${firstName} ${lastName} Accept your invitation`,
        onPress: () => navigation.navigate(INVITATIONS), // navigate to profil
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveAcceptInvitationHook;
