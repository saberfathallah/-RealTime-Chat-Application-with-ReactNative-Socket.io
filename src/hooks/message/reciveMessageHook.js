import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

import { CONVERSATION } from "@/constants/routes";
let socket;

const reciveMessageHook = (
  navigation,
  showNotification,
  reciveMessage,
  user
) => {
  useEffect(() => {
    socket = io(`${API_URL}?id=${user.id}`);
  }, [API_URL, user.id]);

  useEffect(() => {
    socket.on("reciveMessage", (message) => {
      const { text, firstName, lastName, id } = message;

      showNotification({
        title: `${firstName} ${lastName}`,
        message: text,
        onPress: () => navigation.navigate(CONVERSATION, { userId: id }),
        additionalProps: { type: "error" },
      });
      reciveMessage({ ...message, userConnectedId: user.id, userId: id });
    });
  }, []);
};

export default reciveMessageHook;
