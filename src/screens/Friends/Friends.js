import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import io from "socket.io-client";

import { UserContext } from "@/contexts";
import { CONVERSATION } from "../../constants/routes";
const ENDPOINT = "http://localhost:4000";

const Friends = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const {
    state: { friends, userToken },
    removeFriend,
  } = useContext(UserContext);

  const removeFriendFunction = (user) => {
    let socket;
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);

    socket.emit("removeFriend", { idFriend: user.id, userToken });
    removeFriend(user.id);
  };

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
        {friends.map(({ id, lastName, firstName, email }) => (
          <ListItem key={id} bottomDivider>
            <Avatar
              onPress={() => navigation.navigate(CONVERSATION, { userId: id })}
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
            <Button
              color="red"
              title="Remove friend"
              onPress={() =>
                removeFriendFunction({ id, lastName, firstName, email })
              }
            />
          </ListItem>
        ))}
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

export default Friends;
