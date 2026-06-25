"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Award, ShieldCheck, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillGrade {
  skill: string;
  max: number;
  score: number;
}

interface StudentGrade {
  id: string;
  name: string;
  skills: SkillGrade[];
}

const SKILL_DEFS = [
  { skill: "منطق البرمجة", max: 20 },
  { skill: "تجميع الدوائر الإلكترونية", max: 20 },
  { skill: "جودة اللحام", max: 20 },
  { skill: "مهارات التصميم ثلاثي الأبعاد", max: 20 },
  { skill: "العمل الجماعي والتعاون", max: 20 },
];

const initialGrades = (): StudentGrade[] => [
  { id: "STU-801", name: "أمين بوعزيز", skills: SKILL_DEFS.map(s => ({ ...s, score: 0 })) },
  { id: "STU-802", name: "ياسمين حداد", skills: SKILL_DEFS.map(s => ({ ...s, score: 0 })) },
  { id: "STU-803", name: "كريم بن عمر", skills: SKILL_DEFS.map(s => ({ ...s, score: 0 })) },
  { id: "STU-804", name: "سارة مرابط", skills: SKILL_DEFS.map(s => ({ ...s, score: 0 })) },
];

export default function GradesEntry() {
  const [grades, setGrades] = useState<StudentGrade[]>(initialGrades());
  const [saved, setSaved] = useState(false);

  const updateScore = (studentId: string, skillName: string, value: number) => {
    setGrades(prev => prev.map(st => {
      if (st.id !== studentId) return st;
      return {
        ...st,
        skills: st.skills.map(sk =>
          sk.skill === skillName ? { ...sk, score: Math.min(sk.max, Math.max(0, value)) } : sk
        )
      };
    }));
  };

  const getTotal = (student: StudentGrade) => student.skills.reduce((a, s) => a + s.score, 0);
  const getMaxTotal = () => SKILL_DEFS.reduce((a, s) => a + s.max, 0);
  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: "ممتاز", color: "text-emerald-glow" };
    if (pct >= 75) return { label: "جيد جداً", color: "text-cyber-cyan" };
    if (pct >= 60) return { label: "جيد", color: "text-neon-purple" };
    if (pct >= 50) return { label: "متوسط", color: "text-laser-amber" };
    return { label: "بحاجة لتحسين", color: "text-neon-red" };
  };

  return (
    <div className="space-y-8 text-right">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            رصد درجات المهارات
            <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
              لوحة التقييم
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">سجل نقاط أداء الطلاب لكل مجال من مجالات المهارات. المجموع الأقصى: {getMaxTotal()} نقطة.</p>
        </div>
        <button
          onClick={() => setSaved(true)}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl border border-emerald-glow/40 bg-emerald-glow/5 text-emerald-glow hover:bg-emerald-glow/10 transition-all cursor-pointer mr-auto"
        >
          <Save className="w-4 h-4" />
          حفظ سجل الدرجات
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-glow/5 border border-emerald-glow/20 flex items-center gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-glow" />
          <span className="text-emerald-glow font-bold">تم حفظ سجل الدرجات واعتماده في ملفات الطلاب التعريفية بنجاح.</span>
        </div>
      )}

      <div className="space-y-6">
        {grades.map(student => {
          const total = getTotal(student);
          const maxTotal = getMaxTotal();
          const pct = Math.round((total / maxTotal) * 100);
          const grade = getGrade(pct);

          return (
            <GlassCard key={student.id} hoverable={false} className="p-6 space-y-5">
              <div className="flex justify-between items-center">
                <div className="text-right">
                  <h3 className="text-base font-bold text-white">{student.name}</h3>
                  <p className="text-[10px] text-gray-500 font-mono">{student.id}</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-extrabold font-mono text-white text-left">{total}<span className="text-gray-500 text-sm">/{maxTotal}</span></p>
                  <p className={cn("text-xs font-bold text-left", grade.color)}>{grade.label} • {pct}%</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-obsidian-950 rounded-full overflow-hidden border border-obsidian-800">
                <div
                  className={cn(
                    "h-full transition-all duration-700",
                    pct >= 90 ? "bg-emerald-glow" : pct >= 75 ? "bg-cyber-cyan" : pct >= 60 ? "bg-neon-purple" : pct >= 50 ? "bg-laser-amber" : "bg-neon-red"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                {student.skills.map(skill => (
                  <div key={skill.skill} className="space-y-1.5 text-right">
                    <label className="block text-gray-400 font-semibold text-[10px] leading-tight text-right">{skill.skill}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={skill.max}
                        value={skill.score}
                        onChange={e => updateScore(student.id, skill.skill, parseInt(e.target.value) || 0)}
                        className="w-full bg-obsidian-950 border border-obsidian-850 rounded-lg p-2 text-center text-white font-mono font-bold focus:outline-none focus:border-neon-purple"
                      />
                      <span className="text-gray-500 font-mono text-[10px]">/{skill.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
