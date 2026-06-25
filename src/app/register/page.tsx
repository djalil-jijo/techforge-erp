"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { User, Mail, Phone, BookOpen, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    track: "Robotics",
    experience: "Beginner",
    parentName: "",
    parentPhone: "",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden" dir="rtl">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4 mb-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
            <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
          </div>
          <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">بوابة تسجيل وقبول الطلاب الجدد</h2>
        <p className="text-gray-400 text-xs font-mono">الخطوة {step} من أصل 3 لتقديم طلب الانضمام</p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg z-10">
        <GlassCard glowColor={step === 4 ? "emerald" : "cyan"} className="p-8">
          {step < 4 && (
            <div className="flex justify-between items-center mb-8" dir="ltr">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all",
                      step === num
                        ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan glow-border-cyan"
                        : step > num
                        ? "bg-emerald-glow/10 border-emerald-glow text-emerald-glow"
                        : "bg-obsidian-950 border-obsidian-800 text-gray-500"
                    )}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 transition-all",
                        step > num ? "bg-emerald-glow" : "bg-obsidian-800"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 text-xs text-right">
              <h3 className="text-sm font-bold text-white mb-2">المعلومات الشخصية للمشترك</h3>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">الاسم واللقب الكامل</label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="أمين بوعزيز"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pr-10 pl-4 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="amine@example.dz"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pr-10 pl-4 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0550 12 34 56"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pr-10 pl-4 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-xs text-right">
              <h3 className="text-sm font-bold text-white mb-2">اختيار مسار التدريب</h3>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">اختر التخصص التدريبي</label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                >
                  <option value="الروبوتيك">الروبوتيك والأنظمة الذكية</option>
                  <option value="الإلكترونيات">الإلكترونيات التطبيقية وإنترنت الأشياء (IoT)</option>
                  <option value="البرمجة">البرمجة والذكاء الاصطناعي</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">مستوى الخبرة السابقة في هذا المجال</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "Beginner", name: "مبتدئ" },
                    { id: "Intermediate", name: "متوسط" },
                    { id: "Advanced", name: "متقدم" }
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: level.id })}
                      className={cn(
                        "py-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all",
                        formData.experience === level.id
                          ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan"
                          : "bg-obsidian-950 border-obsidian-850 text-gray-500 hover:border-obsidian-800"
                      )}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-xs text-right">
              <h3 className="text-sm font-bold text-white mb-2">معلومات ولي الأمر / الكفيل</h3>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">اسم ولي الأمر الكامل</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="محمد بوعزيز"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">رقم هاتف ولي الأمر</label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  placeholder="0660 78 90 12"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan text-right"
                  required
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-glow/10 border border-emerald-glow/30 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-glow" />
              </div>
              <h3 className="text-lg font-bold text-white">تم إرسال طلب الانضمام بنجاح!</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto">
                شكراً لك، <span className="text-white font-bold">{formData.fullName}</span>. تم وضع طلبك في قائمة الانتظار للمراجعة من قبل الإدارة وسنتصل بك قريباً لتأكيد القبول.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-glow text-obsidian-950 font-bold rounded-xl hover:bg-emerald-glow/90 transition-colors text-xs"
                >
                  الرجوع للرئيسية
                </Link>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="flex justify-between border-t border-obsidian-800 pt-6 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-obsidian-800 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer transition-colors",
                  step === 1 && "opacity-35 cursor-not-allowed"
                )}
              >
                <ChevronRight className="w-4 h-4" />
                الخطوة السابقة
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-cyber-cyan text-obsidian-950 rounded-xl text-xs font-bold hover:bg-cyber-cyan/90 cursor-pointer transition-colors"
                >
                  الخطوة التالية
                  <ChevronLeft className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-glow text-obsidian-950 rounded-xl text-xs font-bold hover:bg-emerald-glow/90 cursor-pointer transition-colors shadow-lg shadow-emerald-glow/10"
                >
                  <Sparkles className="w-4 h-4" />
                  تقديم طلب الانضمام
                </button>
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
