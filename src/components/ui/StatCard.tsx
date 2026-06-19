"use client";

import React from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  themeColor: "cyan" | "amber" | "emerald" | "purple" | "red";
  subtext?: string;
}

const colorMap = {
  cyan: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5",
  amber: "text-laser-amber border-laser-amber/30 bg-laser-amber/5",
  emerald: "text-emerald-glow border-emerald-glow/30 bg-emerald-glow/5",
  purple: "text-neon-purple border-neon-purple/30 bg-neon-purple/5",
  red: "text-neon-red border-neon-red/30 bg-neon-red/5",
};

const changeColorMap = {
  increase: "text-emerald-glow",
  decrease: "text-neon-red",
  neutral: "text-laser-amber",
};

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  themeColor,
  subtext,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 border transition-all hover:shadow-lg",
        colorMap[themeColor]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white font-mono">{value}</p>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorMap[themeColor].split(" ")[1]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {change && (
        <div className={cn("flex items-center gap-1 text-sm font-semibold", changeColorMap[changeType])}>
          {changeType === "increase" && <TrendingUp className="w-4 h-4" />}
          {changeType === "decrease" && <TrendingDown className="w-4 h-4" />}
          {changeType === "neutral" && <AlertCircle className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
}
