"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { tokenStorage } from "../../common/http";
import type { LoginRequest, RegisterRequest, User } from "../domain/auth";
import * as authService from "../services/auth.service";
import { userStorage } from "../services/session-storage";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  // Aviso breve para el usuario (por ejemplo, "Cerraste sesión con éxito").
  notice: string | null;
  dismissNotice: () => void;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<number | undefined>(undefined);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Restaurar la sesión al cargar la página: el token vive en localStorage,
  // que solo existe en el navegador, por eso se hace en un efecto.
  useEffect(() => {
    const token = tokenStorage.get();
    const storedUser = userStorage.get();

    if (token && storedUser) {
      setUser(storedUser);
      // Comprueba que el token siga vigente. Si expiró, el cliente HTTP
      // cierra la sesión y lleva a /login.
      authService.getSession().catch(() => {});
    } else {
      tokenStorage.clear();
      userStorage.clear();
    }

    setLoading(false);

    // El cliente HTTP avisa con este evento cuando recibe un 401.
    function handleForcedLogout() {
      userStorage.clear();
      setUser(null);
    }

    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function dismissNotice() {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    setNotice(null);
  }

  function showNotice(message: string) {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 4500);
  }

  async function login(data: LoginRequest): Promise<User> {
    const response = await authService.login(data);

    tokenStorage.set(response.token);
    userStorage.set(response.usuario);
    setUser(response.usuario);

    return response.usuario;
  }

  // Crea la cuenta, pero no inicia sesión: el usuario pasa por /login.
  async function register(data: RegisterRequest): Promise<void> {
    await authService.register(data);
  }

  function logout() {
    tokenStorage.clear();
    userStorage.clear();
    setUser(null);
    showNotice("Cerraste sesión con éxito. ¡Hasta pronto! 🐾");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: user !== null,
        isAdmin: user?.role === "admin",
        notice,
        dismissNotice,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}