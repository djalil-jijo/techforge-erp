"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  Package,
  ShoppingBag,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopData";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const shipping = totalPrice > 5000 ? 0 : 500;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col" dir="rtl">
        {/* شريط التنقل */}
        <header className="h-16 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center">
              <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
            </div>
            <span className="font-extrabold text-white">TECHFORGE</span>
          </Link>
          <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة للمتجر
          </Link>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-10 text-center">
          <div className="w-24 h-24 rounded-full bg-obsidian-900 border border-obsidian-800 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">السلة فارغة</h2>
            <p className="text-gray-500">لم تضف أي منتجات بعد. تصفح المتجر وأضف ما يعجبك!</p>
          </div>
          <Link href="/shop">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-neon-purple text-obsidian-950 font-bold hover:opacity-90 transition-all flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              تسوق الآن
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground" dir="rtl">
      {/* الخلفية */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyber-cyan/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-neon-purple/4 rounded-full blur-[100px]" />
      </div>

      {/* شريط التنقل */}
      <header className="sticky top-0 z-50 h-16 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center">
            <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
          </div>
          <div>
            <span className="font-extrabold text-white">TECHFORGE</span>
            <span className="text-cyber-cyan text-xs font-mono block leading-none">سلة التسوق</span>
          </div>
        </Link>
        <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          متابعة التسوق
        </Link>
      </header>

      <main className="relative z-10 px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-white">
            سلة التسوق
            <span className="text-cyber-cyan mr-3 text-lg">({totalItems} منتج)</span>
          </h1>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            إفراغ السلة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قائمة المنتجات */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <GlassCard key={item.product.id} className="p-4" hoverable={false}>
                <div className="flex items-center gap-4">
                  {/* صورة المنتج */}
                  <Link href={`/shop/${item.product.id}`}>
                    <div className="w-20 h-20 rounded-xl bg-obsidian-900 border border-obsidian-800 flex items-center justify-center text-4xl flex-shrink-0 hover:border-cyber-cyan/40 transition-colors cursor-pointer">
                      {item.product.image}
                    </div>
                  </Link>

                  {/* معلومات المنتج */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${item.product.id}`}>
                      <h3 className="font-bold text-white text-sm hover:text-cyber-cyan transition-colors cursor-pointer truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">{item.product.category}</p>
                    <p className="text-cyber-cyan font-bold mt-1">{formatPrice(item.product.price)}</p>
                  </div>

                  {/* التحكم في الكمية */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400/70 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-white hover:bg-obsidian-700 transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-7 h-7 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-white hover:bg-obsidian-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-gray-300">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* ملخص الطلب */}
          <div className="space-y-4">
            <GlassCard className="p-5 space-y-4" hoverable={false}>
              <h2 className="text-lg font-bold text-white">ملخص الطلب</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>المجموع الفرعي ({totalItems} منتج)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>رسوم الشحن</span>
                  <span className={shipping === 0 ? "text-emerald-glow" : ""}>
                    {shipping === 0 ? "مجاني" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/20 rounded-lg px-3 py-1.5">
                    ✓ أهلاً بك! حصلت على شحن مجاني لأن طلبك يتجاوز 5,000 دج
                  </p>
                )}
                {shipping > 0 && (
                  <p className="text-xs text-gray-500 bg-obsidian-900 rounded-lg px-3 py-1.5">
                    أضف منتجات بقيمة {formatPrice(5000 - totalPrice)} للحصول على شحن مجاني
                  </p>
                )}
                <div className="border-t border-obsidian-800 pt-3 flex justify-between font-bold text-white">
                  <span>الإجمالي</span>
                  <span className="text-cyber-cyan text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/shop/checkout")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-neon-purple text-obsidian-950 font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                إتمام الطلب
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link href="/shop">
                <button className="w-full py-2 rounded-xl border border-obsidian-800 text-gray-400 hover:text-white text-sm transition-colors">
                  متابعة التسوق
                </button>
              </Link>
            </GlassCard>

            {/* ضمانات */}
            <GlassCard className="p-4 space-y-2" hoverable={false}>
              {[
                "✓ جودة مضمونة من FabLab TechForge",
                "✓ توصيل لجميع ولايات الجزائر",
                "✓ دفع عند الاستلام متاح",
                "✓ إرجاع خلال 7 أيام",
              ].map((item) => (
                <p key={item} className="text-xs text-gray-500">{item}</p>
              ))}
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
