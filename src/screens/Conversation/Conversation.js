import React, { useCallback, useContext, useMemo } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";

import { UserContext } from "@/contexts";
import { getSortConversation } from "@/helpers/messages";

export default function Conversation({ route }) {
  const {
    state: { userToken, conversations, user },
    sendMessage,
  } = useContext(UserContext);

  const conversation = useMemo(
    () => getSortConversation(conversations, route.params.userId),
    [conversations, route.params.userId]
  );

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

    GiftedChat.append(conversation, messages);

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
      messages={conversation}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
      }}
    />
  );
}
