"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BookMarked } from "lucide-react";
import Button from "@mui/material/Button";
import { SUCCESS_COPY } from "@/constants/PaymentSuccess";
import { Suspense } from "react";

function ActionsContent() {
    const router = useRouter();
    const params = useSearchParams();

    const order = params.get("order") ?? "EF-UAO-000";
    const total = params.get("total") ?? "0";
    const items = params.get("items") ?? "1";

    const handleTrackOrder = () => {
        router.push(`/shopping/tracking?order=${order}&total=${total}&items=${items}`);
    };

    return (
        <div className="px-4 mt-8 flex flex-col gap-3">
            {/* Primary: Seguir mi pedido */}
            <Button
                fullWidth
                variant="contained"
                endIcon={<BookMarked size={18} />}
                onClick={handleTrackOrder}
                sx={{
                    borderRadius: "16px",
                    py: 1.8,
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    textTransform: "none",
                    backgroundColor: "#E53935",
                    "&:hover": { backgroundColor: "#c62828" },
                    boxShadow: "0 4px 14px rgba(229,57,53,0.35)",
                }}
            >
                {SUCCESS_COPY.trackLabel}
            </Button>

            {/* Secondary: Volver al inicio */}
            <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push("/home")}
                sx={{
                    borderRadius: "16px",
                    py: 1.8,
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    textTransform: "none",
                    color: "#E53935",
                    borderColor: "#E53935",
                    backgroundColor: "white",
                    "&:hover": {
                        backgroundColor: "#fff5f5",
                        borderColor: "#c62828",
                    },
                }}
            >
                {SUCCESS_COPY.backLabel}
            </Button>
        </div>
    );
}

export default function PaymentSuccessActions() {
    return (
        <Suspense>
            <ActionsContent />
        </Suspense>
    );
}
