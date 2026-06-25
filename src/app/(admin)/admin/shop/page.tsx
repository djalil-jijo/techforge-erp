"use client";

import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Search,
  ToggleLeft,
  ToggleRight,
  ShoppingBag,
  TrendingUp,
  Eye,
  X,
  Save,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PRODUCTS, CATEGORIES, formatPrice, Product, ProductCategory } from "@/lib/shopData";
import { cn } from "@/lib/utils";

export default function AdminShopPage() {
  const [products, setProducts] = useState<(Product & { active: boolean })[]>(
    PRODUCTS.map((p) => ({ ...p, active: true }))
  );
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<(Product & { active: boolean }) | null>(null);
  const [form, setForm] = useState({
    name: "",
    shortDesc: "",
    description: "",
    price: "",
    stock: "",
    category: CATEGORIES[0] as ProductCategory,
    image: "📦",
    badge: "",
  });

  const filtered = products.filter(
    (p) =>
      search === "" ||
      p.name.includes(search) ||
      p.category.includes(search)
  );

  const stats = {
    total: products.length,
    active: products.filter((p) => p.active).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  };

  const toggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm({
      name: "", shortDesc: "", description: "",
      price: "", stock: "", category: CATEGORIES[0],
      image: "📦", badge: "",
    });
    setShowModal(true);
  };

  const openEdit = (product: (typeof products)[0]) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      shortDesc: product.shortDesc,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      category: product.category,
      image: product.image,
      badge: product.badge || "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.stock) return;
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                name: form.name,
                shortDesc: form.shortDesc,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                category: form.category,
                image: form.image,
                badge: form.badge || undefined,
              }
            : p
        )
      );
    } else {
      const newProduct: Product & { active: boolean } = {
        id: "p" + Date.now(),
        name: form.name,
        shortDesc: form.shortDesc,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        image: form.image,
        badge: form.badge || undefined,
        active: true,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowModal(false);
  };

  const categoryColors: Record<string, string> = {
    "روبوتيك": "text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30",
    "إلكترونيك": "text-neon-purple bg-neon-purple/10 border-neon-purple/30",
    "طباعة ثلاثية الأبعاد": "text-laser-amber bg-laser-amber/10 border-laser-amber/30",
    "لوحات تحكم": "text-emerald-glow bg-emerald-glow/10 border-emerald-glow/30",
    "أدوات تعليمية": "text-blue-400 bg-blue-400/10 border-blue-400/30",
    "ديكور تقني": "text-pink-400 bg-pink-400/10 border-pink-400/30",
  };

  return (
    <div dir="rtl" className="p-6 md:p-8 space-y-8">
      {/* العنوان */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">إدارة المتجر الإلكتروني</h1>
          <p className="text-sm text-gray-400 mt-1">منتجات FabLab TechForge المعروضة للبيع</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/shop"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-obsidian-700 text-gray-400 hover:text-white hover:border-obsidian-600 transition-all text-sm"
          >
            <Eye className="w-4 h-4" />
            معاينة المتجر
          </a>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/25 transition-all text-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج
          </button>
        </div>
      </div>

      {/* إحصائيات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي المنتجات", value: stats.total, icon: Package, color: "text-cyber-cyan" },
          { label: "منتجات نشطة", value: stats.active, icon: ShoppingBag, color: "text-emerald-glow" },
          { label: "نفد مخزونها", value: stats.outOfStock, icon: TrendingUp, color: "text-red-400" },
          { label: "قيمة المخزون", value: formatPrice(stats.totalValue), icon: TrendingUp, color: "text-laser-amber" },
        ].map(({ label, value, icon: Icon, color }) => (
          <GlassCard key={label} className="p-4" hoverable={false}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{label}</span>
              <Icon className={cn("w-4 h-4", color)} />
            </div>
            <p className={cn("text-xl font-black", color)}>{value}</p>
          </GlassCard>
        ))}
      </div>

      {/* شريط البحث */}
      <div className="relative max-w-md">
        <Search className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث عن منتج..."
          className="w-full bg-obsidian-900 border border-obsidian-800 rounded-xl py-2.5 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm"
        />
      </div>

      {/* جدول المنتجات */}
      <GlassCard className="p-0 overflow-hidden" hoverable={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-obsidian-800 bg-obsidian-900/50">
                {["المنتج", "الفئة", "السعر", "المخزون", "الحالة", "الإجراءات"].map((h) => (
                  <th key={h} className="text-right text-xs text-gray-500 font-bold px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => (
                <tr
                  key={product.id}
                  className={cn(
                    "border-b border-obsidian-800/50 hover:bg-obsidian-900/30 transition-colors",
                    !product.active && "opacity-50"
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-obsidian-900 border border-obsidian-800 flex items-center justify-center text-2xl flex-shrink-0">
                        {product.image}
                      </div>
                      <div>
                        <p className="font-bold text-white">{product.name}</p>
                        {product.badge && (
                          <span className="text-xs text-laser-amber">{product.badge}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs px-2 py-1 rounded-lg border font-semibold", categoryColors[product.category])}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-cyber-cyan">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      "font-bold",
                      product.stock === 0 ? "text-red-400" : product.stock < 5 ? "text-laser-amber" : "text-emerald-glow"
                    )}>
                      {product.stock} قطعة
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleActive(product.id)}
                      className="flex items-center gap-1.5"
                    >
                      {product.active ? (
                        <><ToggleRight className="w-6 h-6 text-emerald-glow" /><span className="text-xs text-emerald-glow">نشط</span></>
                      ) : (
                        <><ToggleLeft className="w-6 h-6 text-gray-600" /><span className="text-xs text-gray-600">معطّل</span></>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 rounded-lg bg-obsidian-900 border border-obsidian-800 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 rounded-lg bg-obsidian-900 border border-obsidian-800 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>لا توجد منتجات تطابق البحث</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* مودال الإضافة/التعديل */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="w-full max-w-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto" hoverable={false}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الاسم */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm text-gray-300">اسم المنتج *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                />
              </div>
              {/* الوصف المختصر */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm text-gray-300">الوصف المختصر</label>
                <input
                  type="text"
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                />
              </div>
              {/* السعر */}
              <div className="space-y-1">
                <label className="text-sm text-gray-300">السعر (دج) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                />
              </div>
              {/* المخزون */}
              <div className="space-y-1">
                <label className="text-sm text-gray-300">الكمية في المخزون *</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                />
              </div>
              {/* الفئة */}
              <div className="space-y-1">
                <label className="text-sm text-gray-300">الفئة</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* الإيموجي */}
              <div className="space-y-1">
                <label className="text-sm text-gray-300">إيموجي المنتج</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                />
              </div>
              {/* الشارة */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm text-gray-300">الشارة (اختياري مثل: جديد، الأكثر مبيعاً...)</label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm"
                />
              </div>
              {/* الوصف الكامل */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm text-gray-300">الوصف التفصيلي</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-neon-purple text-obsidian-950 font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editProduct ? "حفظ التعديلات" : "إضافة المنتج"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-xl border border-obsidian-700 text-gray-400 hover:text-white transition-all"
              >
                إلغاء
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
