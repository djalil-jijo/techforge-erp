"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Boxes,
  ArrowRight,
  Sparkles,
  Trophy,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const cards = [
    {
      title: "لوحة الإشراف الإداري",
      desc: "إدارة البيانات الأساسية، الفواتير، تدقيق تقارير الحصص، ومراقبة تيسير المخزون التكنولوجي للمركز.",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      color: "cyan",
      textColor: "text-cyber-cyan",
      glowClass: "hover:border-cyber-cyan/40",
    },
    {
      title: "بوابة الطلاب وأولياء الأمور",
      desc: "تتبع مؤشرات التقدم المهاري، كشوف الدرجات، الجداول الدراسية، والشهادات المكتسبة مع تفاعلات الـ FabLab.",
      icon: Users,
      path: "/portal/dashboard",
      color: "purple",
      textColor: "text-neon-purple",
      glowClass: "hover:border-neon-purple/40",
    },
    {
      title: "فضاء الأساتذة والمشرفين",
      desc: "تسجيل نسب حضور الطلاب، رصد تقييمات الامتحانات، وإدارة العهد وتحديث تقارير العتاد اليومية.",
      icon: BookOpen,
      path: "/teacher/dashboard",
      color: "emerald",
      textColor: "text-emerald-glow",
      glowClass: "hover:border-emerald-glow/40",
    },
    {
      title: "شباك طلبات خدمات FabLab",
      desc: "شباك حجز خدمات التصنيع الرقمي المباشر: طباعة 3D ثلاثية المحاور، حفر الدوائر والأكريليك بآلة CNC.",
      icon: Boxes,
      path: "/order-service",
      color: "amber",
      textColor: "text-laser-amber",
      glowClass: "hover:border-laser-amber/40",
    },
    {
      title: "متجر TechForge الإلكتروني",
      desc: "اقتنِ منتجات تقنية أصيلة مصنوعة يدوياً في FabLab: روبوتات، لوحات تحكم، أدوات تعليمية، وديكور تقني.",
      icon: ShoppingBag,
      path: "/shop",
      color: "pink",
      textColor: "text-pink-400",
      glowClass: "hover:border-pink-400/40",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-between overflow-x-hidden relative" dir="rtl">
      {/* ============= خلفيات ديكوريتية | Background Orbs ============= */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ============= رأس التنقل | Navigation Header ============= */}
      <header className="h-20 border-b border-obsidian-800 flex items-center justify-between px-8 md:px-16 z-10 bg-obsidian-950/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center pulse-cyan">
            <span className="text-cyber-cyan font-bold text-xl font-mono">T</span>
          </div>
          <div>
            <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
            <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">
              الجمعية والنادي
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/about" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            عن الجمعية والنادي
          </Link>
          <Link href="/order-service" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            خدمات FabLab
          </Link>
          <Link href="/shop" className="text-sm font-semibold text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-1">
            <ShoppingBag className="w-4 h-4" />
            المتجر
          </Link>
          <Link href="/register" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            تسجيل الطلاب
          </Link>
          <Link href="/login" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {/* ============= المحتوى الرئيسي | Main Content ============= */}
      <main className="flex-1 px-8 md:px-16 py-16 space-y-16">
        
        {/* ============= قسم الترحيب الرئيسي | Hero Section ============= */}
        <div className="text-center space-y-6 z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5">
            <Sparkles className="w-4 h-4 text-cyber-cyan" />
            <span className="text-sm font-semibold text-cyber-cyan">
              المنصة الرقمية الموحدة لجمعية ونادي TechForge
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            بوابة الإبداع العلمي والابتكار
            <span className="block bg-gradient-to-r from-cyber-cyan via-neon-purple to-laser-amber bg-clip-text text-transparent mt-2">
              جمعية ونادي TechForge للتقنيات الحديثة
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            مساحة تدريبية وتصنيعية متكاملة تمكن الشباب والمبتكرين من تحويل الأفكار الهندسية إلى مشاريع ملموسة ونماذج حقيقية باستخدام تقنيات الروبوتيات والإلكترونيات والتصنيع الرقمي.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link href="/register">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-neon-purple text-obsidian-950 font-bold hover:shadow-lg hover:shadow-cyber-cyan/20 transition-all cursor-pointer">
                سجل معنا الآن كطالب
              </button>
            </Link>
            <Link href="/about">
              <button className="px-6 py-3 rounded-xl border border-obsidian-850 bg-obsidian-900/50 text-white font-bold hover:bg-obsidian-800/55 transition-all cursor-pointer">
                اكتشف المسارات الأكاديمية
              </button>
            </Link>
          </div>
        </div>

        {/* ============= قسم التعريف بالجمعية والنادي | Association & Club Intro ============= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
          {/* كارت الجمعية */}
          <GlassCard className="p-8 space-y-4 border border-obsidian-800/80" glowColor="cyan" hoverable={false}>
            <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">الجمعية العلمية الوطنية للابتكار</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              هي منظمة علمية غير ربحية تهدف إلى نشر الثقافة الرقمية وتمكين الشباب والطلاب الجزائريين من التخصص في مجالات الذكاء الاصطناعي، الميكاترونكس، وتكنولوجيا التعليم. تسعى الجمعية إلى بناء جسر بين الدراسة الأكاديمية والتطبيق العملي الصناعي عبر توفير بيئة تعليمية متكاملة وتسهيل الوصول للأدوات الهندسية النادرة والمكلفة.
            </p>
            <div className="pt-2">
              <span className="text-xs text-cyber-cyan font-mono font-bold">✓ ترخيص وطني معتمد • ✓ رعاية ومواكبة للمشاريع الناشئة</span>
            </div>
          </GlassCard>

          {/* كارت النادي */}
          <GlassCard className="p-8 space-y-4 border border-obsidian-800/80" glowColor="purple" hoverable={false}>
            <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">نادي صناع التكنولوجيا (TechForge Club)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              هو الذراع الطلابي والتفاعلي للجمعية، يضم كوكبة من الطلاب والشغوفين بالابتكار التكنولوجي. يقود أعضاء النادي الأنشطة الأسبوعية وورش العمل التطبيقية، ويبنون مشاريع جماعية للمشاركة في الهاكاثونات والمسابقات الوطنية والدولية للروبوتات (مثل كأس الجزائر للروبوتات ومسابقة Eurobot العالمية)، مع تنمية روح الفريق والتعلم التعاوني المستمر.
            </p>
            <div className="pt-2">
              <span className="text-xs text-neon-purple font-mono font-bold">✓ ورش عمل أسبوعية • ✓ فرق تنافسية في مسابقات الروبوتيات</span>
            </div>
          </GlassCard>
        </div>

        {/* ============= روابط الدخول لأقسام المنصة | Portal Entry Nodes ============= */}
        <div className="space-y-6 relative">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">أقسام المنصة الرقمية الموحدة</h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              اختر الواجهة المخصصة لدورك لمتابعة الحصص والمعدات والمهام الموكلة إليك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.path} href={card.path}>
                  <GlassCard
                    glowColor={card.color as any}
                    className={cn(
                      "p-8 h-full transition-all duration-300 group cursor-pointer",
                      card.glowClass
                    )}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                          card.textColor,
                          "bg-opacity-10 border border-opacity-30"
                        )}
                        style={{
                          backgroundColor: card.color === "cyan" ? "rgba(0, 217, 255, 0.1)" :
                                           card.color === "amber" ? "rgba(255, 184, 0, 0.1)" :
                                           card.color === "purple" ? "rgba(217, 70, 239, 0.1)" :
                                           card.color === "pink" ? "rgba(244, 114, 182, 0.1)" :
                                           "rgba(0, 255, 136, 0.1)",
                          borderColor: card.color === "cyan" ? "rgba(0, 217, 255, 0.3)" :
                                      card.color === "amber" ? "rgba(255, 184, 0, 0.3)" :
                                      card.color === "purple" ? "rgba(217, 70, 239, 0.3)" :
                                      card.color === "pink" ? "rgba(244, 114, 182, 0.3)" :
                                      "rgba(0, 255, 136, 0.3)"
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-obsidian-800/50 group-hover:border-obsidian-700 transition-colors">
                      <span className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                        اضغط للدخول إلى القسم
                      </span>
                      <ArrowRight className={cn(
                        "w-5 h-5 transition-all transform",
                        card.textColor,
                        "group-hover:-translate-x-1"
                      )} />
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ============= إحصائيات عامة | Statistics ============= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative pt-8">
          {[
            {
              icon: "📊",
              title: "+500 طالب متخرج",
              desc: "كوادر شابة تدربت عملياً في ورشاتنا ودخلت سوق العمل أو بدأت ابتكارها الخاص.",
            },
            {
              icon: "🔐",
              title: "+250 مشروع ميكاترونكس",
              desc: "تم تصميمها وتصنيعها بالكامل داخل مختبر FabLab التابع للجمعية بأيدي الطلاب.",
            },
            {
              icon: "⚙️",
              title: "12+ برنامجاً تدريبياً",
              desc: "دورات مكثفة تغطي الروبوتيات، تجميع الدوائر المطبوعة، وإنترنت الأشياء والذكاء الاصطناعي.",
            },
          ].map((feature, idx) => (
            <GlassCard key={idx} className="p-6 border border-obsidian-800" hoverable={false}>
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </main>

      {/* ============= التذييل | Footer ============= */}
      <footer className="border-t border-obsidian-800 py-8 px-8 md:px-16 text-center text-sm text-gray-500 z-10">
        <p>
          © 2026 TechForge ERP • بوابة الجمعية العلمية للابتكار والتقنيات الحديثة ونادي صناع التكنولوجيا
        </p>
      </footer>
    </div>
  );
}
