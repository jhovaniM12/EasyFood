import React from "react";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/logo.png" alt="EasyFood UAO" className="login-logo" />
        <h1 className="login-title">EASYFOOD<br />UAO</h1>
        <p className="login-subtitle">Almuerza sin filas, almuerza sin estrés</p>
      </div>
      <form className="login-form">
        <label className="login-label">CÓDIGO ESTUDIANTE/COLABORADOR</label>
        <input type="text" placeholder="Ej: 2205432" className="login-input" />
        <label className="login-label">CONTRASEÑA</label>
        <input type="password" placeholder="********" className="login-input" />
        <div className="login-options">
          <label className="login-checkbox">
            <input type="checkbox" /> Recordarme
          </label>
          <a href="#" className="login-link">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <div className="login-footer">
        <span>¿Eres nuevo en la UAO?</span>
        <a href="#" className="login-register">Regístrate</a>
      </div>
    </div>
  );
}
