import React from "react";

import Routes from "./Routers";
import UserProvider from "@/contexts/providers/userProvider";

const App = () => {
  return (
    <>
    <UserProvider>
      <Routes />
    </UserProvider>
    </>
  );
};

export default App;
