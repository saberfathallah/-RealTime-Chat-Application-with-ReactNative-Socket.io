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
  reciveRemoveFriendHook,
} from "@/hooks/invitation";
import { reciveMessageHook } from "@/hooks/message";

const HeaderComponent = ({ navigation, showNotification }) => {
  const {
    state: { user, invitations },
    signOut,
    reciveSendInvitation,
    annulateInvitation,
    reciveAcceptInvitation,
    reciveRefuseInvitation,
    removeFriend,
    reciveMessage,
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

  reciveRemoveFriendHook(navigation, showNotification, removeFriend, user);

  reciveMessageHook(navigation, showNotification, reciveMessage, user);

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
