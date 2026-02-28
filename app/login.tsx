"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(codigo, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/logo.png" alt="EasyFood UAO" className="login-logo" />
        <h1 className="login-title">EASYFOOD<br />UAO</h1>
        <p className="login-subtitle">Almuerza sin filas, almuerza sin estrés</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">CÓDIGO ESTUDIANTE/COLABORADOR</label>
        <input
          type="text"
          placeholder="Ej: 2205432"
          className="login-input"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <label className="login-label">CONTRASEÑA</label>
        <input
          type="password"
          placeholder="********"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="login-options">
          <label className="login-checkbox">
            <input type="checkbox" /> Recordarme
          </label>
          <a href="#" className="login-link">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
      <div className="login-footer">
        <span>¿Eres nuevo en la UAO?</span>
        <a href="#" className="login-register">Regístrate</a>
      </div>
    </div>
  );
}
