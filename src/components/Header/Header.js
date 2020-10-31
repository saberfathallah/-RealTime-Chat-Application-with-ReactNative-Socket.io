import React, { useContext, useEffect } from "react";
import { Header, Badge } from "react-native-elements";
import { Text } from "react-native";
import io from "socket.io-client";

import { UserContext } from "@/contexts";
const ENDPOINT = "http://localhost:4000";
let socket;

const HeaderComponent = () => {
  const {
    state: { user, invitations },
    signOut,
    getAllInvittions,
    sendInvitation,
  } = useContext(UserContext);

  useEffect(() => {
    getAllInvittions();
  }, []);

  useEffect(() => {
    socket = io(`${ENDPOINT}?idInvited=${user.id}`);
  }, [ENDPOINT, user.id]);

  useEffect(() => {
    socket.on("reciveInvitation", (newInvitation) => {
      sendInvitation(newInvitation);
    });
  }, []);

  return (
    <>
      <Header
        leftComponent={<Badge value={invitations.length} status="error" />}
        centerComponent={{
          text: `${user.firstName} ${user.lastName}`,
          style: { color: "#fff" },
        }}
        rightComponent={<Text onPress={() => signOut()}>Déconn...</Text>}
      />
    </>
  );
};
export default HeaderComponent;
