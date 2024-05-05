import { useMutation } from "@apollo/client";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { AUTOLOGIN } from "../graphql/users";

interface AuthContextType {
  user: { _id: string | undefined; username: string | undefined } | null;
  setUser: Dispatch<
    SetStateAction<{
      _id: string | undefined;
      username: string | undefined;
    } | null>
  >;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<{
    _id: string | undefined;
    username: string | undefined;
  } | null>(null);

  const token = localStorage.getItem("token");
  const [autoLogin, { data }] = useMutation(AUTOLOGIN);

  useEffect(() => {
    let user;
    const f = async () => {
      user = await autoLogin({
        variables: {
          token,
        },
      });
      setUser({
        _id: user.data.autoLogin._id,
        username: user.data.autoLogin.username,
      });
    };
    if (token) f();
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
