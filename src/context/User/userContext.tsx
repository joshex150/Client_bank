import { createContext, useState, useEffect, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export const userContext = createContext({
  user: "",
  onUserChange: (newUser: any) => {},
  logout: () => {},
});

export const UserContextProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem("flag");
    return storedUser ? JSON.parse(storedUser) : '';
  });

  const handleUserChange = (newUser: any) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser("");
  };

  const contextValue: any = {
    user: user,
    onUserChange: handleUserChange,
    logout: logout,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};
