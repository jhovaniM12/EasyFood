import PasswordEntry from "@/components/PasswordEntry";
import StudentCodeInput from "../components/StudentCodeInput";
import LoginOptions from "../components/LoginOptions";
import LoginButton from "../components/LoginButton";
import RegisterLink from "../components/RegisterLink";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 px-4">
      <img src="/logo.png" alt="Logo" className="login-logo"  />
      <h2>Almuerza sin fila, almuerza sin estrés </h2>
      <br />
      <StudentCodeInput />
      <PasswordEntry />
      <LoginOptions />
      <LoginButton /> <br />
      <RegisterLink />
    </div>
  );
}
