"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Filter,
  ArrowRight,
  Star,
  Package,
  Sparkles,
  Tag,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PRODUCTS, CATEGORIES, formatPrice, ProductCategory } from "@/lib/shopData";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "الكل">("الكل");
  const { totalItems, addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.name.includes(searchQuery) ||
        p.shortDesc.includes(searchQuery) ||
        p.category.includes(searchQuery);
      const matchCat =
        selectedCategory === "الكل" || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (e: React.MouseEvent, product: typeof PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  const categoryColors: Record<string, string> = {
    "روبوتيك": "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",
    "إلكترونيك": "text-neon-purple border-neon-purple/40 bg-neon-purple/10",
    "طباعة ثلاثية الأبعاد": "text-laser-amber border-laser-amber/40 bg-laser-amber/10",
    "لوحات تحكم": "text-emerald-glow border-emerald-glow/40 bg-emerald-glow/10",
    "أدوات تعليمية": "text-blue-400 border-blue-400/40 bg-blue-400/10",
    "ديكور تقني": "text-pink-400 border-pink-400/40 bg-pink-400/10",
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground" dir="rtl">
      {/* ====== الخلفية الديكورية ====== */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/4 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-laser-amber/3 rounded-full blur-[100px]" />
      </div>

      {/* ====== شريط التنقل العلوي ====== */}
      <header className="sticky top-0 z-50 h-20 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center">
              <span className="text-cyber-cyan font-bold text-xl font-mono">T</span>
            </div>
            <div>
              <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
              <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">
                المتجر الإلكتروني
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            الرئيسية
          </Link>
          <Link href="/about" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            عن الجمعية
          </Link>
          <Link href="/order-service" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            خدمات FabLab
          </Link>
        </nav>

        <Link href="/shop/cart">
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-all font-semibold text-sm">
            <ShoppingCart className="w-5 h-5" />
            <span>السلة</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-cyber-cyan text-obsidian-950 text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </header>

      <main className="relative z-10 px-6 md:px-12 py-10 max-w-7xl mx-auto space-y-10">

        {/* ====== Hero القسم ====== */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-laser-amber/30 bg-laser-amber/5">
            <Sparkles className="w-4 h-4 text-laser-amber" />
            <span className="text-sm font-semibold text-laser-amber">منتجات مصنوعة يدوياً في FabLab TechForge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            متجر
            <span className="bg-gradient-to-r from-cyber-cyan via-neon-purple to-laser-amber bg-clip-text text-transparent"> TechForge</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            اقتنِ منتجات تقنية أصيلة مصممة ومصنوعة بأيدي طلابنا وأساتذتنا في مختبر FabLab. كل قطعة تحكاية إبداع.
          </p>
        </div>

        {/* ====== شريط البحث والفلترة ====== */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-obsidian-900 border border-obsidian-800 rounded-xl py-3 pr-12 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory("الكل")}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-xl border text-sm font-semibold transition-all",
                selectedCategory === "الكل"
                  ? "bg-cyber-cyan/15 border-cyber-cyan/50 text-cyber-cyan"
                  : "bg-obsidian-900 border-obsidian-800 text-gray-400 hover:text-white"
              )}
            >
              الكل
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-xl border text-sm font-semibold transition-all",
                  selectedCategory === cat
                    ? categoryColors[cat]
                    : "bg-obsidian-900 border-obsidian-800 text-gray-400 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ====== عدد النتائج ====== */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="text-cyber-cyan font-bold">{filtered.length}</span> منتج متاح
          </p>
          {selectedCategory !== "الكل" && (
            <button
              onClick={() => setSelectedCategory("الكل")}
              className="text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
            >
              إلغاء الفلتر
            </button>
          )}
        </div>

        {/* ====== شبكة المنتجات ====== */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Package className="w-16 h-16 text-gray-700 mx-auto" />
            <p className="text-gray-500 text-lg">لا توجد منتجات تطابق بحثك</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("الكل"); }}
              className="text-cyber-cyan text-sm underline"
            >
              إعادة ضبط البحث
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const catColor = categoryColors[product.category] || "text-gray-400";
              const isAdded = addedIds.includes(product.id);
              return (
                <Link key={product.id} href={`/shop/${product.id}`}>
                  <GlassCard className="p-0 overflow-hidden h-full flex flex-col group cursor-pointer hover:border-cyber-cyan/30 transition-all duration-300">
                    {/* صورة المنتج */}
                    <div className="relative h-40 bg-gradient-to-br from-obsidian-900 to-obsidian-950 flex items-center justify-center border-b border-obsidian-800 group-hover:from-obsidian-800 transition-all">
                      <span className="text-6xl">{product.image}</span>
                      {product.badge && (
                        <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-laser-amber/20 border border-laser-amber/40 text-laser-amber text-xs font-bold">
                          {product.badge}
                        </span>
                      )}
                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold">
                          آخر {product.stock} قطع
                        </span>
                      )}
                    </div>

                    {/* معلومات المنتج */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border", catColor)}>
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-laser-amber fill-laser-amber" />
                          <span className="text-xs text-gray-400">4.8</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-white text-sm leading-snug mb-1 group-hover:text-cyber-cyan transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1">
                        {product.shortDesc}
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-obsidian-800">
                        <div>
                          <p className="text-lg font-black text-cyber-cyan">{formatPrice(product.price)}</p>
                          <p className="text-xs text-gray-600">
                            {product.stock > 0 ? `${product.stock} متوفر` : "نفد المخزون"}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={product.stock === 0}
                          className={cn(
                            "p-2 rounded-xl border transition-all text-sm font-semibold",
                            isAdded
                              ? "bg-emerald-glow/20 border-emerald-glow/40 text-emerald-glow"
                              : product.stock === 0
                              ? "bg-obsidian-900 border-obsidian-800 text-gray-600 cursor-not-allowed"
                              : "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20"
                          )}
                        >
                          {isAdded ? "✓" : <ShoppingCart className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* ====== التذييل ====== */}
      <footer className="relative z-10 border-t border-obsidian-800 py-8 px-6 md:px-12 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 TechForge • منتجات FabLab المصنوعة يدوياً
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">الرئيسية</Link>
            <Link href="/order-service" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">خدمات FabLab</Link>
            <Link href="/shop/cart" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">السلة</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
