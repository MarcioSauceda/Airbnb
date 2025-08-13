import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

  // Cargar perfil (opcional) cuando exista endpoint /me
useEffect(() => {
    let isMounted = true;
    (async () => {
        if (!token) { setUser(null); return; }
        setLoading(true);
        try {
        // const me = await authApi.me();
        // if (isMounted) setUser(me);
        } catch {
        logout();
        } finally {
        if (isMounted) setLoading(false);
        }
    })();
    return () => { isMounted = false; };
}, [token]);

function loginSuccess(jwt, profile = null) {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    if (profile) setUser(profile);
}

function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
}

return (
    <AuthContext.Provider value={{ token, user, loading, loginSuccess, logout }}>
        {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);
