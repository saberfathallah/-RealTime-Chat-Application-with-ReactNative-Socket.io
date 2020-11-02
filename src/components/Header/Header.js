import React, { useContext, useEffect } from "react";
import { Header, Badge } from "react-native-elements";
import { Text } from "react-native";
import { withInAppNotification } from "react-native-in-app-notification";

import { UserContext } from "@/contexts";
import {
  reciveInvitationHook,
  reciveAcceptInvitationHook,
  reciveAnnulateInvitationHook,
  reciveRefuseInvitationHook,
} from "@/hooks/invitation";

const HeaderComponent = ({ navigation, showNotification }) => {
  const {
    state: { user, invitations },
    signOut,
    reciveSendInvitation,
    annulateInvitation,
    reciveAcceptInvitation,
    reciveRefuseInvitation,
  } = useContext(UserContext);

  reciveRefuseInvitationHook(
    navigation,
    showNotification,
    reciveRefuseInvitation,
    user
  );

  reciveAnnulateInvitationHook(
    navigation,
    showNotification,
    annulateInvitation,
    user
  );

  reciveInvitationHook(
    navigation,
    showNotification,
    reciveSendInvitation,
    user
  );

  reciveAcceptInvitationHook(
    navigation,
    showNotification,
    reciveAcceptInvitation,
    user
  );

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
