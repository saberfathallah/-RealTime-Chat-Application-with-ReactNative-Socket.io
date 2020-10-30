import React, { useContext } from "react";
import { Header, Badge } from "react-native-elements";

import { UserContext } from "@/contexts";

const HeaderComponent = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <>
      <Header
        leftComponent={<Badge value="99+" status="error" />}
        centerComponent={{
          text: `${user.firstName} ${user.lastName}`,
          style: { color: "#fff" },
        }}
        rightComponent={{
          text: "Déconnexion",
          style: { color: "#fff" },
        }}
      />
    </>
  );
};
export default HeaderComponent;
