"use client";

import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Search,
  Eye,
  ChevronDown,
  ShoppingBag,
  Phone,
  MapPin,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatPrice } from "@/lib/shopData";
import { cn } from "@/lib/utils";

type OrderStatus = "جديد" | "قيد المعالجة" | "تم الشحن" | "مكتمل" | "ملغى";

interface ShopOrder {
  id: string;
  date: string;
  customer: string;
  phone: string;
  wilaya: string;
  address: string;
  items: { name: string; qty: number; price: number; image: string }[];
  total: number;
  payment: "cod" | "bank";
  status: OrderStatus;
}

const MOCK_ORDERS: ShopOrder[] = [
  {
    id: "TF-A1B2C3",
    date: "2026-06-25",
    customer: "أحمد بن علي",
    phone: "0551234567",
    wilaya: "الجزائر",
    address: "حي المرادية، شارع العربي بن مهيدي",
    items: [
      { name: "ذراع روبوتية مصغّرة - 4 محاور", qty: 1, price: 12500, image: "🦾" },
      { name: "كيت تعلم الإلكترونيك للمبتدئين", qty: 2, price: 5600, image: "🎓" },
    ],
    total: 23700,
    payment: "cod",
    status: "جديد",
  },
  {
    id: "TF-D4E5F6",
    date: "2026-06-24",
    customer: "فاطمة الزهراء مرابط",
    phone: "0661234567",
    wilaya: "وهران",
    address: "حي الأمير عبد القادر، عمارة 12",
    items: [
      { name: "لوحة توسعة IoT Shield - ESP32", qty: 3, price: 3800, image: "🖥️" },
    ],
    total: 11400,
    payment: "bank",
    status: "قيد المعالجة",
  },
  {
    id: "TF-G7H8I9",
    date: "2026-06-23",
    customer: "يوسف حمداش",
    phone: "0771234567",
    wilaya: "قسنطينة",
    address: "بلوار زيغود يوسف، رقم 5",
    items: [
      { name: "سيارة روبوتية تعليمية - Line Follower", qty: 1, price: 7200, image: "🏎️" },
      { name: "إطار ديكور تقني - TechForge Logo", qty: 2, price: 1800, image: "🏅" },
    ],
    total: 11300,
    payment: "cod",
    status: "تم الشحن",
  },
  {
    id: "TF-J1K2L3",
    date: "2026-06-22",
    customer: "رضا بوعبد الله",
    phone: "0551122334",
    wilaya: "سطيف",
    address: "حي الفارس، شارع الشهداء",
    items: [
      { name: "ساعة ذكية DIY - OLED + RTC", qty: 1, price: 2900, image: "⌚" },
    ],
    total: 3400,
    payment: "bank",
    status: "مكتمل",
  },
  {
    id: "TF-M4N5O6",
    date: "2026-06-21",
    customer: "سارة عيساوي",
    phone: "0661198765",
    wilaya: "بجاية",
    address: "تاسكريفت، شارع أول نوفمبر",
    items: [
      { name: "نموذج طباعة 3D مخصص", qty: 2, price: 1500, image: "🔷" },
    ],
    total: 3500,
    payment: "cod",
    status: "ملغى",
  },
];

const STATUS_STYLES: Record<OrderStatus, { color: string; icon: React.ElementType; bg: string }> = {
  "جديد": { color: "text-cyber-cyan", bg: "bg-cyber-cyan/10 border-cyber-cyan/30", icon: Clock },
  "قيد المعالجة": { color: "text-laser-amber", bg: "bg-laser-amber/10 border-laser-amber/30", icon: Package },
  "تم الشحن": { color: "text-neon-purple", bg: "bg-neon-purple/10 border-neon-purple/30", icon: Truck },
  "مكتمل": { color: "text-emerald-glow", bg: "bg-emerald-glow/10 border-emerald-glow/30", icon: CheckCircle },
  "ملغى": { color: "text-red-400", bg: "bg-red-400/10 border-red-400/30", icon: XCircle },
};

const ALL_STATUSES: OrderStatus[] = ["جديد", "قيد المعالجة", "تم الشحن", "مكتمل", "ملغى"];

