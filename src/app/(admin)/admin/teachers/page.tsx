"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { MOCK_TEACHERS } from "@/lib/mock-data";
import {
  BookOpen,
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = MOCK_TEACHERS.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTeachers = MOCK_TEACHERS.filter(
    (t) => t.status === "نشط"
  ).length;

  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            👨‍🏫 إدارة الأساتذة
          </h1>
          <span className="text-xs bg-laser-amber/10 border border-laser-amber/35 text-laser-amber font-mono px-3 py-1 rounded-full font-bold">
            فريق التدريس
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          متابعة عقود الأساتذة والتقارير الرقمية المرفوعة
        </p>
      </div>

      {/* ============= بطاقات الإحصائيات | Metrics ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="إجمالي الأساتذة"
          value={MOCK_TEACHERS.length}
          change={`${activeTeachers} نشط حالياً`}
          changeType="neutral"
          icon={BookOpen}
          themeColor="amber"
        />
        <StatCard
          title="الأساتذة النشطون"
          value={activeTeachers}
          change="يدرسون حالياً"
          changeType="increase"
          icon={CheckCircle2}
          themeColor="emerald"
        />
        <StatCard
          title="التخصصات"
          value={new Set(MOCK_TEACHERS.map((t) => t.specialization)).size}
          change="مجالات تدريسية"
          changeType="neutral"
          icon={AlertCircle}
          themeColor="cyan"
        />
      </div>

      {/* ============= البحث | Search ============= */}
      <GlassCard className="p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              🔍 بحث عن أستاذ
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="البحث بالاسم أو البريد الإلكتروني..."
                className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-laser-amber text-obsidian-950 font-semibold text-sm hover:shadow-lg hover:shadow-laser-amber/50 transition-all mt-auto">
            <Plus className="w-4 h-4" />
            إضافة أستاذ
          </button>
        </div>
      </GlassCard>

      {/* ============= البطاقات | Teachers Cards ============= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <GlassCard key={teacher.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-laser-amber/10 border border-laser-amber/30 flex items-center justify-center text-laser-amber font-bold text-lg">
                  {teacher.name.charAt(0)}
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-cyber-cyan/10 rounded transition-colors text-cyber-cyan">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-neon-red/10 rounded transition-colors text-neon-red">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-white">{teacher.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{teacher.specialization}</p>
                </div>

                <div className="pt-2 border-t border-obsidian-800/50 space-y-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">البريد الإلكتروني</p>
                    <p className="text-sm text-gray-300 font-mono truncate">{teacher.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">رقم الهاتف</p>
                    <p className="text-sm text-gray-300 font-mono">{teacher.phone}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  {teacher.status === "نشط" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-glow" />
                      <span className="text-xs font-bold text-emerald-glow">نشط</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-laser-amber" />
                      <span className="text-xs font-bold text-laser-amber">غير نشط</span>
                    </>
                  )}
                </div>
              </div>
            </GlassCard>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">لا توجد نتائج مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
