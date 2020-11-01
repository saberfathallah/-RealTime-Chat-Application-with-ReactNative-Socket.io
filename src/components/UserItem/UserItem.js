import React, { useContext, useMemo } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

import SendOrAnnulateInvitaionButton from "@/components/SendOrAnnulateInvitaionButton";
import { UserContext } from "@/contexts";
import {
  isInvitedFunction,
  isSendInvitationFunction,
} from "@/helpers/invitations";

const UserItem = ({ user }) => {
  const {
    state: { invitations, listSendInvitation, user: userConnected },
  } = useContext(UserContext);
  const isSendInvitation = useMemo(
    () => isSendInvitationFunction(invitations, user),
    [invitations, user]
  );
  const isInvited = useMemo(() => isInvitedFunction(listSendInvitation, user), [
    listSendInvitation,
    user,
  ]);

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
      {isSendInvitation ? (
        <Text style={styles.primaryText}>accept or remove</Text>
      ) : (
        <SendOrAnnulateInvitaionButton user={user} isInvited={isInvited} />
      )}
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
