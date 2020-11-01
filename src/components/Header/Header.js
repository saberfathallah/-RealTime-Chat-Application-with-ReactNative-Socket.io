import React, { useContext, useEffect } from "react";
import { Header, Badge } from "react-native-elements";
import { Text } from "react-native";
import io from "socket.io-client";
import { withInAppNotification } from "react-native-in-app-notification";

import { UserContext } from "@/contexts";
import { INVITATIONS } from "@/constants/routes";

const ENDPOINT = "http://localhost:4000";
let socket;

const HeaderComponent = ({ navigation, showNotification }) => {
  const {
    state: { user, invitations },
    signOut,
    sendInvitation,
    annulateInvitation,
  } = useContext(UserContext);

  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveInvitation", (newInvitation) => {
      sendInvitation(newInvitation);

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

  return (
    <>
      <Header
        leftComponent={<Badge value={invitations.length} status="error" />}
        centerComponent={{
          text: `${user.firstName} ${user.lastName}`,
          style: { color: "#fff" },
        }}
        rightComponent={<Text onPress={() => signOut()}>Déconn...</Text>}
      />
    </>
  );
};
export default withInAppNotification(HeaderComponent);
