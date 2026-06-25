"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Cpu,
  Flame,
  Award,
  Users,
  Compass,
  ArrowLeft,
  Wrench,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-between overflow-x-hidden relative">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ============= Navigation Header ============= */}
      <header className="h-20 border-b border-obsidian-800 flex items-center justify-between px-8 md:px-16 z-10 bg-obsidian-950/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center pulse-cyan">
            <span className="text-cyber-cyan font-bold text-xl font-mono">T</span>
          </div>
          <div>
            <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
            <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">
              ERP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            الرئيسية
          </Link>
          <Link href="/order-service" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            خدمات FabLab
          </Link>
          <Link href="/login" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {/* ============= Main Layout ============= */}
      <main className="flex-1 px-8 md:px-16 py-12 max-w-6xl mx-auto w-full space-y-16 z-10">
        
        {/* Banner Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5">
            <Compass className="w-4 h-4 text-cyber-cyan" />
            <span className="text-sm font-semibold text-cyber-cyan">تعرّف على مركزنا التكنولوجي</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            عن مركز <span className="bg-gradient-to-r from-cyber-cyan via-neon-purple to-laser-amber bg-clip-text text-transparent">TechForge</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            نحن منارة تكنولوجية ومساحة تصنيع رقمي تهدف إلى تمكين الطلاب والمبتكرين في الجزائر من تحويل أفكارهم الهندسية إلى نماذج حقيقية واختراعات ملموسة في مجالات الروبوتات والبرمجيات الذكية والإلكترونيات الدقيقة.
          </p>
        </div>

        {/* The 3 Pillars / Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8 space-y-4 border border-obsidian-800" glowColor="cyan">
            <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. مسار الروبوتيات</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              تصميم وبناء روبوتات تفاعلية، وبرمجة المعالجات الدقيقة مثل Arduino و Raspberry Pi، بالإضافة إلى استكشاف خوارزميات تحديد المواقع والذكاء الاصطناعي في الحركة.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4 border border-obsidian-800" glowColor="amber">
            <div className="w-12 h-12 rounded-xl bg-laser-amber/10 border border-laser-amber/30 flex items-center justify-center text-laser-amber">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. الإلكترونيات واللحام</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              تجميع الدوائر المطبوعة (PCBs)، وتطوير الدوائر التناظرية والرقمية، وتدريبات مكثفة على اللحام الاحترافي وقراءة المخططات الإلكترونية وحل المشاكل التقنية.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4 border border-obsidian-800" glowColor="purple">
            <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. مساحة التصنيع FabLab</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              تحويل المخططات الرقمية ثلاثية الأبعاد إلى قطع حقيقية عبر طابعات 3D المتطورة بالمركز، وحفر المجسمات وتشكيل المعادن واللوحات الخشبية بواسطة آلات CNC.
            </p>
          </GlassCard>
        </div>

        {/* Features / Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">بيئة تدريب وتصنيع متكاملة</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              نؤمن في TechForge بأن المعرفة النظرية لا تكتمل بدون التطبيق العملي المستمر. لهذا السبب، وفرنا بنية تحتية متميزة تمزج بين المستودع الرقمي للأدوات الهندسية، وفصول التدريس التفاعلية، ومساحات التصنيع الرقمي المفتوحة.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-cyber-cyan font-bold">✓</div>
                <p className="text-sm text-gray-300">طاقم تدريس وخبرات معتمدة أكاديمياً وصناعياً.</p>
              </div>
              <div className="flex gap-3">
                <div className="text-cyber-cyan font-bold">✓</div>
                <p className="text-sm text-gray-300">معدات حية متاحة للطلاب طيلة فترة المشروعات.</p>
              </div>
              <div className="flex gap-3">
                <div className="text-cyber-cyan font-bold">✓</div>
                <p className="text-sm text-gray-300">رادار مستمر للمشاركة في الهاكاثونات والمسابقات الدولية والمحلية.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center space-y-2">
              <Users className="w-8 h-8 text-cyber-cyan mx-auto" />
              <p className="text-2xl font-black text-white">+500</p>
              <p className="text-xs text-gray-400">طالب متخرج</p>
            </div>
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-laser-amber mx-auto" />
              <p className="text-2xl font-black text-white">12+</p>
              <p className="text-xs text-gray-400">برنامجاً تدريبياً</p>
            </div>
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center space-y-2">
              <Cpu className="w-8 h-8 text-emerald-glow mx-auto" />
              <p className="text-2xl font-black text-white">+250</p>
              <p className="text-xs text-gray-400">مشروع ميكاترونكس</p>
            </div>
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center space-y-2">
              <Award className="w-8 h-8 text-neon-purple mx-auto" />
              <p className="text-2xl font-black text-white">10+</p>
              <p className="text-xs text-gray-400">جوائز وتكريمات</p>
            </div>
          </div>
        </div>

        {/* Back Link Button */}
        <div className="text-center pt-6">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all font-semibold text-sm cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              الرجوع للرئيسية
            </button>
          </Link>
        </div>

      </main>

      {/* ============= Footer ============= */}
      <footer className="border-t border-obsidian-800 py-8 px-8 md:px-16 text-center text-sm text-gray-500 z-10">
        <p>
          © 2026 TechForge ERP • مركز تدريس متخصص في الروبوتيك والإلكترونيات والتقنيات الحديثة
        </p>
      </footer>
    </div>
  );
}
