
interface LoginButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export default function LoginButton({ onClick, isLoading }: LoginButtonProps) {
  return (
    <button
      className="login-button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Iniciando..." : "Iniciar Sesión"}
    </button>
  );
}
