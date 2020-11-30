import React, { useCallback, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";

import { UserContext } from "@/contexts";

export default function Conversation({ route }) {
  const {
    state: { userToken, conversations, user },
    sendMessage,
  } = useContext(UserContext);
  const conversation = conversations.filter(
    (conversation) => conversation.user.id === route.params.userId
  );

  const covvv =
    conversation[0] &&
    conversation[0].conversation &&
    conversation[0].conversation.length > 0
      ? conversation[0].conversation.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      : [];

  const onSend = useCallback((messages = []) => {
    const {
      params: { userId },
    } = route;
    const createdAt = new Date();

    let socket;
    const ENDPOINT = "http://localhost:4000";

    socket = io(`${ENDPOINT}?idInvited=${userId}`);
    socket.emit("sendMessage", {
      userId,
      text: messages[0].text,
      userToken,
      createdAt,
    });

    GiftedChat.append(covvv, messages);

    sendMessage({
      text: messages[0].text,
      createdAt,
      userId,
      id: user.id,
      firstName: user.firstName,
    });
  }, []);

  return (
    <GiftedChat
      messages={covvv}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
      }}
    />
  );
}
