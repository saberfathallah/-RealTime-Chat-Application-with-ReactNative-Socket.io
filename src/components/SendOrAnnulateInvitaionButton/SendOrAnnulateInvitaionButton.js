import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import io from "socket.io-client";
import { Button } from "react-native-elements";

import { UserContext } from "@/contexts";
const ENDPOINT = "http://localhost:4000";

const SendOrAnnulateInvitaionButton = ({ user, isInvited }) => {
  const {
    state: { userToken, user: userConnected },
    sendInvitation,
    annulateInvitation,
  } = useContext(UserContext);

  const sentOrAnnulateInvitation = (user, isInvited) => {
    let socket;
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
    if (isInvited) {
      socket.emit("annulateInvitation", { idInvited: user.id, userToken });
      annulateInvitation(user.id);
    } else {
      socket.emit("sendInvitation", { idInvited: user.id, userToken });
      const { firstName, lastName, email, id } = userConnected;

      sendInvitation({
        userSendInvitation: { firstName, lastName, email, id },
        status: "pending",
        idInvited: user.id,
      });
    }
  };
  return (
    <View style={styles.row}>
      <Button
        style={styles.button}
        title={isInvited ? "annulate invitation" : "send invitation"}
        onPress={() => sentOrAnnulateInvitation(user, isInvited)}
        type="outline"
      />
    </View>
  );
};
export default SendOrAnnulateInvitaionButton;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", padding: 12 },
  picture: { width: 50, height: 50, borderRadius: 25, marginRight: 18 },
  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginBottom: 4,
  },
  secondaryText: { color: "grey" },
});
