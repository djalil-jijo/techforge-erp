"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  LayoutDashboard,
  Cpu,
  CheckSquare,
  Award,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

const CURRENT_SCHEDULE = [
  {
    time: "09:00 - 10:30",
    subject: "ورشة الروبوتيك المتقدمة",
    instructor: "الأستاذ أحمد محمود",
    room: "المختبر A",
    color: "text-cyber-cyan",
  },
  {
    time: "11:00 - 12:30",
    subject: "برمجة Python المتقدمة",
    instructor: "الأستاذة سارة بن ناصر",
    room: "القاعة B2",
    color: "text-laser-amber",
  },
  {
    time: "14:00 - 15:30",
    subject: "مشروع FabLab",
    instructor: "الأستاذ خالد البرقي",
    room: "ورشة FabLab",
    color: "text-emerald-glow",
  },
];

const ALERTS = [
  {
    type: "تنبيه",
    message: "الحضور متأخر - الرجاء الالتزام بالمواعيد",
    severity: "amber",
    icon: AlertCircle,
  },
  {
    type: "إشعار",
    message: "أحدث مهارة قيد التطور - الاستمرار في الممارسة",
    severity: "cyan",
    icon: TrendingUp,
  },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            👋 مرحباً، الأستاذ أحمد
          </h1>
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-3 py-1 rounded-full font-bold pulse-cyan">
            الحضور المباشر
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          جدول الحصص الفوري والإشعارات الإدارية الطارئة
        </p>
      </div>

      {/* ============= بطاقات الإحصائيات | Stats ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="الطلاب المسجلون"
          value="45"
          change="في الفوج الحالي"
          changeType="neutral"
          icon={CheckSquare}
          themeColor="cyan"
        />
        <StatCard
          title="الحصص اليومية"
          value="3"
          change="حصة متبقية اليوم"
          changeType="neutral"
          icon={Calendar}
          themeColor="amber"
        />
        <StatCard
          title="متوسط التقييم"
          value="85%"
          change="أداء الطلاب"
          changeType="increase"
          icon={Award}
          themeColor="emerald"
        />
      </div>

      {/* ============= جدول الحصص | Daily Schedule ============= */}
      <GlassCard className="p-8" hoverable={false}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          📅 جدول اليوم
        </h2>
        <div className="space-y-4">
          {CURRENT_SCHEDULE.map((session, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-lg bg-obsidian-900/50 border border-obsidian-800/50 hover:border-obsidian-700 transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${session.color} text-xl font-bold`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{session.subject}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {session.instructor} • {session.room}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-bold text-gray-300">
                  {session.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ============= الأدوات والعهدة | My Tools ============= */}
      <GlassCard className="p-8" hoverable={false}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🔧 الأدوات تحت مسؤوليتي
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "مجموعة Arduino Mega", qty: 5, status: "جاهز", color: "emerald" },
            { name: "حقيبة الروبوتات التعليمية", qty: 2, status: "جاهز", color: "emerald" },
            { name: "لحام إلكتروني", qty: 3, status: "جاهز", color: "emerald" },
            { name: "مستشعرات IoT", qty: 12, status: "جاهز", color: "emerald" },
          ].map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-obsidian-900/50 border border-obsidian-800/50"
            >
              <div>
                <p className="font-semibold text-white">{tool.name}</p>
                <p className="text-xs text-gray-400 mt-1">الكمية: {tool.qty}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-glow animate-pulse" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ============= الإشعارات | Alerts ============= */}
      <GlassCard className="p-8" hoverable={false}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🔔 الإشعارات الفورية
        </h2>
        <div className="space-y-3">
          {ALERTS.map((alert, idx) => {
            const IconComponent = alert.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  alert.severity === "amber"
                    ? "bg-laser-amber/5 border-laser-amber/30"
                    : "bg-cyber-cyan/5 border-cyber-cyan/30"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    alert.severity === "amber"
                      ? "text-laser-amber"
                      : "text-cyber-cyan"
                  }`}
                />
                <div>
                  <p
                    className={`font-semibold ${
                      alert.severity === "amber"
                        ? "text-laser-amber"
                        : "text-cyber-cyan"
                    }`}
                  >
                    {alert.type}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
