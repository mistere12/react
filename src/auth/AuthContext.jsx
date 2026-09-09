import {
  createContext,
  useState
} from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function login(phone) {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ phone });
        setLoading(false);
        resolve();
      }, 500);
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}