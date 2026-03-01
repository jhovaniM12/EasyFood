import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Store, AlertCircle } from "lucide-react";

interface RestaurantConflictModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function RestaurantConflictModal({
    open,
    onClose,
    onConfirm,
}: RestaurantConflictModalProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    padding: "12px",
                    maxWidth: "340px",
                    width: "100%",
                    textAlign: "center",
                },
            }}
        >
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, pb: 1 }}>
                <div className="w-14 h-14 rounded-full bg-[#FFEBEE] flex items-center justify-center mb-2 mx-auto">
                    <AlertCircle size={32} className="text-[#E53935]" />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#2D3142", lineHeight: 1.2, mb: 1 }}>
                    ¿Cambiar de restaurante?
                </Typography>
                <Typography variant="body2" sx={{ color: "#9DA3B4", mb: 3 }}>
                    Tu carrito ya contiene productos de otro restaurante. Si continúas, vaciaremos tu carrito para agregar este nuevo producto.
                </Typography>

                <div className="flex flex-col gap-2 w-full mt-2">
                    <Button
                        fullWidth
                        onClick={onConfirm}
                        variant="contained"
                        sx={{
                            backgroundColor: "#E53935",
                            color: "white",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.2,
                            boxShadow: "0 4px 14px rgba(229,57,53,0.35)",
                            "&:hover": { backgroundColor: "#c62828" },
                        }}
                    >
                        Sí, vaciar y agregar
                    </Button>
                    <Button
                        fullWidth
                        onClick={onClose}
                        variant="text"
                        sx={{
                            color: "#9CA3AF",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.2,
                        }}
                    >
                        Cancelar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
