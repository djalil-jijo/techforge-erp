"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { BookOpen, MapPin, Landmark, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassRoom {
  id: string;
  name: string;
  type: "Robotics Lab" | "Electronics Lab" | "FabLab Space" | "Theory Room";
  capacity: number;
  activeDevices: string;
  status: "Occupied" | "Idle" | "Maintenance";
}

const MOCK_ROOMS: ClassRoom[] = [
  { id: "LAB-A", name: "Robotics Deck A", type: "Robotics Lab", capacity: 20, activeDevices: "SCARA Arms, RPLidar", status: "Occupied" },
  { id: "LAB-B", name: "IoT Circuits Deck B", type: "Electronics Lab", capacity: 16, activeDevices: "OSC Scopes, Soldering", status: "Idle" },
  { id: "FAB-01", name: "Central FabLab", type: "FabLab Space", capacity: 25, activeDevices: "Ender 3Ds, CNC Router", status: "Occupied" },
  { id: "THE-01", name: "Algorithms Lecture Room", type: "Theory Room", capacity: 30, activeDevices: "Smartboard", status: "Idle" },
];

export default function Classrooms() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Innovation Laboratories
          <span className="text-xs bg-neon-purple/10 border border-neon-purple/35 text-neon-purple font-mono px-2 py-0.5 rounded-full font-bold">
            Location Map
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Monitor room allocations, maximum student capacity, and active development modules.
        </p>
      </div>

      {/* Rooms Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ROOMS.map((room) => (
          <GlassCard 
            key={room.id} 
            className="p-6 relative overflow-hidden flex flex-col justify-between h-48 border border-obsidian-800"
            glowColor={room.status === "Occupied" ? "cyan" : "none"}
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{room.id}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                    room.status === "Occupied" && "bg-cyber-cyan/5 border-cyber-cyan/20 text-cyber-cyan",
                    room.status === "Idle" && "bg-emerald-glow/5 border-emerald-glow/20 text-emerald-glow",
                    room.status === "Maintenance" && "bg-neon-red/5 border-neon-red/20 text-neon-red animate-pulse"
                  )}
                >
                  {room.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                <Landmark className="w-4.5 h-4.5 text-cyber-cyan" />
                {room.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1 font-semibold">{room.type} • Max Capacity: {room.capacity} seats</p>
            </div>

            <div className="border-t border-obsidian-850 pt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-500 uppercase">TELEMETRY COMPONENT:</span>
              <span className="text-cyber-cyan font-bold truncate max-w-[200px]">{room.activeDevices}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
