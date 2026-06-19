"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { User, Mail, Phone, BookOpen, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    track: "Robotics",
    experience: "Beginner",
    parentName: "",
    parentPhone: "",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4 mb-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
            <span className="text-cyber-cyan font-bold text-lg font-mono">T</span>
          </div>
          <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Student Admission Portal</h2>
        <p className="text-gray-400 text-xs font-mono">STEP {step} OF 3 PROTOCOL WIZARD</p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg z-10">
        <GlassCard glowColor={step === 4 ? "emerald" : "cyan"} className="p-8">
          {step < 4 && (
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all",
                      step === num
                        ? "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan glow-border-cyan"
                        : step > num
                        ? "bg-emerald-glow/10 border-emerald-glow text-emerald-glow"
                        : "bg-obsidian-950 border-obsidian-800 text-gray-500"
                    )}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 transition-all",
                        step > num ? "bg-emerald-glow" : "bg-obsidian-800"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white mb-2">Personal Information</h3>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Amine Bouaziz"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="amine@example.dz"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0550 12 34 56"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl py-2.5 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white mb-2">Track Selection</h3>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Choose Workshop Path</label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                >
                  <option value="Robotics">Robotics & SCARA Systems</option>
                  <option value="Electronics">Applied Electronics & IoT</option>
                  <option value="3D Printing">Additive Mfg (3D / CNC)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Previous Experience Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: level })}
                      className={cn(
                        "py-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all",
                        formData.experience === level
                          ? "bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan"
                          : "bg-obsidian-950 border-obsidian-850 text-gray-500 hover:border-obsidian-800"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white mb-2">Parent / Guardian Info</h3>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Guardian Name</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Mohamed Bouaziz"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Guardian Phone Number</label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  placeholder="0660 78 90 12"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                  required
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-glow/10 border border-emerald-glow/30 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-emerald-glow" />
              </div>
              <h3 className="text-lg font-bold text-white">Registration Authorized!</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto">
                Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your request has been queued into our core registry. Our instructors will review your profile shortly.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-glow text-obsidian-950 font-bold rounded-xl hover:bg-emerald-glow/90 transition-colors text-xs"
                >
                  Return to Gateway
                </Link>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="flex justify-between border-t border-obsidian-800 pt-6 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-obsidian-800 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer transition-colors",
                  step === 1 && "opacity-35 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-cyber-cyan text-obsidian-950 rounded-xl text-xs font-bold hover:bg-cyber-cyan/90 cursor-pointer transition-colors"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-glow text-obsidian-950 rounded-xl text-xs font-bold hover:bg-emerald-glow/90 cursor-pointer transition-colors shadow-lg shadow-emerald-glow/10"
                >
                  <Sparkles className="w-4 h-4" />
                  Submit Protocol
                </button>
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
