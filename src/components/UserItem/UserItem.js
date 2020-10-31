import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, View, Image, Button } from "react-native";
import io from "socket.io-client";

import { UserContext } from "@/contexts";
const ENDPOINT = "http://localhost:4000";

const UserItem = ({ user }) => {
  const {
    state: { userToken },
  } = useContext(UserContext);

  const sendInvitation = (user) => {
    let socket;
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);

    socket.emit("sendInvitation", { idInvited: user.id, userToken });
  };

  return (
    <View style={styles.row}>
      <Image
        style={styles.picture}
        source={{
          uri: "https://randomuser.me/api/portraits/thumb/women/21.jpg",
        }}
      />
      <View>
        <Text style={styles.primaryText}>
          {user.firstName + " " + user.lastName}
        </Text>
        <Text style={styles.secondaryText}>{user.email}</Text>
      </View>
      <Button
        style={styles.button}
        title="add friend"
        type="Solid"
        onPress={() => sendInvitation(user)}
      />
    </View>
  );
};
export default UserItem;

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
