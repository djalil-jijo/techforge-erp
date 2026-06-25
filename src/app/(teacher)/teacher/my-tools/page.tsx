"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Cpu, AlertTriangle, CheckSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustodyItem {
  id: string;
  name: string;
  category: string;
  checkoutDate: string;
  expectedReturn: string;
  status: "nominal" | "degraded" | "faulty";
}

const INITIAL_ITEMS: CustodyItem[] = [
  { id: "CST-01", name: "جهاز Raspberry Pi 4 Model B (4GB)", category: "الروبوتات / أساسي", checkoutDate: "2026-06-10", expectedReturn: "2026-06-24", status: "nominal" },
  { id: "CST-02", name: "كاوية لحام ذكية TS100", category: "أدوات يدوية", checkoutDate: "2026-06-12", expectedReturn: "2026-06-20", status: "nominal" },
  { id: "CST-03", name: "حقيبة تجارب Arduino Uno R3", category: "الإلكترونيات / دقيقة", checkoutDate: "2026-06-15", expectedReturn: "2026-06-25", status: "nominal" },
];

export default function MyToolsCustody() {
  const [items, setItems] = useState<CustodyItem[]>(INITIAL_ITEMS);

  const reportDamage = (id: string) => {
    const reason = prompt("صف حالة العطل أو التلف الحاصل في الجهاز:");
    if (!reason) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "faulty" as const } : item
      )
    );
    alert("تم إرسال تقرير التلف إلى إدارة العهد والأجهزة.");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "nominal": return "سليم";
      case "faulty": return "تالف";
      case "degraded": return "متدهور";
      default: return status;
    }
  };

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          عهدة الأجهزة والمعدات
          <span className="text-xs bg-laser-amber/10 border border-laser-amber/35 text-laser-amber font-mono px-2 py-0.5 rounded-full font-bold">
            السجل الشخصي
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          راقب المتحكمات الدقيقة، وأدوات التشخيص، والمعدات المخصصة لحصصك التدريبية.
        </p>
      </div>

      {/* Custody list cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <GlassCard 
            key={item.id} 
            className="p-6 flex flex-col justify-between h-48 border border-obsidian-800"
            glowColor={item.status === "faulty" ? "amber" : "none"}
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.id} • {item.category}</span>
                
                {/* Pulsing Status Indicator */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {item.status === "nominal" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-glow opacity-75" />
                    )}
                    <span className={cn(
                      "relative inline-flex rounded-full h-2 w-2",
                      item.status === "nominal" && "bg-emerald-glow",
                      item.status === "faulty" && "bg-neon-red animate-pulse",
                      item.status === "degraded" && "bg-laser-amber"
                    )} />
                  </span>
                  <span className={cn(
                    "text-[10px] font-mono uppercase font-bold",
                    item.status === "nominal" && "text-emerald-glow",
                    item.status === "faulty" && "text-neon-red",
                    item.status === "degraded" && "text-laser-amber"
                  )}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-laser-amber" />
                {item.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1 font-semibold text-right">تاريخ الاستلام: {item.checkoutDate} • موعد الإرجاع: {item.expectedReturn}</p>
            </div>

            <div className="border-t border-obsidian-850 pt-3 flex items-center justify-between text-[10px]">
              <span className="text-gray-500 font-mono">هل انتهى البروتوكول؟</span>
              {item.status !== "faulty" ? (
                <button
                  onClick={() => reportDamage(item.id)}
                  className="px-2.5 py-1.5 rounded-lg border border-neon-red/25 hover:border-neon-red bg-neon-red/5 hover:bg-neon-red/10 text-neon-red font-bold font-sans transition-all cursor-pointer"
                >
                  الإبلاغ عن تلف
                </button>
              ) : (
                <span className="text-neon-red font-bold font-mono">تم إرسال بلاغ التلف</span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
