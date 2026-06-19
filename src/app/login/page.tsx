"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "teacher" | "portal">("admin");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "teacher") {
      router.push("/teacher/dashboard");
    } else {
      router.push("/portal/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4 mb-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center pulse-cyan">
            <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
          </div>
          <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Access Control Protocol</h2>
        <p className="text-gray-400 text-xs font-mono">SEC SYSTEM DECK ENTRY</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <GlassCard glowColor="cyan" className="p-8">
          <form onSubmit={handleLogin} className="space-y-5 text-xs">
            {/* Role Switcher */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2">Access Credentials Domain</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "admin", name: "Admin" },
                  { id: "teacher", name: "Instructor" },
                  { id: "portal", name: "Student" },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id as any)}
                    className={cn(
                      "py-2 rounded-xl border text-center font-bold transition-all cursor-pointer",
                      role === r.id
                        ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan"
                        : "bg-obsidian-950 border-obsidian-850 text-gray-500 hover:border-obsidian-800"
                    )}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Domain Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@techforge.dz"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Access Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                  required
                />
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full bg-cyber-cyan text-obsidian-950 font-bold p-3 rounded-xl hover:bg-cyber-cyan/90 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-mono font-bold"
            >
              <LogIn className="w-4 h-4" />
              Authorize Access
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-6 pt-4 border-t border-obsidian-850 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Gateway
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Simple cn helper copy to make it standalone if needed
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
