import React from "react";
import { Home, FileText, ImagePlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Basic Info", icon: Home },
  { id: 2, label: "Details", icon: FileText },
  { id: 3, label: "Media", icon: ImagePlus },
];

interface FormStepperProps {
  currentPage: number;
}

export const FormStepper = ({ currentPage }: FormStepperProps) => {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const isComplete = currentPage > step.id;
        const isActive = currentPage === step.id;
        const Icon = step.icon;
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                  isComplete
                    ? "border-violet-500 bg-violet-500 text-white shadow-md shadow-violet-200"
                    : isActive
                    ? "border-violet-500 bg-white text-violet-600 ring-4 ring-violet-100"
                    : "border-slate-200 bg-white text-slate-400"
                )}
              >
                {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span
                className={cn(
                  "hidden text-sm font-medium transition-colors sm:block",
                  isActive ? "text-violet-700" : isComplete ? "text-violet-500" : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 h-[2px] w-12 sm:w-20 relative bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-violet-500 transition-all duration-500 rounded-full"
                  style={{ width: currentPage > step.id ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
