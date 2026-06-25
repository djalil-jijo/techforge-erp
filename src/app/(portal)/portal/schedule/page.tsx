"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, MapPin, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

const SCHEDULE = [
  { day: "الأحد", sessions: [
    { time: "09:00 - 11:00", subject: "مختبر المحركات الخطية", room: "منصة الروبوتيك أ", instructor: "الأستاذ الأمين تواتي", type: "عملي" },
  ]},
  { day: "الاثنين", sessions: [] },
  { day: "الثلاثاء", sessions: [
    { time: "14:00 - 16:00", subject: "ورشة عمل دوائر إنترنت الأشياء", room: "منصة دوائر إنترنت الأشياء ب", instructor: "المهندس جمال جاود", type: "عملي" },
    { time: "16:30 - 18:00", subject: "نظريات الخوارزميات", room: "قاعة المحاضرات ت-01", instructor: "الدكتورة مريم بيلا", type: "نظري" },
  ]},
  { day: "الأربعاء", sessions: [] },
  { day: "الخميس", sessions: [
    { time: "10:00 - 12:00", subject: "التصميم ثلاثي الأبعاد والتقطيع", room: "مختبر التصنيع المركزي (FabLab)", instructor: "الأستاذ الأمين تواتي", type: "عملي" },
  ]},
];

export default function PortalSchedule() {
  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6 text-right">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            📅 الجدول الأسبوعي
          </span>
          <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
            {new Date().toLocaleDateString("ar-DZ", { month: "long", year: "numeric" })}
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">الحصص الدراسية المسجلة وورش العمل القادمة الخاصة بك.</p>
      </div>

      <div className="space-y-5 text-right">
        {SCHEDULE.map((day) => (
          <div key={day.day}>
            <h3 className={cn(
              "text-xs font-mono font-bold uppercase tracking-widest mb-3",
              day.sessions.length > 0 ? "text-cyber-cyan" : "text-gray-600"
            )}>
              {day.day}
            </h3>

            {day.sessions.length === 0 ? (
              <div className="border border-dashed border-obsidian-800 rounded-xl p-4 text-center text-gray-600 font-mono text-[10px]">
                لا توجد حصص مجدولة
              </div>
            ) : (
              <div className="space-y-3">
                {day.sessions.map((session, i) => (
                  <GlassCard
                    key={i}
                    className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-obsidian-800 hover:border-obsidian-700"
                    glowColor={session.type === "عملي" ? "cyan" : "none"}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 justify-start">
                        <Clock className="w-3 h-3" />
                        {session.time}
                        <span className={cn(
                          "mr-2 px-2 py-0.5 rounded-full border font-bold",
                          session.type === "عملي" ? "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan" : "bg-neon-purple/5 border-neon-purple/20 text-neon-purple"
                        )}>
                          {session.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white text-right">{session.subject}</h4>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold justify-start">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{session.room}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{session.instructor}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-obsidian-900 border border-obsidian-800 flex items-center justify-center self-start sm:self-center">
                      <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
