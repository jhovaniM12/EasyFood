import { TrackingStep } from "@/constants/OrderTracking";

function StepNode({ step }: { step: TrackingStep }) {
    const isDone = step.state === "done";
    const isActive = step.state === "active";
    const isPending = step.state === "pending";

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${isDone
                    ? "bg-[#E53935] border-[#E53935] shadow-md shadow-[#E53935]/30"
                    : isActive
                        ? "bg-[#E53935] border-[#E53935] shadow-md shadow-[#E53935]/30"
                        : "bg-white border-gray-300"
                    }`}
            >
                {step.icon}
            </div>
            <span
                className={`text-[10px] font-bold tracking-wide ${isPending ? "text-gray-400" : "text-[#E53935]"
                    }`}
            >
                {step.label}
            </span>
        </div>
    );
}

function Connector({ done }: { done: boolean }) {
    return (
        <div className="flex-1 h-0.5 mb-5 mx-1 rounded-full overflow-hidden bg-gray-200">
            {done && <div className="h-full bg-[#E53935] w-full" />}
        </div>
    );
}

interface OrderProgressTrackerProps {
    steps: TrackingStep[];
}

export default function OrderProgressTracker({ steps }: OrderProgressTrackerProps) {
    return (
        <div className="mx-4 mt-8 flex items-center">
            {steps.map((step, i) => (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <StepNode step={step} />
                    {i < steps.length - 1 && (
                        <Connector done={step.state === "done"} />
                    )}
                </div>
            ))}
        </div>
    );
}
