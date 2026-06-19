"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_STUDENTS, MOCK_ASSIGNMENTS } from "@/lib/mock-data";
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { cn, formatNumberAr } from "@/lib/utils";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrack, setFilterTrack] = useState("الكل");
  const [filterStatus, setFilterStatus] = useState("الكل");

  // Filter Students
  let filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = filterTrack === "الكل" || student.track === filterTrack;
    const matchesStatus = filterStatus === "الكل" || student.status === filterStatus;
    return matchesSearch && matchesTrack && matchesStatus;
  });

  const activeStudents = MOCK_STUDENTS.filter(
    (s) => s.status === "نشط"
  ).length;
  const averageAttendance =
    MOCK_STUDENTS.reduce((sum, s) => sum + s.attendanceRate, 0) /
    MOCK_STUDENTS.length;

  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            👥 إدارة الطلاب
          </h1>
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-3 py-1 rounded-full font-bold">
            قاعدة البيانات
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          تسيير ملفات الطلاب وتوزيعهم على مسارات التدريب المتقدمة
        </p>
      </div>

      {/* ============= بطاقات الإحصائيات | Metrics ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="إجمالي الطلاب المسجلين"
          value={MOCK_STUDENTS.length}
          change={`${activeStudents} نشط حالياً`}
          changeType="neutral"
          icon={Users}
          themeColor="cyan"
        />
        <StatCard
          title="متوسط الحضور"
          value={`${Math.round(averageAttendance)}%`}
          change="معدل الحضور الكلي"
          changeType="increase"
          icon={TrendingUp}
          themeColor="emerald"
        />
        <StatCard
          title="الطلاب قيد المراجعة"
          value={MOCK_STUDENTS.filter((s) => s.status === "معلق").length}
          change="يحتاجون متابعة"
          changeType="neutral"
          icon={AlertCircle}
          themeColor="amber"
        />
      </div>

      {/* ============= فلاتر البحث | Filters ============= */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              🔍 بحث عن طالب
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="البحث بالاسم أو البريد الإلكتروني أو رقم التسجيل..."
                className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              🎓 المسار
            </label>
            <select
              value={filterTrack}
              onChange={(e) => setFilterTrack(e.target.value)}
              className="bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
            >
              <option value="الكل">الكل</option>
              <option value="الروبوتيك">الروبوتيك</option>
              <option value="الإلكترونيات">الإلكترونيات</option>
              <option value="البرمجة">البرمجة</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              📊 الحالة
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
            >
              <option value="الكل">الكل</option>
              <option value="نشط">نشط</option>
              <option value="معلق">معلق</option>
              <option value="متخرج">متخرج</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyber-cyan text-obsidian-950 font-semibold text-sm hover:shadow-lg hover:shadow-cyber-cyan/50 transition-all">
            <Plus className="w-4 h-4" />
            إضافة طالب
          </button>
        </div>
      </GlassCard>

      {/* ============= جدول الطلاب | Students Table ============= */}
      <GlassCard className="overflow-hidden" hoverable={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-obsidian-900/50 border-b border-obsidian-800">
                <th className="px-6 py-4 text-right font-bold text-gray-300">اسم الطالب</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">البريد الإلكتروني</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">المسار</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الحضور</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">تاريخ التسجيل</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-center font-bold text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-obsidian-800/50 hover:bg-obsidian-900/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{student.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{student.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{student.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-cyber-cyan/10 text-cyber-cyan">
                        {student.track}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-obsidian-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-glow"
                            style={{ width: `${student.attendanceRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-emerald-glow">
                          {student.attendanceRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{student.enrollmentDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          student.status === "نشط"
                            ? "bg-emerald-glow/10 text-emerald-glow"
                            : student.status === "معلق"
                            ? "bg-laser-amber/10 text-laser-amber"
                            : "bg-cyber-cyan/10 text-cyber-cyan"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-cyber-cyan/10 rounded-lg transition-colors text-cyber-cyan">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-neon-red/10 rounded-lg transition-colors text-neon-red">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
