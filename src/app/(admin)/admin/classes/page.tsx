"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { BookOpen, MapPin, Landmark, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassRoom {
  id: string;
  name: string;
  type: "مختبر الروبوتات" | "مختبر الإلكترونيات" | "فضاء مختبر التصنيع (FabLab)" | "قاعة المحاضرات النظرية";
  capacity: number;
  activeDevices: string;
  status: "مشغولة" | "شاغرة" | "تحت الصيانة";
}

const MOCK_ROOMS: ClassRoom[] = [
  { id: "LAB-A", name: "منصة الروبوتات (أ)", type: "مختبر الروبوتات", capacity: 20, activeDevices: "أذرع روبوتية SCARA، مستشعر RPLidar", status: "مشغولة" },
  { id: "LAB-B", name: "منصة الدوائر لإنترنت الأشياء (ب)", type: "مختبر الإلكترونيات", capacity: 16, activeDevices: "أجهزة راسم الإشارة، أدوات اللحام", status: "شاغرة" },
  { id: "FAB-01", name: "مختبر التصنيع المركزي", type: "فضاء مختبر التصنيع (FabLab)", capacity: 25, activeDevices: "طابعات Ender ثلاثية الأبعاد، جهاز CNC", status: "مشغولة" },
  { id: "THE-01", name: "قاعة محاضرات الخوارزميات", type: "قاعة المحاضرات النظرية", capacity: 30, activeDevices: "لوحة ذكية", status: "شاغرة" },
];

export default function Classrooms() {
  const getStatusLabel = (status: string) => {
    return status;
  };

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6 text-right">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2">
          مختبرات الابتكار وقاعات التدريس
          <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
            مخطط التوزيع
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          راقب تخصيص القاعات، والقدرة الاستيعابية القصوى للطلاب، ومعدات التطوير النشطة.
        </p>
      </div>

      {/* Rooms Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
        {MOCK_ROOMS.map((room) => (
          <GlassCard 
            key={room.id} 
            className="p-6 relative overflow-hidden flex flex-col justify-between h-48 border border-obsidian-800"
            glowColor={room.status === "مشغولة" ? "cyan" : "none"}
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{room.id}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                    room.status === "مشغولة" && "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan",
                    room.status === "شاغرة" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                    room.status === "تحت الصيانة" && "bg-neon-red/5 border-neon-red/20 text-neon-red animate-pulse"
                  )}
                >
                  {getStatusLabel(room.status)}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-2 flex items-center gap-2 text-right justify-start flex-row-reverse">
                <Landmark className="w-4.5 h-4.5 text-cyber-cyan" />
                {room.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1 font-semibold text-right">{room.type} • الاستيعاب الأقصى: {room.capacity} مقعد</p>
            </div>

            <div className="border-t border-obsidian-850 pt-3 flex items-center justify-between text-[10px] font-mono text-right flex-row-reverse">
              <span className="text-gray-500 uppercase">عناصر التتبع الرقمي:</span>
              <span className="text-cyber-cyan font-bold truncate max-w-[200px] text-left">{room.activeDevices}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
