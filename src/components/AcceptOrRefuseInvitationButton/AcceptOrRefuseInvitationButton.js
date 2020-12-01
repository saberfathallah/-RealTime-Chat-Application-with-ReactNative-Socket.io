import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import io from "socket.io-client";
import { Button } from "react-native-elements";
import { API_URL } from "@env";

import { UserContext } from "@/contexts";

const AcceptOrRefuseInvitationButton = ({ user }) => {
  const {
    state: { userToken, user: userConnected },
    acceptInvitation,
    refuseInvitation,
  } = useContext(UserContext);

  const acceptInvitationFunction = (user) => {
    let socket;
    socket = io(`${API_URL}?id=${user.id}`);

    socket.emit("acceptInvitation", { idSend: user.id, userToken });
    acceptInvitation({ user, idInvited: userConnected.id });
  };

  const refuseInvitationFunction = (user) => {
    let socket;
    socket = io(`${API_URL}?id=${user.id}`);

    socket.emit("refuseInvitation", { idSend: user.id, userToken });
    refuseInvitation(user.id, userConnected.id);
  };

  return (
    <View style={styles.row}>
      <Button
        style={styles.button}
        title="Accept"
        onPress={() => acceptInvitationFunction(user)}
        type="outline"
      />
      <Button
        style={styles.button}
        title="refuse"
        onPress={() => refuseInvitationFunction(user)}
        type="outline"
      />
    </View>
  );
};
export default AcceptOrRefuseInvitationButton;

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
