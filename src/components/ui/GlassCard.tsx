"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: "cyan" | "amber" | "emerald" | "purple" | "red" | "none";
}

const glowColorMap = {
  cyan: "hover:shadow-[0_0_20px_rgba(0,217,255,0.15)] hover:border-cyber-cyan/40",
  amber: "hover:shadow-[0_0_20px_rgba(255,184,0,0.15)] hover:border-laser-amber/40",
  emerald: "hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:border-emerald-glow/40",
  purple: "hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] hover:border-neon-purple/40",
  red: "hover:shadow-[0_0_20px_rgba(255,68,68,0.15)] hover:border-neon-red/40",
  none: "",
};

export function GlassCard({
  children,
  className,
  hoverable = true,
  glowColor = "cyan",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card border rounded-2xl transition-all duration-300",
        "bg-obsidian-900/30 backdrop-blur-xl border-obsidian-700/50",
        hoverable && glowColorMap[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
}
