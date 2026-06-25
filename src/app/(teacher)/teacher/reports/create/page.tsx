"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Zap, ShieldCheck } from "lucide-react";

export default function CreateReport() {
  const [form, setForm] = useState({
    session: "مختبر المشغلات الخطية",
    date: new Date().toISOString().split("T")[0],
    fouj: "فوج أ-1",
    summary: "",
    hardwareStatus: "",
    issues: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.summary.trim()) return alert("ملخص الحصة مطلوب.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-8 text-right">
        <div className="border-b border-obsidian-800 pb-6 text-right">
          <h1 className="text-3xl font-extrabold text-white">تقرير الحصة الرقمي</h1>
        </div>
        <GlassCard glowColor="emerald" className="text-center py-16 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-glow/10 border border-emerald-glow/35 flex items-center justify-center animate-bounce">
            <ShieldCheck className="w-8 h-8 text-emerald-glow" />
          </div>
          <h3 className="text-xl font-bold text-white">تم إرسال التقرير!</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed">
            تم نقل سجل درس <strong className="text-white">{form.session}</strong> بتاريخ <strong className="text-white">{form.date}</strong> إلى قائمة التدقيق الإداري بنجاح.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(f => ({ ...f, summary: "", hardwareStatus: "", issues: "" })); }}
            className="mt-4 px-5 py-2.5 bg-emerald-glow text-obsidian-950 font-bold rounded-xl text-xs cursor-pointer hover:bg-emerald-glow/90 mx-auto"
          >
            كتابة تقرير آخر
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-right">
      <div className="border-b border-obsidian-800 pb-6 text-right">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2">
          تقرير الحصة الفوري
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            السجل الرقمي
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          أرسل تقريراً سريعاً عن الحصة دون تحميل ملفات - نص خالص بضغطة زر واحدة.
        </p>
      </div>

      <div className="max-w-2xl text-right">
        <GlassCard hoverable={false} className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs text-right">
            {/* Session meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
              <div className="text-right">
                <label className="block text-gray-400 font-semibold mb-1 text-right">موضوع الحصة</label>
                <input
                  type="text"
                  value={form.session}
                  onChange={e => setForm(f => ({ ...f, session: e.target.value }))}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                />
              </div>
              <div className="text-right">
                <label className="block text-gray-400 font-semibold mb-1 text-right">تاريخ الحصة</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                />
              </div>
              <div className="text-right">
                <label className="block text-gray-400 font-semibold mb-1 text-right">الفوج المخصص</label>
                <select
                  value={form.fouj}
                  onChange={e => setForm(f => ({ ...f, fouj: e.target.value }))}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                >
                  <option>فوج أ-1</option>
                  <option>فوج أ-2</option>
                  <option>فوج ب-2</option>
                  <option>فوج ج-3</option>
                </select>
              </div>
            </div>

            {/* Session Summary */}
            <div className="text-right">
              <label className="block text-gray-400 font-semibold mb-1 text-right">
                ملخص الحصة <span className="text-neon-red">*</span>
              </label>
              <textarea
                value={form.summary}
                onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                rows={4}
                placeholder="صف ما تمت تغطيته في حصة اليوم: الأهداف، تقدم الطلاب، التمارين المنجزة..."
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan resize-none leading-relaxed text-right"
                required
              />
            </div>

            {/* Hardware Status */}
            <div className="text-right">
              <label className="block text-gray-400 font-semibold mb-1 text-right">حالة إرجاع الأجهزة</label>
              <textarea
                value={form.hardwareStatus}
                onChange={e => setForm(f => ({ ...f, hardwareStatus: e.target.value }))}
                rows={2}
                placeholder="مثال: تم إرجاع جميع حقائب الأردوينو إلى الخزانة أ-1. تم ترك جهاز Raspberry Pi واحد مع أمين بوعزيز لمشروع نهاية الأسبوع..."
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-laser-amber resize-none leading-relaxed text-right"
              />
            </div>

            {/* Issues */}
            <div className="text-right">
              <label className="block text-gray-400 font-semibold mb-1 text-right">المشاكل / التنبيهات (اختياري)</label>
              <textarea
                value={form.issues}
                onChange={e => setForm(f => ({ ...f, issues: e.target.value }))}
                rows={2}
                placeholder="أي مخاوف تتعلق بسلوك الطلاب، أو أعطال الأجهزة، أو تعارض المواعيد لتنبيه الإدارة..."
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-neon-red resize-none leading-relaxed text-right"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-cyan text-obsidian-950 font-bold rounded-xl hover:bg-cyber-cyan/90 transition-colors cursor-pointer shadow-lg text-xs"
            >
              <Zap className="w-4 h-4" />
              إرسال تقرير الحصة
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
