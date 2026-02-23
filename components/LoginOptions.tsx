import React from "react";

interface LoginOptionsProps {
  rememberMe?: boolean;
  onRememberMeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onForgotPasswordClick?: () => void;
}

export default function LoginOptions({
  rememberMe,
  onRememberMeChange,
  onForgotPasswordClick,
}: LoginOptionsProps) {
  return (
    <div className="login-options">
      <label className="login-checkbox">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={onRememberMeChange}
        />
        Recordarme
      </label>
      <button
        type="button"
        className="login-forgot-password"
        onClick={onForgotPasswordClick}
      >
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  );
}
