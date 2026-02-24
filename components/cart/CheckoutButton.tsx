"use client";

import Button from "@mui/material/Button";
import { ChevronRight } from "lucide-react";

interface CheckoutButtonProps {
    disabled?: boolean;
    onClick?: () => void;
}

export default function CheckoutButton({ disabled = false, onClick }: CheckoutButtonProps) {
    return (
        <div className="px-4 mt-5 pb-4">
            <Button
                fullWidth
                variant="contained"
                disabled={disabled}
                onClick={onClick}
                endIcon={<ChevronRight size={18} />}
                sx={{
                    borderRadius: "16px",
                    py: 1.6,
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    textTransform: "none",
                    backgroundColor: disabled ? "#9CA3AF" : "#E53935",
                    "&:hover": { backgroundColor: disabled ? "#9CA3AF" : "#c62828" },
                    "&.Mui-disabled": {
                        backgroundColor: "#9CA3AF",
                        color: "#fff",
                    },
                    boxShadow: disabled ? "none" : "0 4px 14px rgba(229,57,53,0.35)",
                }}
            >
                Proceder al pago
            </Button>
        </div>
    );
}
