"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  ArrowLeft,
  Package,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopData";
import { cn } from "@/lib/utils";

type PaymentMethod = "cod" | "bank";

interface FormData {
  fullName: string;
  phone: string;
  wilaya: string;
  address: string;
  notes: string;
  payment: PaymentMethod;
}

const WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة",
  "بشار", "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت",
  "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة",
  "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم",
  "المسيلة", "معسكر", "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج",
  "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة", "سوق أهراس",
  "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان",
  "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "إن صالح", "إن قزام",
  "توقرت", "جانت", "المغير", "المنيعة",
];

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    wilaya: "",
    address: "",
    notes: "",
    payment: "cod",
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(() => "TF-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const shipping = totalPrice > 5000 ? 0 : 500;
  const grandTotal = totalPrice + shipping;

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.fullName.trim()) errs.fullName = "الاسم الكامل مطلوب";
    if (!form.phone.trim() || !/^0[5-7]\d{8}$/.test(form.phone)) errs.phone = "رقم الهاتف غير صحيح";
    if (!form.wilaya) errs.wilaya = "يرجى اختيار الولاية";
    if (!form.address.trim()) errs.address = "العنوان التفصيلي مطلوب";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
  };

  // صفحة التأكيد بعد الطلب
  if (submitted) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-6" dir="rtl">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-glow/5 rounded-full blur-[120px]" />
        </div>
        <GlassCard className="max-w-lg w-full p-10 text-center space-y-6" hoverable={false}>
          <div className="w-20 h-20 rounded-full bg-emerald-glow/10 border-2 border-emerald-glow/40 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-emerald-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white mb-2">تم استلام طلبك! 🎉</h1>
            <p className="text-gray-400">شكراً لاختيارك منتجات TechForge FabLab</p>
          </div>
          <div className="bg-obsidian-900 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">رقم الطلب:</span>
              <span className="text-cyber-cyan font-bold font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الاسم:</span>
              <span className="text-white">{form.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الولاية:</span>
              <span className="text-white">{form.wilaya}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">طريقة الدفع:</span>
              <span className="text-white">{form.payment === "cod" ? "دفع عند الاستلام" : "تحويل بنكي"}</span>
            </div>
            <div className="flex justify-between border-t border-obsidian-800 pt-2">
              <span className="text-gray-400">إجمالي الطلب:</span>
              <span className="text-cyber-cyan font-bold">{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            سيتصل بك فريقنا على الرقم <span className="text-white">{form.phone}</span> خلال 24 ساعة لتأكيد الطلب وترتيب التسليم.
          </p>
          <div className="flex gap-3">
            <Link href="/shop" className="flex-1">
              <button className="w-full py-3 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-bold hover:bg-cyber-cyan/20 transition-all text-sm">
                متابعة التسوق
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 rounded-xl border border-obsidian-800 text-gray-400 font-bold hover:text-white transition-all text-sm">
                الصفحة الرئيسية
              </button>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-6" dir="rtl">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-xl font-bold">السلة فارغة</p>
          <Link href="/shop">
            <button className="px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan rounded-xl font-semibold hover:bg-cyber-cyan/20 transition-all">
              تسوق الآن
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground" dir="rtl">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-neon-purple/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-cyber-cyan/4 rounded-full blur-[100px]" />
      </div>

      {/* شريط التنقل */}
      <header className="sticky top-0 z-50 h-16 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center">
            <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
          </div>
          <div>
            <span className="font-extrabold text-white">TECHFORGE</span>
            <span className="text-neon-purple text-xs font-mono block leading-none">إتمام الطلب</span>
          </div>
        </Link>
        <Link href="/shop/cart" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          العودة للسلة
        </Link>
      </header>

      <main className="relative z-10 px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* نموذج البيانات */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* معلومات التوصيل */}
            <GlassCard className="p-6 space-y-5" hoverable={false}>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyber-cyan" />
                معلومات التوصيل
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* الاسم الكامل */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                    <User className="w-3 h-3" /> الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="أحمد بن علي"
                    className={cn(
                      "w-full bg-obsidian-900 border rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm",
                      errors.fullName ? "border-red-500/50" : "border-obsidian-700"
                    )}
                  />
                  {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
                </div>

                {/* الهاتف */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0551234567"
                    dir="ltr"
                    className={cn(
                      "w-full bg-obsidian-900 border rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm text-right",
                      errors.phone ? "border-red-500/50" : "border-obsidian-700"
                    )}
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                </div>
              </div>

              {/* الولاية */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-300">الولاية *</label>
                <select
                  value={form.wilaya}
                  onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                  className={cn(
                    "w-full bg-obsidian-900 border rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm",
                    errors.wilaya ? "border-red-500/50" : "border-obsidian-700"
                  )}
                >
                  <option value="" disabled>-- اختر الولاية --</option>
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                {errors.wilaya && <p className="text-xs text-red-400">{errors.wilaya}</p>}
              </div>

              {/* العنوان */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-300">العنوان التفصيلي *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="رقم المنزل، الشارع، الحي..."
                  rows={3}
                  className={cn(
                    "w-full bg-obsidian-900 border rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm resize-none",
                    errors.address ? "border-red-500/50" : "border-obsidian-700"
                  )}
                />
                {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
              </div>

              {/* ملاحظات */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-300">ملاحظات إضافية (اختياري)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="أي تعليمات خاصة للتوصيل..."
                  rows={2}
                  className="w-full bg-obsidian-900 border border-obsidian-700 rounded-xl py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 transition-colors text-sm resize-none"
                />
              </div>
            </GlassCard>

            {/* طريقة الدفع */}
            <GlassCard className="p-6 space-y-4" hoverable={false}>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neon-purple" />
                طريقة الدفع
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: "cod" as PaymentMethod,
                    icon: Banknote,
                    title: "دفع عند الاستلام",
                    desc: "ادفع نقداً عند وصول طلبك",
                  },
                  {
                    id: "bank" as PaymentMethod,
                    icon: CreditCard,
                    title: "تحويل بنكي / CCP",
                    desc: "تحويل مسبق قبل الشحن",
                  },
                ].map((method) => {
                  const Icon = method.icon;
                  const isSelected = form.payment === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setForm({ ...form, payment: method.id })}
                      className={cn(
                        "p-4 rounded-xl border text-right transition-all",
                        isSelected
                          ? "border-cyber-cyan/50 bg-cyber-cyan/10"
                          : "border-obsidian-700 bg-obsidian-900 hover:border-obsidian-600"
                      )}
                    >
                      <Icon className={cn("w-6 h-6 mb-2", isSelected ? "text-cyber-cyan" : "text-gray-400")} />
                      <p className={cn("font-bold text-sm", isSelected ? "text-cyber-cyan" : "text-white")}>
                        {method.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{method.desc}</p>
                    </button>
                  );
                })}
              </div>

              {form.payment === "bank" && (
                <div className="bg-obsidian-900 rounded-xl p-4 text-sm text-gray-400 space-y-1">
                  <p className="font-bold text-white">معلومات الحساب البنكي:</p>
                  <p>الاسم: جمعية TechForge للتكنولوجيا</p>
                  <p>رقم الحساب CCP: <span className="font-mono text-cyber-cyan">1234567890 / 16</span></p>
                  <p>يرجى إرسال وصل التحويل على WhatsApp بعد الدفع</p>
                </div>
              )}
            </GlassCard>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-neon-purple text-obsidian-950 font-black text-base hover:opacity-90 transition-all"
            >
              تأكيد الطلب ← 
            </button>
          </form>

          {/* ملخص الطلب */}
          <div className="lg:col-span-2 space-y-4">
            <GlassCard className="p-5 space-y-4" hoverable={false}>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-laser-amber" />
                ملخص الطلب ({totalItems} منتج)
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-obsidian-900 border border-obsidian-800 flex items-center justify-center text-xl flex-shrink-0">
                      {item.product.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-cyber-cyan flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-obsidian-800 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>المجموع الفرعي</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>الشحن</span>
                  <span className={shipping === 0 ? "text-emerald-glow" : ""}>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-white border-t border-obsidian-800 pt-2">
                  <span>الإجمالي النهائي</span>
                  <span className="text-cyber-cyan text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
