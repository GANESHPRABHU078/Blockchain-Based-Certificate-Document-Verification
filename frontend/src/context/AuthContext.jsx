import { createContext, useContext, useMemo, useState } from "react";
import { BrowserProvider } from "ethers";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const connectAndLogin = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not found in this browser");
    }

    const provider = new BrowserProvider(window.ethereum);
    try {
      if (typeof window.ethereum.request === "function") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        await provider.send("eth_requestAccounts", []);
      }

      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      const nonce = Date.now().toString();
      const signature = await signer.signMessage(`DecentralizedDigitalCredentialNetwork Login:${nonce}`);

      const response = await api.post("/api/auth/login", {
        walletAddress,
        nonce,
        signature
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("auth_user", JSON.stringify(response.data));
      setUser(response.data);
      return response.data;
    } catch (error) {
      if (error?.code === 4001) {
        throw new Error("Wallet connection request was rejected");
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, connectAndLogin, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
