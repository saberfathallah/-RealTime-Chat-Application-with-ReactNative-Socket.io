import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

let socket;

const reciveAnnulateInvitationHook = (
  navigation,
  showNotification,
  annulateInvitation,
  user
) => {
  useEffect(() => {
    socket = io(`${API_URL}?id=${user.id}`);
  }, [API_URL, user.id]);

  useEffect(() => {
    socket.on("reciveAnnulateInvitation", (annulateInvitationData) => {
      const { idInvited, firstName, lastName } = annulateInvitationData;

      annulateInvitation(idInvited);
      showNotification({
        title: "Annulate Invitation",
        message: `${firstName} ${lastName} canceled his invitation`,
        onPress: () => navigation.navigate(INVITATIONS), // navigate to profil
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveAnnulateInvitationHook;
