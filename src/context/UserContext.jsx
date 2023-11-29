import { createContext, useContext } from "react";
import { useSessionStorageState } from "@/hooks/useSessionStorageState.js";

const UserContext = createContext({
  userId: null,
  setUserInfo: () => {},
});

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useSessionStorageState(null, "userId");

  const setUserInfo = ({ userIdFromDB }) => {
    setUserId(userIdFromDB);
  };

  return (
    <UserContext.Provider value={{ userId, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside UserProvider");
  return context;
};

export { UserProvider, useUser };
