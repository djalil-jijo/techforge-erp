"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Zap, ShieldCheck } from "lucide-react";

export default function CreateReport() {
  const [form, setForm] = useState({
    session: "Linear Actuators Lab",
    date: new Date().toISOString().split("T")[0],
    fouj: "Fouj A-1",
    summary: "",
    hardwareStatus: "",
    issues: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.summary.trim()) return alert("Session summary is required.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="border-b border-obsidian-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Lesson Report</h1>
        </div>
        <GlassCard glowColor="emerald" className="text-center py-16 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-glow/10 border border-emerald-glow/30 flex items-center justify-center animate-bounce">
            <ShieldCheck className="w-8 h-8 text-emerald-glow" />
          </div>
          <h3 className="text-xl font-bold text-white">Report Submitted!</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed">
            Your lesson log for <strong className="text-white">{form.session}</strong> on <strong className="text-white">{form.date}</strong> has been transmitted to the admin audit queue.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(f => ({ ...f, summary: "", hardwareStatus: "", issues: "" })); }}
            className="mt-4 px-5 py-2.5 bg-emerald-glow text-obsidian-950 font-bold rounded-xl text-xs cursor-pointer hover:bg-emerald-glow/90"
          >
            Write Another Report
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-obsidian-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Instant Lesson Report
          <span className="text-xs bg-cyber-cyan/10 border border-cyber-cyan/35 text-cyber-cyan font-mono px-2 py-0.5 rounded-full font-bold">
            Digital Log
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Submit a rapid session debrief without uploading files — pure text, one press.
        </p>
      </div>

      <div className="max-w-2xl">
        <GlassCard hoverable={false} className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Session meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Session Topic</label>
                <input
                  type="text"
                  value={form.session}
                  onChange={e => setForm(f => ({ ...f, session: e.target.value }))}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Session Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Assigned Fouj</label>
                <select
                  value={form.fouj}
                  onChange={e => setForm(f => ({ ...f, fouj: e.target.value }))}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-gray-300 focus:outline-none focus:border-cyber-cyan"
                >
                  <option>Fouj A-1</option>
                  <option>Fouj A-2</option>
                  <option>Fouj B-2</option>
                  <option>Fouj C-3</option>
                </select>
              </div>
            </div>

            {/* Session Summary */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1">
                Session Summary <span className="text-neon-red">*</span>
              </label>
              <textarea
                value={form.summary}
                onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                rows={4}
                placeholder="Describe what was covered in today's session: objectives, student progress, exercises completed..."
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-cyber-cyan resize-none leading-relaxed"
                required
              />
            </div>

            {/* Hardware Status */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Hardware Return Status</label>
              <textarea
                value={form.hardwareStatus}
                onChange={e => setForm(f => ({ ...f, hardwareStatus: e.target.value }))}
                rows={2}
                placeholder="e.g. All Arduino kits returned to Cabinet A-1. One Raspberry Pi left with Amine Bouaziz for weekend project..."
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-laser-amber resize-none leading-relaxed"
              />
            </div>

            {/* Issues */}
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Issues / Alerts (optional)</label>
              <textarea
                value={form.issues}
                onChange={e => setForm(f => ({ ...f, issues: e.target.value }))}
                rows={2}
                placeholder="Any student behavior concerns, hardware failures, or scheduling conflicts to flag..."
                className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-neon-red resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyber-cyan text-obsidian-950 font-bold rounded-xl hover:bg-cyber-cyan/90 transition-colors cursor-pointer shadow-lg text-xs uppercase tracking-wider"
            >
              <Zap className="w-4 h-4" />
              Dispatch Report Protocol
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
