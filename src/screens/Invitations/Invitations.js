import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";

import { UserContext } from "@/contexts";
import AcceptOrRefuseInvitationButton from "@/components/AcceptOrRefuseInvitationButton";

const Invitations = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const {
    state: { invitations },
  } = useContext(UserContext);

  return (
    <>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onChangeSearch}
        value={searchQuery}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />

      <View>
        {invitations.map(
          ({ userSendInvitation: { id, lastName, firstName, email }, userSendInvitation }) => (
            <ListItem key={id} bottomDivider>
              <Avatar
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>
                  {firstName} {lastName}
                </ListItem.Title>
                <ListItem.Subtitle>{email}</ListItem.Subtitle>
              </ListItem.Content>
              <AcceptOrRefuseInvitationButton user={userSendInvitation} />
            </ListItem>
          )
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#09B7F8",
    backgroundColor: "#FFFFFF",
  },
});

export default Invitations;
