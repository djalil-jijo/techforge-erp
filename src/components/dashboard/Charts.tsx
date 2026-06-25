"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MONTHS_AR } from "@/lib/constants";

// 📊 بيانات الإيرادات الشهرية | Monthly Revenue Data
const revenueData = [
  { month: "يناير", revenue: 45000, expenses: 28000 },
  { month: "فبراير", revenue: 52000, expenses: 31000 },
  { month: "مارس", revenue: 48000, expenses: 29000 },
  { month: "أبريل", revenue: 61000, expenses: 35000 },
  { month: "مايو", revenue: 55000, expenses: 32000 },
  { month: "يونيو", revenue: 72000, expenses: 40000 },
];

// 📈 بيانات توزيع المسارات | Track Distribution
const trackDistribution = [
  { name: "الروبوتيك", value: 45 },
  { name: "البرمجة", value: 30 },
  { name: "الإلكترونيات", value: 25 },
];

// 🎯 بيانات استخدام المعدات | Equipment Usage
const equipmentUsage = [
  { equipment: "Arduino", usage: 85, available: 15 },
  { equipment: "Raspberry Pi", usage: 70, available: 30 },
  { equipment: "طابعة 3D", usage: 95, available: 5 },
  { equipment: "CNC", usage: 60, available: 40 },
  { equipment: "لحام", usage: 75, available: 25 },
];

const COLORS = ["#00d9ff", "#ffb800", "#00ff88", "#d946ef", "#ff4444"];

export function RevenueChart() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        📈 الإيرادات والمصاريف الشهرية
        <span className="text-xs font-mono text-cyber-cyan">الاتجاهات الشهرية</span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#303050" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              background: "rgba(26, 26, 46, 0.95)",
              border: "1px solid #00d9ff",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#00ff88"
            strokeWidth={3}
            dot={{ fill: "#00ff88", r: 6 }}
            name="الإيرادات"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ffb800"
            strokeWidth={3}
            dot={{ fill: "#ffb800", r: 6 }}
            name="المصاريف"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrackDistributionChart() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        🎓 توزيع الطلاب على المسارات
        <span className="text-xs font-mono text-neon-purple">التوزيع العام</span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={trackDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {trackDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(26, 26, 46, 0.95)",
              border: "1px solid #d946ef",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EquipmentUsageChart() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        🛠️ معدل استخدام المعدات
        <span className="text-xs font-mono text-laser-amber">معدل الاستخدام</span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={equipmentUsage}>
          <CartesianGrid strokeDasharray="3 3" stroke="#303050" />
          <XAxis dataKey="equipment" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              background: "rgba(26, 26, 46, 0.95)",
              border: "1px solid #ffb800",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="usage" fill="#00d9ff" name="المستخدم" radius={[8, 8, 0, 0]} />
          <Bar dataKey="available" fill="#00ff88" name="المتاح" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
