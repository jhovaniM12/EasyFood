
import { ButtonType } from "@/types/Button.type";

export default function ButtonComponent({
    text,
    onClick,
    disabled,
    type
}: ButtonType) {
    return (
        <button
            className="bg-red-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    );
}