export default function AdminShopOrdersPage() {
  const [orders, setOrders] = useState<ShopOrder[]>(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "الكل">("الكل");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      search === "" ||
      o.id.includes(search) ||
      o.customer.includes(search) ||
      o.wilaya.includes(search);
    const matchStatus = filterStatus === "الكل" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const stats = {
    new: orders.filter((o) => o.status === "جديد").length,
    processing: orders.filter((o) => o.status === "قيد المعالجة").length,
    shipped: orders.filter((o) => o.status === "تم الشحن").length,
    completed: orders.filter((o) => o.status === "مكتمل").length,
    totalRevenue: orders.filter((o) => o.status === "مكتمل").reduce((s, o) => s + o.total, 0),
  };

  return (
    <div dir="rtl" className="p-6 md:p-8 space-y-8">
      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-black text-white">طلبات المتجر</h1>
        <p className="text-sm text-gray-400 mt-1">متابعة وإدارة طلبات عملاء متجر TechForge</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "طلبات جديدة", value: stats.new, color: "text-cyber-cyan" },
          { label: "قيد المعالجة", value: stats.processing, color: "text-laser-amber" },
          { label: "تم الشحن", value: stats.shipped, color: "text-neon-purple" },
          { label: "مكتملة", value: stats.completed, color: "text-emerald-glow" },
          { label: "إيرادات المكتملة", value: formatPrice(stats.totalRevenue), color: "text-cyber-cyan" },
        ].map(({ label, value, color }) => (
          <GlassCard key={label} className="p-4" hoverable={false}>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={cn("text-lg font-black", color)}>{value}</p>
          </GlassCard>
        ))}
      </div>

      {/* البحث والفلترة */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم الطلب، الاسم، أو الولاية..."
            className="w-full bg-obsidian-900 border border-obsidian-800 rounded-xl py-2.5 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["الكل", ...ALL_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "px-3 py-2 rounded-xl border text-xs font-bold transition-all",
                filterStatus === s
                  ? s === "الكل"
                    ? "bg-cyber-cyan/15 border-cyber-cyan/40 text-cyber-cyan"
                    : cn(STATUS_STYLES[s as OrderStatus]?.bg, STATUS_STYLES[s as OrderStatus]?.color)
                  : "bg-obsidian-900 border-obsidian-800 text-gray-400 hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* قائمة الطلبات */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>لا توجد طلبات تطابق المعايير المحددة</p>
          </div>
        )}

        {filtered.map((order) => {
          const style = STATUS_STYLES[order.status];
          const StatusIcon = style.icon;
          const isExpanded = expandedId === order.id;

          return (
            <GlassCard key={order.id} className="p-0 overflow-hidden" hoverable={false}>
              {/* رأس الطلب */}
              <div
                className="p-5 flex items-center gap-4 flex-wrap cursor-pointer hover:bg-obsidian-900/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-white font-mono">{order.id}</span>
                    <span className="text-xs text-gray-500">{order.date}</span>
                    <span className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs font-bold",
                      style.bg, style.color
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="text-white font-semibold">{order.customer}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {order.wilaya}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {order.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-lg font-black text-cyber-cyan">{formatPrice(order.total)}</p>
                    <p className="text-xs text-gray-500">{order.payment === "cod" ? "💵 دفع عند الاستلام" : "🏦 تحويل بنكي"}</p>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-gray-500 transition-transform", isExpanded && "rotate-180")} />
                </div>
              </div>

              {/* تفاصيل الطلب */}
              {isExpanded && (
                <div className="border-t border-obsidian-800 p-5 space-y-5">
                  {/* المنتجات */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 mb-3">المنتجات المطلوبة:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-obsidian-900/50 rounded-xl p-3">
                          <span className="text-2xl">{item.image}</span>
                          <div className="flex-1">
                            <p className="text-sm text-white font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">الكمية: {item.qty}</p>
                          </div>
                          <p className="text-sm font-bold text-cyber-cyan">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* العنوان */}
                  <div className="bg-obsidian-900/50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">عنوان التوصيل:</p>
                    <p className="text-sm text-white">{order.address}، {order.wilaya}</p>
                  </div>

                  {/* تغيير الحالة */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-gray-400 font-semibold">تغيير الحالة:</span>
                    {ALL_STATUSES.map((s) => {
                      const st = STATUS_STYLES[s];
                      return (
                        <button
                          key={s}
                          onClick={() => updateStatus(order.id, s)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl border text-xs font-bold transition-all",
                            order.status === s
                              ? cn(st.bg, st.color)
                              : "bg-obsidian-900 border-obsidian-800 text-gray-500 hover:text-white"
                          )}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
