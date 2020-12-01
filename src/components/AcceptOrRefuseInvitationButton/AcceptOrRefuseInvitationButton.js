import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const AcceptOrRefuseInvitationButton = ({
  user,
  acceptInvitationFunction,
  refuseInvitationFunction,
}) => {
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
