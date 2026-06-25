"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollText, Download, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const REPORT_CARDS = [
  {
    period: "الفصل الربيعي 2026",
    date: "2026-06-01",
    scores: [
      { skill: "منطق البرمجة", score: 18, max: 20 },
      { skill: "تجميع الدوائر الإلكترونية", score: 16, max: 20 },
      { skill: "جودة اللحام", score: 19, max: 20 },
      { skill: "مهارات التصميم ثلاثي الأبعاد", score: 14, max: 20 },
      { skill: "العمل الجماعي والتعاون", score: 18, max: 20 },
    ],
    certification: "روبوتات متقدمة - المستوى الثاني",
    passed: true,
  },
  {
    period: "الفصل الخريفي 2025",
    date: "2025-12-15",
    scores: [
      { skill: "منطق البرمجة", score: 15, max: 20 },
      { skill: "تجميع الدوائر الإلكترونية", score: 14, max: 20 },
      { skill: "جودة اللحام", score: 17, max: 20 },
      { skill: "مهارات التصميم ثلاثي الأبعاد", score: 10, max: 20 },
      { skill: "العمل الجماعي والتعاون", score: 16, max: 20 },
    ],
    certification: "أساسيات الروبوتات - المستوى الأول",
    passed: true,
  },
];

export default function ReportCards() {
  const handleDownload = (period: string) => {
    alert(`جاري تحميل الشهادة الموقعة لـ: ${period}\n\n[في بيئة الإنتاج، سيقوم هذا بتشغيل واجهة برمجة التطبيقات لتوليد ملف PDF]`);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          كشوف النقاط والشهادات
          <span className="text-xs bg-emerald-glow/10 border border-emerald-glow/35 text-emerald-glow font-mono px-2 py-0.5 rounded-full font-bold">
            موقّع رقمياً
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">نتائجك الأكاديمية والشهادات المعتمدة القابلة للتحميل لكل فصل دراسي.</p>
      </div>

      <div className="space-y-8">
        {REPORT_CARDS.map((card, idx) => {
          const total = card.scores.reduce((s, r) => s + r.score, 0);
          const maxTotal = card.scores.reduce((s, r) => s + r.max, 0);
          const pct = Math.round((total / maxTotal) * 100);

          return (
            <GlassCard key={idx} hoverable={false} glowColor={card.passed ? "emerald" : "amber"} className="p-6 md:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{card.date}</p>
                  <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-emerald-glow" />
                    {card.period}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-semibold">الشهادة: <span className="text-white">{card.certification}</span></p>
                </div>
                <div className="text-right sm:text-center flex-shrink-0 flex flex-col items-end sm:items-center">
                  <p className="text-3xl font-extrabold font-mono text-white">{pct}<span className="text-gray-500 text-base">%</span></p>
                  <p className={cn("text-xs font-bold mt-0.5", card.passed ? "text-emerald-glow" : "text-neon-red")}>
                    {card.passed ? "✓ معتمد" : "✗ لم ينجح"}
                  </p>
                </div>
              </div>

              {/* Scores Table */}
              <div className="space-y-3">
                {card.scores.map((s, i) => {
                  const skillPct = Math.round((s.score / s.max) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-semibold">{s.skill}</span>
                        <span className="font-mono text-white font-bold">{s.score}/{s.max}</span>
                      </div>
                      <div className="h-1.5 w-full bg-obsidian-950 rounded-full overflow-hidden border border-obsidian-800">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            skillPct >= 85 ? "bg-emerald-glow" : skillPct >= 70 ? "bg-cyber-cyan" : skillPct >= 50 ? "bg-laser-amber" : "bg-neon-red"
                          )}
                          style={{ width: `${skillPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download Button */}
              {card.passed && (
                <button
                  onClick={() => handleDownload(card.period)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-glow text-obsidian-950 font-bold rounded-xl text-xs hover:bg-emerald-glow/90 transition-colors cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  تحميل الشهادة الموقعة (PDF)
                </button>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

