import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "@env";

let socket;

const reciveRemoveFriendHook = (
  navigation,
  showNotification,
  removeFriend,
  user
) => {
  useEffect(() => {
    socket = io(`${API_URL}?id=${user.id}`);
  }, [API_URL, user.id]);

  useEffect(() => {
    socket.on("reciveRemoveFriend", (oldFriend) => {
      removeFriend(oldFriend.id);

      const { firstName, lastName } = oldFriend;

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
