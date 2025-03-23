import { useReducer } from "react";
import { createContext, useContext } from "react";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logOut":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown action");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });

    return isAuthenticated
  }

  function logOut() {
    dispatch({ type: "logOut" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider.");
  return context;
}

export { AuthProvider, useAuth };
