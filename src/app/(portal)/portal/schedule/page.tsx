"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, MapPin, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

const SCHEDULE = [
  { day: "Sunday", sessions: [
    { time: "09:00 - 11:00", subject: "Linear Actuators Lab", room: "Robotics Deck A", instructor: "Prof. Lamine Touati", type: "practical" },
  ]},
  { day: "Monday", sessions: [] },
  { day: "Tuesday", sessions: [
    { time: "14:00 - 16:00", subject: "IoT Circuit Workshop", room: "IoT Circuits Deck B", instructor: "Ing. Jamel Djaoued", type: "practical" },
    { time: "16:30 - 18:00", subject: "Algorithms Theory", room: "Lecture Room T-01", instructor: "Dr. Meriem Bella", type: "theory" },
  ]},
  { day: "Wednesday", sessions: [] },
  { day: "Thursday", sessions: [
    { time: "10:00 - 12:00", subject: "3D CAD & Slicing", room: "Central FabLab", instructor: "Prof. Lamine Touati", type: "practical" },
  ]},
];

export default function PortalSchedule() {
  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Weekly Schedule
          <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
            {new Date().toLocaleDateString("en-DZ", { month: "long", year: "numeric" })}
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Your registered class sessions and upcoming lab workshops.</p>
      </div>

      <div className="space-y-5">
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
                NO SESSIONS SCHEDULED
              </div>
            ) : (
              <div className="space-y-3">
                {day.sessions.map((session, i) => (
                  <GlassCard
                    key={i}
                    className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-obsidian-800 hover:border-obsidian-700"
                    glowColor={session.type === "practical" ? "cyan" : "none"}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <Clock className="w-3 h-3" />
                        {session.time}
                        <span className={cn(
                          "ml-2 px-2 py-0.5 rounded-full border font-bold",
                          session.type === "practical" ? "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan" : "bg-neon-purple/5 border-neon-purple/20 text-neon-purple"
                        )}>
                          {session.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{session.subject}</h4>
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-semibold">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{session.room}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{session.instructor}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-obsidian-900 border border-obsidian-800 flex items-center justify-center">
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
