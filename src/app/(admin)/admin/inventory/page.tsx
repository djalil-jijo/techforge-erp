"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import {
  MOCK_INVENTORY,
  MOCK_ASSIGNMENTS,
  Assignment,
} from "@/lib/mock-data";
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ArrowRightLeft,
  AlertTriangle,
  CheckCircle2,
  Package,
} from "lucide-react";
import { cn, calculateAvailabilityPercentage } from "@/lib/utils";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("name");

  // الفئات الفريدة | Unique Categories
  const categories = [
    "الكل",
    ...new Set(MOCK_INVENTORY.map((item) => item.category)),
  ];

  // تصفية المعدات | Filter Equipment
  let filteredInventory = MOCK_INVENTORY.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "الكل" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // ترتيب | Sort
  if (sortBy === "availability") {
    filteredInventory.sort(
      (a, b) => (b.available / b.quantity) - (a.available / a.quantity)
    );
  } else if (sortBy === "condition") {
    const conditionRank = {
      "ممتاز": 4,
      "جيد": 3,
      "متوسط": 2,
      "ضعيف": 1,
    };
    filteredInventory.sort(
      (a, b) => (conditionRank[b.condition] || 0) - (conditionRank[a.condition] || 0)
    );
  } else {
    filteredInventory.sort((a, b) => a.name.localeCompare(b.name, "ar"));
  }

  // الإحصائيات | Statistics
  const totalValue = filteredInventory.reduce(
    (sum, item) => sum + item.available,
    0
  );
  const lowStockItems = filteredInventory.filter(
    (item) => (item.available / item.quantity) * 100 < 30
  ).length;
  const maintenanceItems = filteredInventory.filter(
    (item) => item.status === "في الصيانة"
  ).length;

  return (
    <div className="space-y-8">
      {/* ============= العنوان | Header ============= */}
      <div className="border-b border-obsidian-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            📦 المستودع الرقمي المركزي
          </h1>
          <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-3 py-1 rounded-full font-bold">
            The Vault
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          جرد وتصنيف شامل لجميع المعدات الدقيقة وحقائب الروبوتات مع نظام تتبع حالة الأجهزة
        </p>
      </div>

      {/* ============= بطاقات الإحصائيات | Stat Cards ============= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="إجمالي المعدات المتاحة"
          value={totalValue}
          change={`من ${MOCK_INVENTORY.reduce((s, i) => s + i.quantity, 0)} وحدة`}
          changeType="neutral"
          icon={Package}
          themeColor="cyan"
        />
        <StatCard
          title="المعدات قليلة الكمية"
          value={lowStockItems}
          change="تحتاج تجديد فوري"
          changeType="decrease"
          icon={AlertTriangle}
          themeColor="red"
        />
        <StatCard
          title="المعدات في الصيانة"
          value={maintenanceItems}
          change="تحت الإصلاح والتجديد"
          changeType="neutral"
          icon={Boxes}
          themeColor="amber"
        />
      </div>

      {/* ============= فلاتر البحث | Search & Filters ============= */}
      <GlassCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* البحث */}
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              🔍 بحث عن معدة
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالاسم أو الفئة..."
                className="w-full bg-obsidian-900/50 border border-obsidian-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
              />
            </div>
          </div>

          {/* الفئة */}
          <div>
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              📂 الفئة
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* الترتيب */}
          <div>
            <label className="text-xs font-bold text-gray-400 mb-2 block">
              🔤 الترتيب
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-obsidian-900/50 border border-obsidian-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30"
            >
              <option value="name">الاسم</option>
              <option value="availability">التوفر</option>
              <option value="condition">الحالة</option>
            </select>
          </div>

          {/* زر الإضافة */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyber-cyan text-obsidian-950 font-semibold text-sm hover:shadow-lg hover:shadow-cyber-cyan/50 transition-all">
            <Plus className="w-4 h-4" />
            إضافة معدة
          </button>
        </div>
      </GlassCard>

      {/* ============= جدول المعدات | Equipment Table ============= */}
      <GlassCard className="overflow-hidden" hoverable={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-obsidian-900/50 border-b border-obsidian-800">
                <th className="px-6 py-4 text-right font-bold text-gray-300">المعدة</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الفئة</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">المتاح</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الحالة</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الموقع</th>
                <th className="px-6 py-4 text-right font-bold text-gray-300">الحالة الفيزيائية</th>
                <th className="px-6 py-4 text-center font-bold text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => {
                  const availPercentage = calculateAvailabilityPercentage(
                    item.available,
                    item.quantity
                  );
                  const statusColor = {
                    "جاهز": "text-emerald-glow bg-emerald-glow/10",
                    "في الصيانة": "text-laser-amber bg-laser-amber/10",
                    "معطل": "text-neon-red bg-neon-red/10",
                  };
                  const conditionColor = {
                    "ممتاز": "text-cyber-cyan",
                    "جيد": "text-emerald-glow",
                    "متوسط": "text-laser-amber",
                    "ضعيف": "text-neon-red",
                  };

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-obsidian-800/50 hover:bg-obsidian-900/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.category}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-cyber-cyan">
                            {item.available}/{item.quantity}
                          </p>
                          <div className="w-16 h-1.5 bg-obsidian-800 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                availPercentage > 60
                                  ? "bg-emerald-glow"
                                  : availPercentage > 30
                                  ? "bg-laser-amber"
                                  : "bg-neon-red"
                              }`}
                              style={{ width: `${availPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{item.location}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold text-sm ${conditionColor[item.condition]}`}
                        >
                          {item.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-cyber-cyan/10 rounded-lg transition-colors text-cyber-cyan" title="تعديل">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-neon-red/10 rounded-lg transition-colors text-neon-red" title="حذف">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <p>لا توجد نتائج مطابقة للبحث</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* ============= معلومات إضافية | Additional Info ============= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* معدات حرجة */}
        <GlassCard className="p-6" hoverable={false}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            ⚠️ معدات بكمية حرجة
          </h3>
          <div className="space-y-3">
            {MOCK_INVENTORY.filter(
              (item) => (item.available / item.quantity) * 100 < 30
            ).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-neon-red/5 border border-neon-red/30"
              >
                <div>
                  <p className="font-semibold text-white text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-1">متبقي: {item.available} وحدة فقط</p>
                </div>
                <button className="px-3 py-1 rounded-lg bg-neon-red/20 text-neon-red text-xs font-bold hover:bg-neon-red/30 transition-colors">
                  طلب
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* معدات قيد الصيانة */}
        <GlassCard className="p-6" hoverable={false}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🔧 معدات قيد الصيانة
          </h3>
          <div className="space-y-3">
            {MOCK_INVENTORY.filter((item) => item.status === "في الصيانة").map(
              (item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-laser-amber/5 border border-laser-amber/30"
                >
                  <div>
                    <p className="font-semibold text-white text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">الموقع: {item.location}</p>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-laser-amber/20 text-laser-amber text-xs font-bold hover:bg-laser-amber/30 transition-colors">
                    تفاصيل
                  </button>
                </div>
              )
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
