"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Package,
  Minus,
  Plus,
  ChevronRight,
  Star,
  Shield,
  Truck,
  Tag,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { getProductById, PRODUCTS, formatPrice } from "@/lib/shopData";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const { addToCart, totalItems } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-xl font-bold">المنتج غير موجود</p>
          <Link href="/shop">
            <button className="px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan rounded-xl font-semibold hover:bg-cyber-cyan/20 transition-all">
              العودة للمتجر
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    "روبوتيك": "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10",
    "إلكترونيك": "text-neon-purple border-neon-purple/40 bg-neon-purple/10",
    "طباعة ثلاثية الأبعاد": "text-laser-amber border-laser-amber/40 bg-laser-amber/10",
    "لوحات تحكم": "text-emerald-glow border-emerald-glow/40 bg-emerald-glow/10",
    "أدوات تعليمية": "text-blue-400 border-blue-400/40 bg-blue-400/10",
    "ديكور تقني": "text-pink-400 border-pink-400/40 bg-pink-400/10",
  };
  const catColor = categoryColors[product.category] || "text-gray-400 border-gray-400/40";

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground" dir="rtl">
      {/* الخلفية */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-neon-purple/4 rounded-full blur-[120px]" />
      </div>

      {/* شريط التنقل */}
      <header className="sticky top-0 z-50 h-16 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/shop" className="hover:text-white transition-colors">المتجر</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white truncate max-w-48">{product.name}</span>
        </div>
        <Link href="/shop/cart">
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-all font-semibold text-sm">
            <ShoppingCart className="w-4 h-4" />
            <span>السلة</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-cyber-cyan text-obsidian-950 text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </header>

      <main className="relative z-10 px-6 md:px-12 py-10 max-w-6xl mx-auto space-y-12">
        {/* زر الرجوع */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          العودة إلى المتجر
        </Link>

        {/* قسم تفاصيل المنتج */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* صورة المنتج */}
          <GlassCard className="p-0 overflow-hidden" hoverable={false}>
            <div className="h-80 bg-gradient-to-br from-obsidian-900 to-obsidian-950 flex items-center justify-center">
              <span className="text-9xl">{product.image}</span>
            </div>
            {product.badge && (
              <div className="p-4 border-t border-obsidian-800 text-center">
                <span className="px-4 py-1 rounded-full bg-laser-amber/20 border border-laser-amber/40 text-laser-amber text-sm font-bold">
                  {product.badge}
                </span>
              </div>
            )}
          </GlassCard>

          {/* معلومات المنتج */}
          <div className="space-y-6">
            <div>
              <span className={cn("text-xs font-bold px-3 py-1 rounded-md border", catColor)}>
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-black text-white leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-laser-amber fill-laser-amber" />
                ))}
              </div>
              <span className="text-sm text-gray-400">4.8 (127 تقييم)</span>
            </div>

            <p className="text-gray-400 leading-relaxed">{product.description}</p>

            {/* المواصفات */}
            {product.specs && (
              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">المواصفات التقنية:</h3>
                <ul className="space-y-1">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* السعر والكمية */}
            <GlassCard className="p-5 space-y-4" hoverable={false}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-cyber-cyan">{formatPrice(product.price)}</p>
                  <p className={cn(
                    "text-sm font-semibold mt-1",
                    product.stock > 10 ? "text-emerald-glow" : product.stock > 0 ? "text-laser-amber" : "text-red-400"
                  )}>
                    {product.stock > 10 ? "✓ متوفر في المخزون" : product.stock > 0 ? `⚠ آخر ${product.stock} قطع` : "✗ نفد المخزون"}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-cyber-cyan/40" />
              </div>

              {/* الكمية */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-300">الكمية:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-white hover:bg-obsidian-700 transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center font-bold text-white">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    disabled={qty >= product.stock}
                    className="w-8 h-8 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-white hover:bg-obsidian-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">الإجمالي: {formatPrice(product.price * qty)}</span>
              </div>

              {/* أزرار الطلب */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                    added
                      ? "bg-emerald-glow/20 border border-emerald-glow/50 text-emerald-glow"
                      : product.stock === 0
                      ? "bg-obsidian-900 border border-obsidian-800 text-gray-600 cursor-not-allowed"
                      : "bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/25"
                  )}
                >
                  {added ? (
                    <><CheckCircle className="w-4 h-4" /> تمت الإضافة!</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> أضف إلى السلة</>
                  )}
                </button>
                <button
                  onClick={() => { handleAddToCart(); router.push("/shop/checkout"); }}
                  disabled={product.stock === 0}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyber-cyan to-neon-purple text-obsidian-950 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  اطلب الآن
                </button>
              </div>
            </GlassCard>

            {/* ضمانات */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: "جودة مضمونة من FabLab" },
                { icon: Truck, text: "توصيل لجميع ولايات الجزائر" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-obsidian-900/50 border border-obsidian-800">
                  <Icon className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                  <span className="text-xs text-gray-400">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* منتجات مشابهة */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rp) => (
                <Link key={rp.id} href={`/shop/${rp.id}`}>
                  <GlassCard className="p-4 cursor-pointer group hover:border-cyber-cyan/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-obsidian-900 border border-obsidian-800 flex items-center justify-center text-3xl flex-shrink-0">
                        {rp.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm truncate group-hover:text-cyber-cyan transition-colors">{rp.name}</p>
                        <p className="text-cyber-cyan font-bold text-sm mt-1">{formatPrice(rp.price)}</p>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-cyber-cyan transition-colors flex-shrink-0" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-obsidian-800 py-6 px-6 md:px-12 mt-10 text-center text-sm text-gray-500">
        © 2026 TechForge • منتجات FabLab المصنوعة يدوياً
      </footer>
    </div>
  );
}
