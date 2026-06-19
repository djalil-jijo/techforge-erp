import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  glowColor?: "cyan" | "amber" | "emerald" | "purple" | "none";
}

export function GlassCard({
  children,
  className,
  hoverable = true,
  glowColor = "none",
  ...props
}: GlassCardProps) {
  const glowClasses = {
    none: "",
    cyan: "glow-border-cyan",
    amber: "glow-border-amber",
    emerald: "glow-border-emerald",
    purple: "glow-border-purple",
  };

  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 transition-all duration-300",
        hoverable && "glass-panel-hover",
        glowColor !== "none" && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
