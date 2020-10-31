import React, { useContext } from "react";
import { Header, Badge } from "react-native-elements";
import { Text } from "react-native";

import { UserContext } from "@/contexts";

const HeaderComponent = () => {
  const {
    state: { user },
    signOut,
  } = useContext(UserContext);

  return (
    <>
      <Header
        leftComponent={<Badge value="99+" status="error" />}
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
