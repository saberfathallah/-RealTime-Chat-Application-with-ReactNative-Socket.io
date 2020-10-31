import React from "react";

import Routes from "./Routers";
import UserProvider from "@/contexts/providers/userProvider";
import { InAppNotificationProvider } from "react-native-in-app-notification";

const App = () => {
  return (
    <>
      <InAppNotificationProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </InAppNotificationProvider>
    </>
  );
};

export default App;
