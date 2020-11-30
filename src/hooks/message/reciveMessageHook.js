import { useEffect } from "react";
import io from "socket.io-client";
import { CONVERSATION } from "@/constants/routes";

const ENDPOINT = "http://localhost:4000";
let socket;

const reciveMessageHook = (
  navigation,
  showNotification,
  reciveMessage,
  user
) => {
  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveMessage", (message) => {
      const { text, firstName, lastName, id } = message;

      showNotification({
        title: `${firstName} ${lastName}`,
        message: text,
        onPress: () => navigation.navigate(CONVERSATION, { userId: id }),
        additionalProps: { type: "error" },
      });
      reciveMessage(message);
    });
  }, []);
};

export default reciveMessageHook;
