"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_TRACKS } from "@/lib/mock-data";

export function TrackPieChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[300px] bg-obsidian-900/20 animate-pulse rounded-xl flex items-center justify-center border border-obsidian-800">
        <span className="text-gray-500 font-mono text-xs">Loading metrics...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] flex flex-col justify-between">
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={MOCK_TRACKS}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {MOCK_TRACKS.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0a0a10" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 10, 16, 0.9)",
                borderColor: "#2a2a3c",
                borderRadius: "12px",
                color: "#f4f4f7",
              }}
              formatter={(value) => [`${value} Students`, "Enrollment"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-3 gap-2 px-2 pb-2">
        {MOCK_TRACKS.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-semibold text-gray-300 truncate max-w-[80px]">{item.name}</span>
            </div>
            <span className="text-sm font-bold font-mono text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
