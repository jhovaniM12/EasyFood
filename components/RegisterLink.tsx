
interface RegisterLinkProps {
  onRegisterClick?: () => void;
}

export default function RegisterLink({ onRegisterClick }: RegisterLinkProps) {
  return (
    <div className="register-link">
      <span>¿Eres nuevo en la UAO?</span>
      <button 
        type="button"
        className="register-button"
        onClick={onRegisterClick}
      >
        Regístrate
      </button>
    </div>
  );
}
