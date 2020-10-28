import React from "react";
import { Text, StyleSheet, View, Image, Button } from "react-native";

const UserItem = ({ user }) => (
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
    <Button style={styles.button} title="add friend" type="Solid" />
  </View>
);
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
