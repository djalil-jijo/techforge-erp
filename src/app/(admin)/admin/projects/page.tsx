"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MOCK_PROJECTS, ProjectCard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ProjectsKanban() {
  const [projects, setProjects] = useState<ProjectCard[]>(MOCK_PROJECTS);
  const [selectedTrack, setSelectedTrack] = useState<string>("All");

  const columns: { id: ProjectCard["status"]; title: string; color: string }[] = [
    { id: "idea", title: "مرحلة الفكرة", color: "border-gray-500 text-gray-400 bg-gray-500/5" },
    { id: "prototyping", title: "بناء النموذج الأولي", color: "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5" },
    { id: "testing", title: "التجارب وضمان الجودة", color: "border-laser-amber text-laser-amber bg-laser-amber/5" },
    { id: "completed", title: "مشاريع مكتملة", color: "border-emerald-glow text-emerald-glow bg-emerald-glow/5" },
  ];

  const tracks = [
    { id: "All", label: "جميع المسارات" },
    { id: "Robotics", label: "الروبوتات" },
    { id: "IoT", label: "إنترنت الأشياء" },
    { id: "CNC", label: "التحكم الرقمي (CNC)" },
    { id: "AI / Software", label: "الذكاء الاصطناعي والبرمجيات" },
    { id: "Hardware", label: "الأجهزة والعتاد" }
  ];

  const getTrackLabel = (trackId: string) => {
    const found = tracks.find(t => t.id === trackId);
    return found ? found.label : trackId;
  };

  const moveCard = (id: string, direction: "prev" | "next") => {
    const statusOrder: ProjectCard["status"][] = ["idea", "prototyping", "testing", "completed"];
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const currentIndex = statusOrder.indexOf(p.status);
        let nextIndex = currentIndex;
        if (direction === "next" && currentIndex < statusOrder.length - 1) {
          nextIndex += 1;
        } else if (direction === "prev" && currentIndex > 0) {
          nextIndex -= 1;
        }
        return {
          ...p,
          status: statusOrder[nextIndex],
          progress: statusOrder[nextIndex] === "completed" ? 100 : p.progress,
        };
      })
    );
  };

  const filteredProjects = projects.filter((p) => {
    return selectedTrack === "All" || p.track === selectedTrack;
  });

  return (
    <div className="space-y-8 text-right">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-obsidian-800 pb-6 text-right">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-start flex-row-reverse gap-2 text-right">
            لوحة مشاريع FabLab
            <span className="text-xs bg-emerald-glow/10 border border-emerald-glow/35 text-emerald-glow font-mono px-2 py-0.5 rounded-full font-bold">
              مسار كانبان
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            تابع نماذج ابتكار مجموعات الطلاب وتقدم النمذجة السريعة.
          </p>
        </div>

        {/* Track Filter */}
        <div className="flex items-center gap-2 bg-obsidian-900 px-3 py-2 rounded-xl border border-obsidian-800 justify-start flex-row-reverse">
          <span className="text-xs text-gray-500 font-semibold uppercase">المسار:</span>
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="bg-transparent text-xs text-gray-300 focus:outline-none cursor-pointer pl-4 font-bold text-right"
          >
            {tracks.map((t) => (
              <option key={t.id} value={t.id} className="bg-obsidian-950">
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start text-right">
        {columns.map((col) => {
          const colProjects = filteredProjects.filter((p) => p.status === col.id);

          return (
            <div key={col.id} className="space-y-4 text-right">
              {/* Column Header */}
              <div className={cn("border rounded-xl p-3 flex justify-between items-center font-bold text-xs flex-row-reverse", col.color)}>
                <span>{col.title}</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded-full">
                  {colProjects.length}
                </span>
              </div>

              {/* Column Body / Cards List */}
              <div className="space-y-4 min-h-[300px]">
                {colProjects.length === 0 ? (
                  <div className="border border-dashed border-obsidian-800 rounded-xl p-6 text-center text-gray-600 font-mono text-[10px]">
                    عمود فارغ
                  </div>
                ) : (
                  colProjects.map((p) => {
                    const trackColors = {
                      Robotics: "text-cyber-cyan border-cyber-cyan/20 bg-cyber-cyan/5",
                      IoT: "text-neon-purple border-neon-purple/20 bg-neon-purple/5",
                      CNC: "text-laser-amber border-laser-amber/20 bg-laser-amber/5",
                      "AI / Software": "text-emerald-glow border-emerald-glow/20 bg-emerald-glow/5",
                      Hardware: "text-gray-400 border-gray-400/20 bg-gray-500/5",
                    };

                    const activeTrackColor = trackColors[p.track as keyof typeof trackColors] || trackColors.Hardware;

                    return (
                      <GlassCard 
                        key={p.id} 
                        className="p-4 space-y-4 group relative text-right" 
                        hoverable={true}
                        glowColor={
                          p.status === "completed" ? "emerald" : 
                          p.status === "testing" ? "amber" : 
                          p.status === "prototyping" ? "cyan" : "none"
                        }
                      >
                        {/* Title & Track */}
                        <div className="text-right">
                          <span className={cn("px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider font-mono", activeTrackColor)}>
                            {getTrackLabel(p.track)}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-2 group-hover:text-cyber-cyan transition-colors text-right">
                            {p.title}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed text-right">
                            {p.description}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 text-right">
                          <div className="flex justify-between text-[10px] font-mono text-gray-500 flex-row-reverse">
                            <span>التقدم</span>
                            <span>{p.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-obsidian-950 rounded-full overflow-hidden border border-obsidian-800">
                            <div 
                              className={cn(
                                "h-full transition-all duration-500",
                                p.status === "completed" && "bg-emerald-glow",
                                p.status === "testing" && "bg-laser-amber",
                                p.status === "prototyping" && "bg-cyber-cyan",
                                p.status === "idea" && "bg-gray-500"
                              )} 
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Team members */}
                        <div className="flex flex-wrap gap-1.5 pt-1 justify-start">
                          {p.team.map((m, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 rounded-md bg-obsidian-900 border border-obsidian-800 text-[10px] text-gray-400"
                            >
                              {m}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons to shift columns */}
                        <div className="flex justify-between border-t border-obsidian-800 pt-3 text-[10px] font-bold flex-row-reverse">
                          <button
                            onClick={() => moveCard(p.id, "next")}
                            disabled={p.status === "completed"}
                            className={cn(
                              "px-2 py-1 rounded border border-obsidian-800 bg-obsidian-950 text-gray-400 hover:text-white transition-all cursor-pointer",
                              p.status === "completed" && "opacity-30 cursor-not-allowed"
                            )}
                          >
                            ← تقدم
                          </button>
                          <button
                            onClick={() => moveCard(p.id, "prev")}
                            disabled={p.status === "idea"}
                            className={cn(
                              "px-2 py-1 rounded border border-obsidian-800 bg-obsidian-950 text-gray-400 hover:text-white transition-all cursor-pointer",
                              p.status === "idea" && "opacity-30 cursor-not-allowed"
                            )}
                          >
                            رجوع →
                          </button>
                        </div>
                      </GlassCard>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
