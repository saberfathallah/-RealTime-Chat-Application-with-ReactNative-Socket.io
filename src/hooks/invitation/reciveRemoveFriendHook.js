import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

const reciveRemoveFriendHook = (
  navigation,
  showNotification,
  removeFriend,
  user
) => {
  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveRemoveFriend", (oldFriend) => {
      removeFriend(
        oldFriend.id
      );

      const {
       firstName, lastName }
       = oldFriend;

      showNotification({
        title: "Refuse Invitation",
        message: `${firstName} ${lastName} remove from list firend `,
        onPress: () => navigation.navigate(INVITATIONS),
        additionalProps: { type: "error" },
      });
    });
  }, []);
};

export default reciveRemoveFriendHook;
