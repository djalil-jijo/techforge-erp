"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Wallet, CheckCircle2, AlertCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const FEES = [
  { id: "FEE-2026-06", description: "مسار الروبوتات المتقدم — يونيو 2026", amount: 8500, dueDate: "2026-06-30", status: "pending" },
  { id: "FEE-2026-05", description: "مسار الروبوتات المتقدم — مايو 2026", amount: 8500, dueDate: "2026-05-31", status: "paid", paidDate: "2026-05-28" },
  { id: "FEE-2026-04", description: "مسار الروبوتات المتقدم — أبريل 2026", amount: 8500, dueDate: "2026-04-30", status: "paid", paidDate: "2026-04-25" },
  { id: "FEE-WORKSHOP", description: "ورشة عمل الأردوينو المتقدمة (أبريل)", amount: 4000, dueDate: "2026-04-15", status: "paid", paidDate: "2026-04-10" },
];

export default function FeesStatement() {
  const totalDue = FEES.filter(f => f.status === "pending").reduce((a, f) => a + f.amount, 0);
  const totalPaid = FEES.filter(f => f.status === "paid").reduce((a, f) => a + f.amount, 0);

  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          الرسوم والبيان المالي
          <span className={cn(
            "text-xs font-mono px-2 py-0.5 rounded-full font-bold border",
            totalDue > 0 ? "bg-laser-amber/10 border-laser-amber/35 text-laser-amber" : "bg-emerald-glow/10 border-emerald-glow/35 text-emerald-glow"
          )}>
            {totalDue > 0 ? "مستحقات معلقة" : "خالٍ من المستحقات"}
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">سجل اشتراكاتك في الدورات والأرصدة المعلقة الحالية.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard title="إجمالي الرسوم المدفوعة" value={`${totalPaid.toLocaleString()} د.ج`} change="هذه السنة الدراسية" changeType="increase" icon={CheckCircle2} themeColor="emerald" />
        <StatCard title="الرصيد المتبقي" value={`${totalDue.toLocaleString()} د.ج`} change={totalDue > 0 ? "مستحق قبل نهاية الشهر" : "لا توجد مستحقات معلقة"} changeType={totalDue > 0 ? "decrease" : "neutral"} icon={Wallet} themeColor={totalDue > 0 ? "amber" : "cyan"} />
      </div>

      {/* Alert Banner for Pending Fees */}
      {totalDue > 0 && (
        <div className="p-5 rounded-2xl bg-laser-amber/5 border-2 border-laser-amber/30 flex items-start gap-4 text-xs">
          <AlertCircle className="w-5 h-5 text-laser-amber flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="font-bold text-laser-amber mb-1">تذكير بالدفع — {totalDue.toLocaleString()} د.ج مستحقة</p>
            <p className="text-gray-400 leading-relaxed font-semibold">لديك اشتراك معلق لشهر يونيو 2026. يرجى التسوية قبل الموعد النهائي للحفاظ على إمكانية الوصول المستمر لجميع الحصص التدريبية وموارد مختبر التصنيع (FabLab).</p>
          </div>
        </div>
      )}

      {/* Fees Log */}
      <GlassCard hoverable={false} className="space-y-4">
        <h3 className="text-base font-bold text-white">سجل تاريخ المدفوعات</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold text-right">رقم المرجع</th>
                <th className="pb-3 font-semibold text-right">الوصف</th>
                <th className="pb-3 font-semibold text-right">تاريخ الاستحقاق</th>
                <th className="pb-3 font-semibold text-left">المبلغ</th>
                <th className="pb-3 font-semibold text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {FEES.map((fee) => (
                <tr key={fee.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold text-right">{fee.id}</td>
                  <td className="py-3.5 font-bold text-white text-right">{fee.description}</td>
                  <td className="py-3.5 font-mono text-gray-400 text-right">{fee.dueDate}</td>
                  <td className="py-3.5 font-mono text-left font-extrabold text-cyber-cyan">{fee.amount.toLocaleString()} د.ج</td>
                  <td className="py-3.5 text-center">
                    {fee.status === "paid" ? (
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold border bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow">
                        تم الدفع {fee.paidDate}
                      </span>
                    ) : (
                      <button
                        onClick={() => alert(`جاري توجيهك إلى بوابة الدفع لـ ${fee.id}...`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-laser-amber text-obsidian-950 font-bold text-[10px] hover:bg-laser-amber/90 cursor-pointer transition-colors mx-auto"
                      >
                        <CreditCard className="w-3 h-3" />
                        ادفع الآن
                      </button>
                    )}
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
