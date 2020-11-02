import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

const reciveAnnulateInvitationHook = (
  navigation,
  showNotification,
  annulateInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveAnnulateInvitation", (annulateInvitationData) => {
      const { idInvited, firstName, lastName } = annulateInvitationData;

      annulateInvitation(idInvited);
      showNotification({
        title: "Annulate Invitation",
        message: `${firstName} ${lastName} canceled his invitation`,
        onPress: () => navigation.navigate(INVITATIONS),
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveAnnulateInvitationHook;
