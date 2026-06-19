"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import {
  MOCK_ASSIGNMENTS,
  MOCK_INVENTORY,
  Assignment,
} from "@/lib/mock-data";
import {
  Cpu,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  UserCheck,
  Calendar,
  Clock,
} from "lucide-react";
import { cn, getDaysRemaining, isOverdue } from "@/lib/utils";

export default function CustodyAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [showAssignForm, setShowAssignForm] = useState(false);

  // Form State
  const [selectedItemId, setSelectedItemId] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [role, setRole] = useState<"Student" | "Instructor">("Student");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");

  const handleReturn = (id: string) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "returned" } : item
      )
    );
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId || !borrowerName || !expectedReturnDate) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const item = MOCK_INVENTORY.find((i) => i.id === selectedItemId);
    if (!item) return;

    const newAssignment: Assignment = {
      id: `ASG-${Math.floor(100 + Math.random() * 900)}`,
      itemId: selectedItemId,
      itemName: item.name,
      borrowerName,
      role,
      borrowDate: new Date().toISOString().split("T")[0],
      expectedReturnDate,
      status: "active",
    };

    setAssignments((prev) => [newAssignment, ...prev]);

    // Reset Form
    setSelectedItemId("");
    setBorrowerName("");
    setRole("Student");
    setExpectedReturnDate("");
    setShowAssignForm(false);
  };

  // Metrics
  const activeAssignments = assignments.filter((a) => a.status === "active");
  const overdueAssignments = assignments.filter((a) => a.status === "overdue");
  const returnedAssignments = assignments.filter((a) => a.status === "returned");

  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              🔄 نقل العهدة الديناميكي
            </h1>
            <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-3 py-1 rounded-full font-bold">
              Custody Hub
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            تسليم وتتبع العهدة التكنولوجية من الأساتذة والطلاب مع نظام التنبيهات الفورية
          </p>
        </div>

        <button
          onClick={() => setShowAssignForm(!showAssignForm)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-cyan to-neon-purple text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyber-cyan/50 transition-all whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          تسليم عهدة جديدة
        </button>
      </div>

      {/* ============= بطاقات الإحصائيات | Metrics ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="العهد النشطة"
          value={activeAssignments.length}
          change="قيد الاستخدام حالياً"
          changeType="neutral"
          icon={UserCheck}
          themeColor="cyan"
        />
        <StatCard
          title="العهد المتأخرة"
          value={overdueAssignments.length}
          change="تحتاج متابعة فورية"
          changeType="decrease"
          icon={AlertTriangle}
          themeColor="red"
        />
        <StatCard
          title="العهد المسترجعة"
          value={returnedAssignments.length}
          change="تم إرجاعها بسلام"
          changeType="increase"
          icon={CheckCircle2}
          themeColor="emerald"
        />
      </div>

      {/* ============= نموذج التسليم | Assignment Form ============= */}
      {showAssignForm && (
        <GlassCard className="p-8 border-cyber-cyan/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              ➕ تسليم عهدة جديدة
            </h2>
            <button
              onClick={() => setShowAssignForm(false)}
              className="p-2 hover:bg-obsidian-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleAssign} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* اختيار المعدة */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-2 block">
                  المعدة المراد تسليمها
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
                  required
                >
                  <option value="">-- اختر معدة --</option>
                  {MOCK_INVENTORY.filter((i) => i.available > 0).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.available} متاح)
                    </option>
                  ))}
                </select>
              </div>

              {/* اسم المستقبل */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-2 block">
                  اسم المستقبل (الطالب/الأستاذ)
                </label>
                <input
                  type="text"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  placeholder="مثال: محمد علي بن عمارة"
                  className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
                  required
                />
              </div>

              {/* نوع المستقبل */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-2 block">
                  نوع المستقبل
                </label>
                <div className="flex gap-4">
                  {(["Student", "Instructor"] as const).map((r) => (
                    <label key={r} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={r}
                        checked={role === r}
                        onChange={(e) => setRole(e.target.value as "Student" | "Instructor")}
                        className="w-4 h-4 accent-cyber-cyan"
                      />
                      <span className="text-sm text-gray-300">
                        {r === "Student" ? "طالب" : "أستاذ"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* تاريخ الاسترجاع المتوقع */}
              <div>
                <label className="text-sm font-bold text-gray-300 mb-2 block">
                  تاريخ الاسترجاع المتوقع
                </label>
                <input
                  type="date"
                  value={expectedReturnDate}
                  onChange={(e) => setExpectedReturnDate(e.target.value)}
                  className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
                  required
                />
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-cyan to-neon-purple text-white font-semibold hover:shadow-lg transition-all"
              >
                تأكيد التسليم
              </button>
              <button
                type="button"
                onClick={() => setShowAssignForm(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-obsidian-800 text-gray-300 font-semibold hover:border-obsidian-700 transition-all"
              >
                إلغاء
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* ============= جدول العهد | Assignments Table ============= */}
      <GlassCard className="overflow-hidden" hoverable={false}>
        <div className="p-6 border-b border-obsidian-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📋 سجل العهد
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-obsidian-900/50 border-b border-obsidian-800">
                <th className="px-6 py-4 text-right font-bold text-gray-300">المعدة</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">المستقبل</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">النوع</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">تاريخ الاستقبال</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الاسترجاع المتوقع</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-center font-bold text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment) => {
                  const daysRemaining = getDaysRemaining(assignment.expectedReturnDate);
                  const overdue = isOverdue(assignment.expectedReturnDate);

                  let statusColor = "text-emerald-glow bg-emerald-glow/10";
                  let statusText = "نشطة";

                  if (assignment.status === "returned") {
                    statusColor = "text-cyber-cyan bg-cyber-cyan/10";
                    statusText = "مسترجعة";
                  } else if (assignment.status === "overdue" || overdue) {
                    statusColor = "text-neon-red bg-neon-red/10";
                    statusText = "متأخرة";
                  }

                  return (
                    <tr
                      key={assignment.id}
                      className="border-b border-obsidian-800/50 hover:bg-obsidian-900/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{assignment.itemName}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {assignment.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{assignment.borrowerName}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            assignment.role === "Student"
                              ? "bg-cyber-cyan/10 text-cyber-cyan"
                              : "bg-laser-amber/10 text-laser-amber"
                          }`}
                        >
                          {assignment.role === "Student" ? "طالب" : "أستاذ"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{assignment.borrowDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-300">{assignment.expectedReturnDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                            {statusText}
                          </div>
                          {assignment.status !== "returned" && (
                            <span className={`text-xs font-bold ${
                              daysRemaining < 0
                                ? "text-neon-red"
                                : daysRemaining < 3
                                ? "text-laser-amber"
                                : "text-emerald-glow"
                            }`}>
                              {daysRemaining < 0
                                ? `متأخر ${Math.abs(daysRemaining)} يوم`
                                : `${daysRemaining} يوم المتبقي`}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {assignment.status !== "returned" && (
                          <button
                            onClick={() => handleReturn(assignment.id)}
                            className="px-4 py-2 rounded-lg bg-emerald-glow/10 text-emerald-glow text-xs font-bold hover:bg-emerald-glow/20 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            تأكيد الاسترجاع
                          </button>
                        )}
                        {assignment.status === "returned" && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-glow mx-auto" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <p>لا توجد عهد حالياً</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* ============= تنبيهات العهد المتأخرة | Overdue Alerts ============= */}
      {overdueAssignments.length > 0 && (
        <GlassCard className="p-6 border-neon-red/30" hoverable={false}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🚨 عهد متأخرة تحتاج متابعة
          </h3>
          <div className="space-y-3">
            {overdueAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-neon-red/5 border border-neon-red/30"
              >
                <div>
                  <p className="font-semibold text-white">
                    {assignment.itemName}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {assignment.borrowerName} - كان يجب استرجاعها في{" "}
                    {assignment.expectedReturnDate}
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-neon-red/20 text-neon-red text-sm font-bold hover:bg-neon-red/30 transition-colors">
                  إرسال تنبيه
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
