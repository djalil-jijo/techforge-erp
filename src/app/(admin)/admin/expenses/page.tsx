"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Search, Filter, ShoppingBag, ArrowDownRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Expense {
  id: string;
  item: string;
  category: "أجهزة وقطع غيار" | "خيوط الطباعة" | "أدوات ومعدات" | "صيانة ومرافق";
  amount: number;
  date: string;
  status: "تم الدفع" | "معلق";
}

const MOCK_EXPENSES: Expense[] = [
  { id: "EXP-101", item: "خيوط طابعة ثلاثية الأبعاد (PLA 10 كغ)", category: "خيوط الطباعة", amount: 28000, date: "2026-06-15", status: "تم الدفع" },
  { id: "EXP-102", item: "حقائب تجارب Arduino Uno (10 مجموعات)", category: "أجهزة وقطع غيار", amount: 35000, date: "2026-06-12", status: "تم الدفع" },
  { id: "EXP-103", item: "أجهزة Raspberry Pi 4 Model B (5 أجهزة)", category: "أجهزة وقطع غيار", amount: 55000, date: "2026-06-10", status: "تم الدفع" },
  { id: "EXP-104", item: "معدات وأدوات محطة اللحام", category: "أدوات ومعدات", amount: 18000, date: "2026-06-08", status: "معلق" },
  { id: "EXP-105", item: "صيانة نظام التبريد الهوائي في مختبر FabLab", category: "صيانة ومرافق", amount: 12000, date: "2026-06-05", status: "تم الدفع" },
];

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredExpenses = MOCK_EXPENSES.filter((exp) => {
    const matchesSearch = exp.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSpent = MOCK_EXPENSES.filter(e => e.status === "تم الدفع").reduce((sum, e) => sum + e.amount, 0);
  const pendingSpent = MOCK_EXPENSES.filter(e => e.status === "معلق").reduce((sum, e) => sum + e.amount, 0);

  const getCategoryEnglishVal = (cat: string) => {
    switch (cat) {
      case "أجهزة وقطع غيار": return "Hardware";
      case "خيوط الطباعة": return "Filament";
      case "أدوات ومعدات": return "Tools";
      case "صيانة ومرافق": return "Utilities";
      default: return cat;
    }
  };

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2">
          دفتر المصاريف
          <span className="text-xs bg-neon-red/10 border border-neon-red/35 text-neon-red font-mono px-2 py-0.5 rounded-full font-bold">
            تتبع النفقات
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          راقب مشتريات خيوط الطباعة ثلاثية الأبعاد، القطع الإلكترونية، وتكاليف صيانة المختبر.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="إجمالي المصاريف المدفوعة"
          value={`${totalSpent.toLocaleString()} د.ج`}
          change="الفواتير المسواة"
          changeType="neutral"
          icon={ArrowDownRight}
          themeColor="amber"
        />
        <StatCard
          title="الفواتير المعلقة"
          value={`${pendingSpent.toLocaleString()} د.ج`}
          change="بانتظار التأكيد"
          changeType="decrease"
          icon={ShoppingBag}
          themeColor="purple"
        />
        <StatCard
          title="إجمالي البنود المسجلة"
          value={MOCK_EXPENSES.length}
          change="عنصر مسجل"
          changeType="neutral"
          icon={Layers}
          themeColor="cyan"
        />
      </div>

      {/* List Ledger */}
      <GlassCard className="space-y-6" hoverable={false}>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالوصف أو برمز المصروف..."
              className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl py-2.5 pr-10 pl-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-red text-right"
            />
          </div>

          <div className="flex items-center gap-2 bg-obsidian-950 px-3 py-2 rounded-xl border border-obsidian-850 justify-start flex-row-reverse">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pl-4 font-bold text-right"
            >
              <option value="All" className="bg-obsidian-950">جميع الفئات</option>
              <option value="أجهزة وقطع غيار" className="bg-obsidian-950">أجهزة وقطع غيار</option>
              <option value="خيوط الطباعة" className="bg-obsidian-950">خيوط الطباعة</option>
              <option value="أدوات ومعدات" className="bg-obsidian-950">أدوات ومعدات</option>
              <option value="صيانة ومرافق" className="bg-obsidian-950">صيانة ومرافق</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-obsidian-800 text-gray-500 font-mono uppercase">
                <th className="pb-3 font-semibold text-right">رمز المصروف</th>
                <th className="pb-3 font-semibold text-right">المادة المشتراة</th>
                <th className="pb-3 font-semibold text-right">الفئة</th>
                <th className="pb-3 font-semibold text-right">تاريخ الفاتورة</th>
                <th className="pb-3 font-semibold text-left">التكلفة</th>
                <th className="pb-3 font-semibold text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-850">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-obsidian-900/40 transition-colors">
                  <td className="py-3.5 font-mono text-gray-400 font-semibold text-right">{exp.id}</td>
                  <td className="py-3.5 font-bold text-white text-right">{exp.item}</td>
                  <td className="py-3.5 text-gray-300 text-right">
                    <span className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-obsidian-800 text-[10px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-gray-400 text-right">{exp.date}</td>
                  <td className="py-3.5 font-mono text-left font-extrabold text-neon-red">
                    {exp.amount.toLocaleString()} د.ج
                  </td>
                  <td className="py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold border",
                        exp.status === "تم الدفع" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                        exp.status === "معلق" && "bg-laser-amber/5 border-laser-amber/20 text-laser-amber"
                      )}
                    >
                      {exp.status}
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
