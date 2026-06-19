"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import {
  RevenueChart,
  TrackDistributionChart,
  EquipmentUsageChart,
} from "@/components/dashboard/Charts";
import {
  TrendingUp,
  Users,
  Boxes,
  AlertTriangle,
  Activity,
  Zap,
  DollarSign,
} from "lucide-react";
import { DASHBOARD_STATS, MOCK_INVENTORY, MOCK_STUDENTS } from "@/lib/mock-data";
import { formatNumberAr } from "@/lib/utils";

// 📊 بيانات حالة المعدات الحية
const equipmentStatus = [
  {
    name: "Arduino Mega 2560",
    status: "جاهز",
    condition: "ممتاز",
    available: "8/15",
    usage: 53,
    icon: "⚙️",
    color: "text-cyber-cyan",
  },
  {
    name: "Raspberry Pi 4",
    status: "جاهز",
    condition: "ممتاز",
    available: "6/10",
    usage: 60,
    icon: "🖥️",
    color: "text-emerald-glow",
  },
  {
    name: "طابعة 3D",
    status: "جاهز",
    condition: "جيد",
    available: "2/4",
    usage: 50,
    icon: "🖨️",
    color: "text-laser-amber",
  },
  {
    name: "آلة CNC",
    status: "في الصيانة",
    condition: "متوسط",
    available: "1/2",
    usage: 50,
    icon: "🔧",
    color: "text-neon-purple",
  },
  {
    name: "لحام إلكتروني",
    status: "جاهز",
    condition: "ممتاز",
    available: "4/6",
    usage: 67,
    icon: "🔥",
    color: "text-neon-red",
  },
];

// 👥 الطلاب النشطين
const activeStudents = MOCK_STUDENTS.filter(
  (s) => s.status === "نشط"
).slice(0, 5);

export default function AdminDashboard() {
  const underutilizedEquipment = MOCK_INVENTORY.filter(
    (e) => (e.available / e.quantity) * 100 > 60
  ).length;

  return (
    <div className="space-y-8">
      {/* ============= العنوان الرئيسي | Main Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            📊 مركز القيادة التنفيذي
          </h1>
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-3 py-1 rounded-full font-bold pulse-cyan">
            Live Dashboard
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          مراقبة فورية للنظام • الإيرادات • الطلاب • المعدات • الأداء العام
        </p>
      </div>

      {/* ============= البطاقات الإحصائية الرئيسية | Key Metrics ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الطلاب النشطين"
          value={DASHBOARD_STATS.activeStudents}
          change={`من ${DASHBOARD_STATS.totalStudents} طالب`}
          changeType="neutral"
          icon={Users}
          themeColor="cyan"
          subtext="الطلاب المسجلين حالياً"
        />
        <StatCard
          title="إجمالي الإيرادات المحصلة"
          value={`${formatNumberAr(Math.floor(DASHBOARD_STATS.totalRevenue / 1000))}K`}
          change="+12% هذا الشهر"
          changeType="increase"
          icon={DollarSign}
          themeColor="emerald"
          subtext="دينار جزائري"
        />
        <StatCard
          title="المعدات المتاحة"
          value={`${DASHBOARD_STATS.availableEquipment}/${DASHBOARD_STATS.totalEquipment}`}
          change={`${underutilizedEquipment} معدات قليلة الاستخدام`}
          changeType="neutral"
          icon={Boxes}
          themeColor="amber"
          subtext="من إجمالي المستودع"
        />
        <StatCard
          title="المدفوعات المعلقة"
          value={`${formatNumberAr(Math.floor(DASHBOARD_STATS.pendingPayments / 1000))}K`}
          change={`${Math.ceil((DASHBOARD_STATS.pendingPayments / (DASHBOARD_STATS.totalRevenue + DASHBOARD_STATS.pendingPayments)) * 100)}% معلق`}
          changeType="decrease"
          icon={AlertTriangle}
          themeColor="red"
          subtext="تحتاج متابعة"
        />
      </div>

      {/* ============= الرسوم البيانية الرئيسية | Main Charts ============= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TrackDistributionChart />
      </div>

      <EquipmentUsageChart />

      {/* ============= حالة المعدات الحية | Live Equipment Status ============= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status Table */}
        <GlassCard className="p-6" hoverable={false}>
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-laser-amber" />
            <h2 className="text-xl font-bold text-white">حالة المعدات الحية</h2>
            <span className="text-xs font-mono text-laser-amber bg-laser-amber/10 border border-laser-amber/30 px-2 py-1 rounded ml-auto">
              تحديث فوري
            </span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {equipmentStatus.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg bg-obsidian-900/50 border border-obsidian-800/50 hover:border-obsidian-700 transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.name}</p>
                    <p className={`text-xs font-mono ${item.color}`}>{item.available}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">الحالة</p>
                    <p
                      className={`text-xs font-bold ${
                        item.status === "جاهز"
                          ? "text-emerald-glow"
                          : "text-laser-amber"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-12 h-2 bg-obsidian-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.usage > 70
                          ? "bg-neon-red"
                          : item.usage > 50
                          ? "bg-laser-amber"
                          : "bg-emerald-glow"
                      }`}
                      style={{ width: `${item.usage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Active Students */}
        <GlassCard className="p-6" hoverable={false}>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-cyber-cyan" />
            <h2 className="text-xl font-bold text-white">الطلاب النشطين</h2>
            <span className="text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 px-2 py-1 rounded ml-auto">
              {activeStudents.length} طالب
            </span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activeStudents.map((student, idx) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 rounded-lg bg-obsidian-900/50 border border-obsidian-800/50 hover:border-cyber-cyan/30 transition-all group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.track}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">الحضور</p>
                    <p className="text-sm font-bold text-emerald-glow">
                      {student.attendanceRate}%
                    </p>
                  </div>
                  {/* Attendance Ring */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-cyan to-neon-purple p-0.5">
                    <div className="w-full h-full rounded-full bg-obsidian-950 flex items-center justify-center">
                      <span className="text-xs font-bold text-cyber-cyan">
                        {student.attendanceRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ============= التنبيهات والإشعارات | Alerts & Notifications ============= */}
      <GlassCard className="p-6 border-neon-red/30" hoverable={false}>
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-neon-red" />
          <h2 className="text-xl font-bold text-white">التنبيهات النشطة</h2>
          <span className="text-xs font-mono text-neon-red bg-neon-red/10 border border-neon-red/30 px-2 py-1 rounded ml-auto animate-pulse">
            3 تنبيهات
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-neon-red/5 border border-neon-red/30">
            <div className="w-2 h-2 bg-neon-red rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm">عطل في آلة CNC</p>
              <p className="text-xs text-gray-400 mt-1">
                آلة حفر CNC تحتاج صيانة فورية • التاريخ: 2026-06-18
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-laser-amber/5 border border-laser-amber/30">
            <div className="w-2 h-2 bg-laser-amber rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm">مستودع Filament منخفض</p>
              <p className="text-xs text-gray-400 mt-1">
                كمية خيط PLA أقل من 40% • يرجى تجديد المخزون قريباً
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/30">
            <div className="w-2 h-2 bg-cyber-cyan rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm">مستحقات مالية معلقة</p>
              <p className="text-xs text-gray-400 mt-1">
                {formatNumberAr(DASHBOARD_STATS.pendingPayments)} دينار معلقة من الطلاب
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
