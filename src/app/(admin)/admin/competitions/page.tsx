"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Award, Trophy, Users, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Competition {
  id: string;
  name: string;
  scope: "وطني" | "دولي" | "محلي";
  date: string;
  teamsCount: number;
  status: "التسجيل مفتوح" | "نشط" | "مكتمل";
  location: string;
}

const MOCK_COMPS: Competition[] = [
  { id: "COMP-001", name: "كأس الجزائر للروبوتات 2026", scope: "وطني", date: "2026-07-24", teamsCount: 3, status: "التسجيل مفتوح", location: "قبة الجزائر" },
  { id: "COMP-002", name: "تحدي تطبيقات الفضاء ناسا بسكرة", scope: "محلي", date: "2026-10-02", teamsCount: 2, status: "التسجيل مفتوح", location: "مركز تك فورج" },
  { id: "COMP-003", name: "تحدي يوروبوت 2026", scope: "دولي", date: "2026-05-15", teamsCount: 1, status: "مكتمل", location: "باريس، فرنسا" },
];

export default function Competitions() {
  const getStatusLabel = (status: string) => {
    return status;
  };

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6 text-right">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2 text-right">
            رادار الهكاثونات والمسابقات
            <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
              لوحة المسابقات
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            شكل فرق الطلاب، نسق إرسال المشاريع، وتتبع التصنيفات الدولية للروبوتات.
          </p>
        </div>

        <button 
          onClick={() => alert("تم بدء تسجيل مسابقة جديدة.")}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border border-neon-purple/40 hover:border-neon-purple bg-neon-purple/5 hover:bg-neon-purple/10 text-neon-purple transition-all cursor-pointer mr-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          إضافة مسابقة جديدة
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="المسابقات النشطة"
          value={MOCK_COMPS.filter(c => c.status !== "مكتمل").length}
          change="التسجيلات المفتوحة"
          changeType="neutral"
          icon={Trophy}
          themeColor="purple"
        />
        <StatCard
          title="الفرق المسجلة"
          value="6 فرق"
          change="إجمالي الطلاب المشاركين"
          changeType="neutral"
          icon={Users}
          themeColor="cyan"
        />
        <StatCard
          title="ميداليات البطولة"
          value="4 ذهبيات"
          change="سجل الميداليات التاريخي"
          changeType="increase"
          icon={Award}
          themeColor="emerald"
        />
      </div>

      {/* Contests list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_COMPS.map((c) => (
          <GlassCard 
            key={c.id} 
            className="p-6 relative overflow-hidden flex flex-col justify-between h-48 border border-obsidian-800"
            glowColor={c.status === "التسجيل مفتوح" ? "purple" : "none"}
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{c.id} • {c.scope}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                    c.status === "التسجيل مفتوح" && "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan",
                    c.status === "نشط" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber animate-pulse",
                    c.status === "مكتمل" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow"
                  )}
                >
                  {getStatusLabel(c.status)}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-2 flex items-center gap-2 text-right justify-start flex-row-reverse">
                <Trophy className="w-4.5 h-4.5 text-neon-purple" />
                {c.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1 font-semibold text-right">{c.location} • تاريخ المسابقة: {c.date}</p>
            </div>

            <div className="border-t border-obsidian-850 pt-3 flex items-center justify-between text-[10px] font-mono text-right flex-row-reverse">
              <span className="text-gray-500 uppercase">المشاركات النشطة:</span>
              <span className="text-neon-purple font-bold text-left">{c.teamsCount} فرق مسجلة</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
