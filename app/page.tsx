"use client";

import { useState } from "react";
import * as yup from "yup";
import PasswordEntry from "@/components/PasswordEntry";
import StudentCodeInput from "@/components/StudentCodeInput";
import LoginOptions from "@/components/LoginOptions";
import LoginButton from "@/components/LoginButton";
import RegisterLink from "@/components/RegisterLink";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = yup.object({
  codigo: yup.string().required("El código es obligatorio").min(4, "Mínimo 4 caracteres"),
  password: yup.string().required("La contraseña es obligatoria").min(4, "Mínimo 4 caracteres"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setFieldErrors({});
    setApiError(null);

    try {
      await loginSchema.validate({ codigo, password }, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((e) => { if (e.path) errors[e.path] = e.message; });
        setFieldErrors(errors);
        return;
      }
    }

    setLoading(true);
    try {
      await login(codigo, password);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#FDF4ED] items-center px-4 overflow-y-auto">
      <img src="/logo.png" alt="Logo" className="login-logo" />
      <h2>Almuerza sin fila, almuerza sin estrés </h2>
      <br />
      <StudentCodeInput value={codigo} onChange={(e) => setCodigo(e.target.value)} />
      {fieldErrors.codigo && <p className="text-red-500 text-xs -mt-3 mb-2 w-full">{fieldErrors.codigo}</p>}
      <PasswordEntry value={password} onChange={(e) => setPassword(e.target.value)} />
      {fieldErrors.password && <p className="text-red-500 text-xs -mt-3 mb-2 w-full">{fieldErrors.password}</p>}
      <LoginOptions />
      {apiError && <p className="text-red-500 text-sm mb-2 w-full text-center">{apiError}</p>}
      <LoginButton onClick={handleLogin} isLoading={loading} />
      <br />
      <RegisterLink />
    </div>
  );
}
