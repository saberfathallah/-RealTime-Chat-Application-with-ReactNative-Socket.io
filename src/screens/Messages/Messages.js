import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { UserContext } from "@/contexts";

import { CONVERSATION } from "../../constants/routes";

const Messages = ({ navigation }) => {
  const {
    state: { conversations },
  } = useContext(UserContext);
  console.log(
    "conversationsconversationsconversationsconversations",
    conversations
  );
  return (
    <View>
      {conversations.map(({ user, conversation }) => (
        <ListItem key={user.id} bottomDivider>
          <Avatar
            onPress={() =>
              navigation.navigate(CONVERSATION, { userId: user.id })
            }
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>
              {user.firstName} {user.lastName}
            </ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={{ fontSize: 12, color: "#FF0D10" }}>
            {conversation[0].text}
          </Text>
        </ListItem>
      ))}
    </View>
  );
};
export default Messages;
