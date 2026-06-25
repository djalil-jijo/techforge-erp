"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherReport {
  id: string;
  teacherName: string;
  date: string;
  summary: string;
  hardwareStatus: string;
  status: "تمت المراجعة" | "قيد التدقيق";
}

const MOCK_REPORTS: TeacherReport[] = [
  { id: "REP-401", teacherName: "أ. لمين تواتي", date: "2026-06-18", summary: "تم إكمال مقدمة حول المشغلات الخطية. تطلب اثنان من محركات التدريج (stepper drivers) المعايرة.", hardwareStatus: "تم إرجاع جميع الأدوات والمعدات باستثناء محرك واحد تم إرساله للفحص والتشخيص.", status: "قيد التدقيق" },
  { id: "REP-402", teacherName: "د. مريم بيلا", date: "2026-06-17", summary: "مختبر الدوائر. اكتملت ورشة عمل اللحام بأمان. قام الطلاب ببناء 5 دوائر ذبذبة غير مستقرة (astable circuits).", hardwareStatus: "تم تخزين كاوية لحام TS100 في الخزانة رقم 2.", status: "تمت المراجعة" },
  { id: "REP-403", teacherName: "م. جمال جاود", date: "2026-06-16", summary: "حصة بوابة إنترنت الأشياء (IoT Gateway). تم توصيل وحدات ESP32 بنجاح ببرنامج Mosquitto المحلي.", hardwareStatus: "تم فحص جميع حقائب التطوير وإغلاقها بأمان في الخزانة ب-3.", status: "تمت المراجعة" },
];

export default function ReportsAudit() {
  const [reports, setReports] = useState<TeacherReport[]>(MOCK_REPORTS);

  const handleAudit = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "تمت المراجعة" } : r))
    );
  };

  const getStatusLabel = (status: string) => {
    return status;
  };

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6 text-right">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2 text-right">
          غرفة تدقيق التقارير
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            مركز التدقيق
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          تحقق من سجلات الحصص الرقمية وملاحظات حالة الأجهزة والعهد المقدمة من الأساتذة.
        </p>
      </div>

      {/* Reports list */}
      <div className="space-y-6">
        {reports.map((report) => (
          <GlassCard 
            key={report.id} 
            className="p-6 border border-obsidian-800 space-y-4 text-right"
            glowColor={report.status === "قيد التدقيق" ? "cyan" : "none"}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 flex-row-reverse">
              <div className="flex items-center gap-3 flex-row-reverse">
                <FileText className="w-5 h-5 text-cyber-cyan" />
                <div className="text-right">
                  <h4 className="font-bold text-white text-sm text-right">{report.teacherName}</h4>
                  <span className="text-[10px] text-gray-500 font-mono text-right">{report.date} • {report.id}</span>
                </div>
              </div>
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold border",
                  report.status === "قيد التدقيق" 
                    ? "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan animate-pulse" 
                    : "bg-gray-500/5 border-gray-500/20 text-gray-400"
                )}
              >
                {getStatusLabel(report.status)}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-gray-300 bg-obsidian-950/40 p-4 rounded-xl border border-obsidian-850 text-right">
              <p className="text-right">
                <strong className="text-white block mb-0.5 font-bold text-right">ملخص الحصة:</strong>
                {report.summary}
              </p>
              <p className="border-t border-obsidian-850 pt-2.5 text-right">
                <strong className="text-laser-amber block mb-0.5 font-mono text-[10px] uppercase text-right">سجل مخزن الأجهزة:</strong>
                {report.hardwareStatus}
              </p>
            </div>

            {report.status === "قيد التدقيق" && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleAudit(report.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyber-cyan text-obsidian-950 text-xs font-bold hover:bg-cyber-cyan/90 transition-colors cursor-pointer mr-auto"
                >
                  <ShieldCheck className="w-4 h-4" />
                  اعتماد وتوقيع التدقيق
                </button>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
