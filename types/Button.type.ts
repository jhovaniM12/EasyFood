
export interface ButtonType {
    text: string;
    onClick: () => void;
    disabled: boolean;
    type: "button" | "submit" | "reset";
}