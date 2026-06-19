"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Cpu, LayoutDashboard, Boxes, FolderGit2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const cards = [
    {
      title: "Executive Command Center",
      desc: "Real-time revenue telemetry, track distributions, and active system signals.",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      color: "cyan",
      textColor: "text-cyber-cyan",
      glowClass: "hover:border-cyber-cyan/40",
    },
    {
      title: "The Hardware Vault",
      desc: "Centralized stock log of micro-controllers, sensors, 3D printers, and tools.",
      icon: Boxes,
      path: "/admin/inventory",
      color: "amber",
      textColor: "text-laser-amber",
      glowClass: "hover:border-laser-amber/40",
    },
    {
      title: "Custody Lease Hub",
      icon: Cpu,
      desc: "Authorize, monitor, and log student hardware lease handovers and check-ins.",
      path: "/admin/inventory/assignments",
      color: "purple",
      textColor: "text-neon-purple",
      glowClass: "hover:border-neon-purple/40",
    },
    {
      title: "Projects Kanban Board",
      icon: FolderGit2,
      desc: "Visualise student group innovation boards, progress tracking, and prototyping flows.",
      path: "/admin/projects",
      color: "emerald",
      textColor: "text-emerald-glow",
      glowClass: "hover:border-emerald-glow/40",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-between overflow-x-hidden relative">
      {/* Background Decorative Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="h-20 border-b border-obsidian-800 flex items-center justify-between px-8 md:px-16 z-10 bg-obsidian-950/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/35 flex items-center justify-center pulse-cyan">
            <span className="text-cyber-cyan font-bold text-xl font-mono">T</span>
          </div>
          <div>
            <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
            <span className="text-cyber-cyan text-xs font-mono block tracking-widest leading-none font-bold">ERP</span>
          </div>
        </div>

        <span className="text-xs font-mono text-gray-500 font-bold bg-obsidian-900 border border-obsidian-850 px-3 py-1.5 rounded-xl">
          SEC OPERATIONAL GATEWAY
        </span>
      </header>

      {/* Main Content Splash Area */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 z-10 flex-1 flex flex-col justify-center items-center text-center space-y-12">
        {/* Title Hero */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-bold text-cyber-cyan tracking-widest font-mono uppercase bg-cyber-cyan/10 border border-cyber-cyan/20 px-3 py-1 rounded-full">
            Autonomous Operating Core
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Elevate Your Tech Hub Operations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-neon-purple to-laser-amber">TechForge ERP</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A next-generation management deck customized for FabLabs, robotics schools, and technological innovation spaces.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl pt-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link key={idx} href={card.path} className="group">
                <GlassCard 
                  className={cn(
                    "p-6 h-full text-left flex gap-5 border border-obsidian-800 transition-all duration-300 relative overflow-hidden",
                    card.glowClass
                  )}
                  glowColor={card.color as any}
                >
                  {/* Glowing Icon Container */}
                  <div className={cn("p-3.5 rounded-xl border flex items-center justify-center h-12 w-12 flex-shrink-0 bg-obsidian-950 border-obsidian-800 group-hover:scale-105 transition-transform", card.textColor)}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base font-bold text-white group-hover:text-white flex items-center gap-1.5 transition-colors">
                      {card.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyber-cyan" />
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                      {card.desc}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-obsidian-800 text-center text-[10px] text-gray-600 font-mono">
        © 2026 TECHFORGE SYSTEMS. DEVELOPED BY PAIR-PROGRAMMING AI. SEC SYSTEM ONLINE.
      </footer>
    </div>
  );
}
