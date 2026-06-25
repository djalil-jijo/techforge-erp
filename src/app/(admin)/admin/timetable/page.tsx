"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Calendar, AlertOctagon, HelpCircle, RefreshCw, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slot {
  id: string;
  time: string;
  classRoom: string;
  instructor: string;
  hardwareRequested: string;
  qtyRequested: number;
  qtyAvailableInVault: number;
  conflict: boolean;
  conflictDetails?: string;
}

const MOCK_SLOTS: Slot[] = [
  {
    id: "SLT-01",
    time: "09:00 - 11:00",
    classRoom: "منصة الروبوتات (أ)",
    instructor: "أ. لمين تواتي",
    hardwareRequested: "حقائب تجارب Arduino Uno",
    qtyRequested: 15,
    qtyAvailableInVault: 18,
    conflict: false,
  },
  {
    id: "SLT-02",
    time: "11:00 - 13:00",
    classRoom: "مختبر التصنيع المركزي",
    instructor: "د. مريم بيلا",
    hardwareRequested: "طابعات ثلاثية الأبعاد Creality Ender-3",
    qtyRequested: 6,
    qtyAvailableInVault: 5,
    conflict: true,
    conflictDetails: "عجز في السعة: تم طلب 6 وحدات للطباعة، بينما يوجد 5 وحدات فقط مسجلة في المخزن أ-1.",
  },
  {
    id: "SLT-03",
    time: "14:00 - 16:00",
    classRoom: "منصة الدوائر لإنترنت الأشياء (ب)",
    instructor: "م. جمال جاود",
    hardwareRequested: "كاوية لحام ذكية TS100",
    qtyRequested: 10,
    qtyAvailableInVault: 12,
    conflict: false,
  },
  {
    id: "SLT-04",
    time: "16:00 - 18:00",
    classRoom: "مختبر التصنيع المركزي",
    instructor: "أ. لمين تواتي",
    hardwareRequested: "جهاز الحفر CNC 3018 Pro",
    qtyRequested: 3,
    qtyAvailableInVault: 2,
    conflict: true,
    conflictDetails: "تعارض: تم طلب 3 أجهزة حفر CNC لهذه الحصة، بينما يوجد جهازين فقط في المخزن المركزي.",
  },
];

export default function TimetableScheduler() {
  const [slots, setSlots] = useState<Slot[]>(MOCK_SLOTS);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "done">("idle");

  const runConflictScan = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("done");
    }, 1200);
  };

  const conflictsCount = slots.filter((s) => s.conflict).length;

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6 text-right">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2 text-right">
            المخطط الديناميكي للمصفوفة الزمنية
            <span className="text-xs bg-laser-amber/10 border border-laser-amber/35 text-laser-amber font-mono px-2 py-0.5 rounded-full font-bold">
              محرك كشف التعارض
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            قم بحل تعارضات القاعات وتدقيق مخصصات الأجهزة لمنع قفل العجز في المعدات.
          </p>
        </div>

        <button
          onClick={runConflictScan}
          disabled={scanStatus === "scanning"}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border border-laser-amber/40 hover:border-laser-amber bg-laser-amber/5 hover:bg-laser-amber/10 text-laser-amber transition-all cursor-pointer disabled:opacity-50 mr-auto"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", scanStatus === "scanning" && "animate-spin")} />
          {scanStatus === "scanning" ? "جاري تدقيق مخزون الأجهزة..." : "تشغيل فحص التعارضات"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="الحصص المجدولة"
          value={slots.length}
          change="مخططات حصص اليوم"
          changeType="neutral"
          icon={Calendar}
          themeColor="cyan"
        />
        <StatCard
          title="تنبيهات نقص المعدات"
          value={conflictsCount}
          change={conflictsCount > 0 ? "يتطلب تعديل الجدول الزمني" : "لم يتم الكشف عن تعارضات"}
          changeType={conflictsCount > 0 ? "decrease" : "neutral"}
          icon={AlertOctagon}
          themeColor={conflictsCount > 0 ? "purple" : "emerald"}
        />
        <StatCard
          title="متوسط تحميل الأجهزة"
          value="72%"
          change="مستوى الاستعلام النشط للمخزن"
          changeType="neutral"
          icon={Cpu}
          themeColor="emerald"
        />
      </div>

      {/* Conflict Warnings (Visible in Red Alerts) */}
      {conflictsCount > 0 && (
        <div className="space-y-4 text-right">
          <h3 className="text-sm font-extrabold text-neon-red font-mono uppercase tracking-wider flex items-center justify-start flex-row-reverse gap-2 text-right">
            <span className="w-2 h-2 rounded-full bg-neon-red animate-ping" />
            تم الكشف عن عجز حرج في المصفوفة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
            {slots.filter(s => s.conflict).map(slot => (
              <div 
                key={slot.id} 
                className="p-5 rounded-2xl bg-neon-red/5 border-2 border-neon-red/30 glow-border-red/25 flex gap-4 text-xs text-right flex-row-reverse"
              >
                <AlertOctagon className="w-6 h-6 text-neon-red animate-pulse flex-shrink-0" />
                <div className="space-y-1 text-right flex-1">
                  <h4 className="font-bold text-white font-mono text-right">{slot.time} • {slot.classRoom}</h4>
                  <p className="text-gray-400 font-semibold text-right">{slot.conflictDetails}</p>
                  <p className="text-[10px] text-gray-500 font-mono text-right">
                    المطلوب: {slot.qtyRequested} وحدات من {slot.hardwareRequested} • المتوفر: {slot.qtyAvailableInVault}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduler Slots Table */}
      <GlassCard hoverable={false}>
        <h4 className="text-lg font-bold text-white mb-6 text-right">مصفوفة التخصيص اليومية</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold text-right">رمز الحصة</th>
                <th className="pb-3 font-semibold text-right">الفترة الزمنية</th>
                <th className="pb-3 font-semibold text-right">القاعة / المختبر</th>
                <th className="pb-3 font-semibold text-right">المدرب</th>
                <th className="pb-3 font-semibold text-right">المعدات المطلوبة</th>
                <th className="pb-3 font-semibold text-center">الكمية المطلوبة</th>
                <th className="pb-3 font-semibold text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {slots.map((slot) => (
                <tr key={slot.id} className={cn("hover:bg-obsidian-900/40 transition-colors", slot.conflict && "bg-neon-red/5 hover:bg-neon-red/10")}>
                  <td className="py-3.5 font-mono text-gray-400 font-semibold text-right">{slot.id}</td>
                  <td className="py-3.5 text-white font-mono font-bold text-right">{slot.time}</td>
                  <td className="py-3.5 text-gray-300 font-semibold text-right">{slot.classRoom}</td>
                  <td className="py-3.5 text-gray-400 font-semibold text-right">{slot.instructor}</td>
                  <td className="py-3.5 text-gray-300 font-mono text-right">{slot.hardwareRequested}</td>
                  <td className="py-3.5 text-center font-mono font-bold text-cyber-cyan">{slot.qtyRequested}</td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border",
                        slot.conflict 
                          ? "bg-neon-red/5 border-neon-red/35 text-neon-red font-bold" 
                          : "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow"
                      )}
                    >
                      {slot.conflict ? "تعارض مغلق" : "مصرح به"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
