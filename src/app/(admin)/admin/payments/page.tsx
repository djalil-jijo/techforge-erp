"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import {
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn, formatNumberAr, formatCurrency } from "@/lib/utils";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("الكل");
  const [filterStatus, setFilterStatus] = useState("الكل");

  let filteredTransactions = MOCK_TRANSACTIONS.filter((tx) => {
    const matchesSearch =
      tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "الكل" || tx.type === filterType;
    const matchesStatus = filterStatus === "الكل" || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalCollected = MOCK_TRANSACTIONS.filter(
    (t) => t.status === "Completed"
  ).reduce((sum, t) => sum + t.amount, 0);
  const pendingCollection = MOCK_TRANSACTIONS.filter(
    (t) => t.status === "Pending"
  ).reduce((sum, t) => sum + t.amount, 0);
  const failedTransactions = MOCK_TRANSACTIONS.filter(
    (t) => t.status === "Failed"
  ).length;

  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            💳 النواة المالية
          </h1>
          <span className="text-xs bg-emerald-glow/10 border border-emerald-glow/35 text-emerald-glow font-mono px-3 py-1 rounded-full font-bold">
            سجل المدفوعات
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          تتبع مستحقات الطلاب وفواتير الدورات ومداخيل خدمات FabLab
        </p>
      </div>

      {/* ============= بطاقات الإحصائيات | Metrics ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="إجمالي المبالغ المحصلة"
          value={`${formatNumberAr(Math.floor(totalCollected / 1000))}K`}
          change="معاملات مكتملة"
          changeType="increase"
          icon={TrendingUp}
          themeColor="emerald"
        />
        <StatCard
          title="المبالغ المعلقة التحصيل"
          value={`${formatNumberAr(Math.floor(pendingCollection / 1000))}K`}
          change="بانتظار السداد"
          changeType="neutral"
          icon={Clock}
          themeColor="amber"
        />
        <StatCard
          title="المعاملات الفاشلة"
          value={failedTransactions}
          change="تحتاج متابعة"
          changeType="decrease"
          icon={AlertTriangle}
          themeColor="red"
        />
      </div>

      {/* ============= فلاتر | Filters ============= */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              🔍 بحث
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="البحث باسم الطالب أو معرّف المعاملة..."
                className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              📋 نوع المعاملة
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
            >
              <option value="الكل">الكل</option>
              <option value="الرسوم الدراسية">الرسوم الدراسية</option>
              <option value="خدمات FabLab">خدمات FabLab</option>
              <option value="مشاريع">مشاريع</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              ✅ الحالة
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
            >
              <option value="الكل">الكل</option>
              <option value="Completed">مكتملة</option>
              <option value="Pending">معلقة</option>
              <option value="Failed">فاشلة</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* ============= جدول المعاملات | Transactions Table ============= */}
      <GlassCard className="overflow-hidden" hoverable={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-obsidian-900/50 border-b border-obsidian-800">
                <th className="px-6 py-4 text-right font-bold text-gray-300">معرّف المعاملة</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">اسم الطالب</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">المبلغ</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">النوع</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">التاريخ</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-obsidian-800/50 hover:bg-obsidian-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-mono text-cyan text-sm font-semibold">
                        {transaction.id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{transaction.studentName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-glow">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{transaction.type}</td>
                    <td className="px-6 py-4 text-gray-300">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {transaction.status === "Completed" && (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-glow" />
                            <span className="text-xs font-bold text-emerald-glow">
                              مكتملة
                            </span>
                          </>
                        )}
                        {transaction.status === "Pending" && (
                          <>
                            <Clock className="w-4 h-4 text-laser-amber" />
                            <span className="text-xs font-bold text-laser-amber">
                              معلقة
                            </span>
                          </>
                        )}
                        {transaction.status === "Failed" && (
                          <>
                            <AlertTriangle className="w-4 h-4 text-neon-red" />
                            <span className="text-xs font-bold text-neon-red">
                              فاشلة
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    لا توجد معاملات مطابقة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* ============= ملخص مالي | Financial Summary ============= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6" hoverable={false}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            📊 ملخص المبالغ حسب النوع
          </h3>
          <div className="space-y-3">
            {[
              { label: "الرسوم الدراسية", color: "bg-cyber-cyan" },
              { label: "خدمات FabLab", color: "bg-laser-amber" },
              { label: "مشاريع", color: "bg-emerald-glow" },
            ].map((type) => {
              const total = MOCK_TRANSACTIONS.filter(
                (t) => t.type === type.label && t.status === "Completed"
              ).reduce((sum, t) => sum + t.amount, 0);
              return (
                <div key={type.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${type.color}`} />
                    <span className="text-gray-300">{type.label}</span>
                  </div>
                  <span className="font-bold text-white">{formatCurrency(total)}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6" hoverable={false}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            📈 إحصائيات عامة
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-obsidian-900/50">
              <span className="text-gray-400">إجمالي المعاملات</span>
              <span className="font-bold text-white">{MOCK_TRANSACTIONS.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-obsidian-900/50">
              <span className="text-gray-400">نسبة النجاح</span>
              <span className="font-bold text-emerald-glow">
                {Math.round(
                  (MOCK_TRANSACTIONS.filter(
                    (t) => t.status === "Completed"
                  ).length /
                    MOCK_TRANSACTIONS.length) *
                    100
                )}
                %
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-obsidian-900/50">
              <span className="text-gray-400">المبالغ المحتجزة</span>
              <span className="font-bold text-laser-amber">
                {formatCurrency(pendingCollection)}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
