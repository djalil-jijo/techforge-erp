import React from "react";
import { GlassCard } from "./GlassCard";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  themeColor?: "cyan" | "amber" | "emerald" | "purple";
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  themeColor = "cyan",
  className,
}: StatCardProps) {
  const colorMap = {
    cyan: {
      text: "text-cyber-cyan glow-text-cyan",
      bg: "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan",
      glow: "cyan",
    },
    amber: {
      text: "text-laser-amber",
      bg: "bg-laser-amber/10 border-laser-amber/30 text-laser-amber",
      glow: "amber",
    },
    emerald: {
      text: "text-emerald-glow",
      bg: "bg-emerald-glow/10 border-emerald-glow/30 text-emerald-glow",
      glow: "emerald",
    },
    purple: {
      text: "text-neon-purple",
      bg: "bg-neon-purple/10 border-neon-purple/30 text-neon-purple",
      glow: "purple",
    },
  };

  const activeColor = colorMap[themeColor];

  return (
    <GlassCard glowColor={activeColor.glow as any} className={cn("relative overflow-hidden", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">{title}</p>
          <h3 className={cn("text-3xl font-extrabold mt-2 font-mono tracking-tight", activeColor.text)}>
            {value}
          </h3>
        </div>
        <div className={cn("p-3 rounded-xl border flex items-center justify-center", activeColor.bg)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-2 text-[11px]">
          <span
            className={cn(
              "font-bold",
              changeType === "increase" && "text-emerald-glow",
              changeType === "decrease" && "text-neon-red",
              changeType === "neutral" && "text-gray-400"
            )}
          >
            {change}
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </GlassCard>
  );
}
