"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  LayoutDashboard,
  Boxes,
  Cpu,
  FolderGit2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const cards = [
    {
      title: "مركز القيادة التنفيذي",
      desc: "قراءات فورية للإيرادات وتتبع التوزيعات وإشارات النظام النشطة",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      color: "cyan",
      textColor: "text-cyber-cyan",
      glowClass: "hover:border-cyber-cyan/40",
    },
    {
      title: "المستودع الرقمي",
      desc: "سجل مركزي للمتحكمات الدقيقة والمستشعرات والطابعات ثلاثية الأبعاد والأدوات",
      icon: Boxes,
      path: "/admin/inventory",
      color: "amber",
      textColor: "text-laser-amber",
      glowClass: "hover:border-laser-amber/40",
    },
    {
      title: "مركز العهدة",
      icon: Cpu,
      desc: "تفويض ومراقبة وتسجيل تسليم العتاد التكنولوجي والفحوصات والعودات",
      path: "/admin/inventory/assignments",
      color: "purple",
      textColor: "text-neon-purple",
      glowClass: "hover:border-neon-purple/40",
    },
    {
      title: "لوحة مشاريع Kanban",
      icon: FolderGit2,
      desc: "تصور لوحات الابتكار والمشاريع الطلابية وتتبع التقدم والتدفقات الأولية",
      path: "/admin/projects",
      color: "emerald",
      textColor: "text-emerald-glow",
      glowClass: "hover:border-emerald-glow/40",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-between overflow-x-hidden relative">
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
              ERP
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-gray-500 font-bold bg-obsidian-900 border border-obsidian-850 px-3 py-1.5 rounded-xl">
          بوابة النظام الموحدة
        </span>
      </header>

      {/* ============= المحتوى الرئيسي | Main Content ============= */}
      <main className="flex-1 px-8 md:px-16 py-16 space-y-12">
        {/* العنوان */}
        <div className="text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5">
            <Sparkles className="w-4 h-4 text-cyber-cyan" />
            <span className="text-sm font-semibold text-cyber-cyan">
              نظام إدارة متكامل عصري
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            🚀 <span className="bg-gradient-to-r from-cyber-cyan via-neon-purple to-laser-amber bg-clip-text text-transparent">
              TechForge ERP
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            نظام إدارة شامل (ERP) لمركز تدريس متخصص في الروبوتيك والإلكترونيات والتقنيات الحديثة مع خدمات FabLab
          </p>
        </div>

        {/* البطاقات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.path} href={card.path}>
                <GlassCard
                  glowColor={card.color as any}
                  className={cn(
                    "p-8 h-full transition-all duration-300 group",
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
                                         "rgba(0, 255, 136, 0.1)",
                        borderColor: card.color === "cyan" ? "rgba(0, 217, 255, 0.3)" :
                                    card.color === "amber" ? "rgba(255, 184, 0, 0.3)" :
                                    card.color === "purple" ? "rgba(217, 70, 239, 0.3)" :
                                    "rgba(0, 255, 136, 0.3)"
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-obsidian-800/50 group-hover:border-obsidian-700 transition-colors">
                    <span className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                      اضغط للدخول
                    </span>
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-all transform",
                      card.textColor,
                      "group-hover:translate-x-1"
                    )} />
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* معلومات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 pt-8">
          {[
            {
              icon: "📊",
              title: "لوحات تحكم حية",
              desc: "رسوم بيانية وإحصائيات فورية للنظام",
            },
            {
              icon: "🔐",
              title: "آمن وموثوق",
              desc: "نظام حماية متقدم لجميع البيانات",
            },
            {
              icon: "🌍",
              title: "دعم ثنائي اللغة",
              desc: "عربي وإنجليزي مع دعم كامل",
            },
          ].map((feature, idx) => (
            <GlassCard key={idx} className="p-6">
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
          © 2026 TechForge ERP • مركز تدريس متخصص في الروبوتيك والإلكترونيات والتقنيات الحديثة
        </p>
      </footer>
    </div>
  );
}
