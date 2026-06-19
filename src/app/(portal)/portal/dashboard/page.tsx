"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import {
  Trophy,
  Zap,
  BookOpen,
  Star,
  Award,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    name: "أول دائرة مبنية",
    icon: "⚡",
    earned: true,
    date: "2026-03-15",
    color: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5",
  },
  {
    name: "خبير اللحام",
    icon: "🔥",
    earned: true,
    date: "2026-04-02",
    color: "text-laser-amber border-laser-amber/30 bg-laser-amber/5",
  },
  {
    name: "مبرمج الروبوت",
    icon: "🤖",
    earned: true,
    date: "2026-05-20",
    color: "text-emerald-glow border-emerald-glow/30 bg-emerald-glow/5",
  },
  {
    name: "محترف الطباعة ثلاثية الأبعاد",
    icon: "🖨️",
    earned: false,
    date: null,
    color: "text-gray-600 border-obsidian-800 bg-obsidian-950",
  },
  {
    name: "مرشح الهاكاثون",
    icon: "🏆",
    earned: false,
    date: null,
    color: "text-gray-600 border-obsidian-800 bg-obsidian-950",
  },
  {
    name: "مشغل آلة CNC",
    icon: "⚙️",
    earned: false,
    date: null,
    color: "text-gray-600 border-obsidian-800 bg-obsidian-950",
  },
];

const SKILL_PROGRESS = [
  { name: "منطق البرمجة", level: 82, color: "bg-cyber-cyan" },
  { name: "تجميع الدوائر", level: 75, color: "bg-neon-purple" },
  { name: "مهارات اللحام", level: 90, color: "bg-laser-amber" },
  { name: "تصميم ثلاثي الأبعاد", level: 45, color: "bg-emerald-glow" },
  { name: "التعاون الجماعي", level: 88, color: "bg-cyber-cyan" },
];

const ACTIVITIES = [
  {
    title: "مشروع الروبوت الجوال",
    description: "بناء روبوت متحرك باستخدام Arduino و Raspberry Pi",
    date: "2026-06-10",
    status: "جاري",
    progress: 65,
  },
  {
    title: "مسابقة الهاكاثون المحلية",
    description: "الفريق: تطوير تطبيق بيئي ذكي",
    date: "2026-06-25",
    status: "قادم",
    progress: 0,
  },
  {
    title: "ورشة الطباعة ثلاثية الأبعاد",
    description: "تصميم وطباعة قطعة هندسية معقدة",
    date: "2026-06-02",
    status: "مكتمل",
    progress: 100,
  },
];

export default function StudentPortal() {
  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            🏆 مركز إنجازاتي
          </h1>
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-3 py-1 rounded-full font-bold pulse-cyan">
            التقدم المباشر
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          تتبع رحلتك في مركز FabLab - المهارات والإنجازات والأنشطة التنافسية
        </p>
      </div>

      {/* ============= بطاقات الإحصائيات | Stats ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="نسبة الحضور"
          value="92%"
          change="+4% هذا الشهر"
          changeType="increase"
          icon={CheckCircle2}
          themeColor="emerald"
        />
        <StatCard
          title="الشارات المكتسبة"
          value="3"
          change="من 6 متاحة"
          changeType="neutral"
          icon={Star}
          themeColor="amber"
        />
        <StatCard
          title="متوسط المهارات"
          value="76%"
          change="تحسن مستمر"
          changeType="increase"
          icon={Zap}
          themeColor="cyan"
        />
      </div>

      {/* ============= الشارات والإنجازات | Badges ============= */}
      <GlassCard className="p-8" hoverable={false}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🎖️ الشارات والإنجازات
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((badge) => (
            <div
              key={badge.name}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all",
                badge.color,
                badge.earned
                  ? "hover:shadow-lg hover:scale-105"
                  : "opacity-50 cursor-not-allowed"
              )}
              title={badge.name}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs font-bold text-center line-clamp-2">
                {badge.name}
              </p>
              {badge.earned && badge.date && (
                <p className="text-xs mt-2 opacity-75">{badge.date}</p>
              )}
              {!badge.earned && (
                <Lock className="w-4 h-4 mt-2 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ============= مهاراتي | Skills Progress ============= */}
      <GlassCard className="p-8" hoverable={false}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          📊 تطور مهاراتي
        </h2>
        <div className="space-y-6">
          {SKILL_PROGRESS.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-white">{skill.name}</p>
                <span className="text-sm font-bold text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-3 bg-obsidian-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color} transition-all duration-500`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ============= أنشطتي الحالية | Current Activities ============= */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🎯 أنشطتي الحالية
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {ACTIVITIES.map((activity) => (
            <GlassCard
              key={activity.title}
              className={cn(
                "p-6 transition-all",
                activity.status === "مكتمل"
                  ? "border-emerald-glow/30"
                  : activity.status === "جاري"
                  ? "border-cyber-cyan/30"
                  : "border-laser-amber/30"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {activity.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    activity.status === "مكتمل"
                      ? "bg-emerald-glow/10 text-emerald-glow"
                      : activity.status === "جاري"
                      ? "bg-cyber-cyan/10 text-cyber-cyan"
                      : "bg-laser-amber/10 text-laser-amber"
                  )}
                >
                  {activity.status}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full h-2 bg-obsidian-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all",
                        activity.progress >= 80
                          ? "bg-emerald-glow"
                          : activity.progress >= 50
                          ? "bg-laser-amber"
                          : "bg-cyber-cyan"
                      )}
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-400 w-12 text-right">
                  {activity.progress}%
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-3">📅 {activity.date}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* ============= إحصائيات عامة | General Stats ============= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6" hoverable={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">الساعات المتدربة</h3>
            <BookOpen className="w-5 h-5 text-cyber-cyan" />
          </div>
          <p className="text-3xl font-bold text-cyber-cyan">124</p>
          <p className="text-xs text-gray-400 mt-2">ساعة تدريبية كاملة</p>
        </GlassCard>

        <GlassCard className="p-6" hoverable={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">المشاريع المكتملة</h3>
            <Trophy className="w-5 h-5 text-laser-amber" />
          </div>
          <p className="text-3xl font-bold text-laser-amber">7</p>
          <p className="text-xs text-gray-400 mt-2">مشاريع ناجحة</p>
        </GlassCard>

        <GlassCard className="p-6" hoverable={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">الترتيب الفصلي</h3>
            <Award className="w-5 h-5 text-emerald-glow" />
          </div>
          <p className="text-3xl font-bold text-emerald-glow">5/45</p>
          <p className="text-xs text-gray-400 mt-2">بين أقرانك</p>
        </GlassCard>
      </div>
    </div>
  );
}
