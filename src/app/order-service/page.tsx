"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Hammer, Layers, Upload, ArrowLeft, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderService() {
  const [service, setService] = useState<"3dp" | "cnc" | "laser">("3dp");
  const [material, setMaterial] = useState("PLA Plastic");
  const [infill, setInfill] = useState(20);
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState(150); // grams
  const [dimensions, setDimensions] = useState({ x: 100, y: 100, z: 50 }); // mm
  const [fileName, setFileName] = useState("");

  const calculateEstimate = () => {
    let rate = 10; // rate per gram or minute
    if (service === "cnc") rate = 25;
    if (service === "laser") rate = 15;

    const volumeMultiplier = (dimensions.x * dimensions.y * dimensions.z) / 500000;
    const base = service === "3dp" ? weight * rate : volumeMultiplier * 2000;
    
    return Math.round((base + (infill / 10) * 100) * qty);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-laser-amber/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="h-20 border-b border-obsidian-800 flex items-center justify-between px-8 md:px-16 z-10 bg-obsidian-950/50 backdrop-blur-md sticky top-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-laser-amber/10 border border-laser-amber/30 flex items-center justify-center">
            <span className="text-laser-amber font-bold text-lg font-mono">T</span>
          </div>
          <div>
            <span className="font-extrabold text-white font-sans tracking-wide">TECHFORGE</span>
            <span className="text-laser-amber text-xs font-mono block tracking-widest leading-none font-bold">FabLab</span>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Gateway
        </Link>
      </header>

      {/* Main Form Area */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 z-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-laser-amber font-mono uppercase tracking-wider">
              Service Request Form
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Rapid Manufacturing Pipeline</h1>
            <p className="text-xs text-gray-400">
              Configure parameters to calculate raw cost estimates for 3D prints or CNC routing slots.
            </p>
          </div>

          <GlassCard className="space-y-6 p-8" hoverable={false}>
            {/* Service selector */}
            <div className="space-y-2 text-xs">
              <label className="block text-gray-400 font-semibold">1. Choose Manufacturing Node</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "3dp", name: "3D Printing", desc: "FDM / SLA printing" },
                  { id: "cnc", name: "CNC Milling", desc: "Precision milling" },
                  { id: "laser", name: "Laser Cutting", desc: "Acrylic & Wood cuts" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setService(item.id as any)}
                    className={cn(
                      "p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-20",
                      service === item.id
                        ? "bg-laser-amber/10 border-laser-amber text-laser-amber glow-border-amber"
                        : "bg-obsidian-950 border-obsidian-850 text-gray-500 hover:border-obsidian-800"
                    )}
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="text-[10px] text-gray-600 leading-none">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Material Specification</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-laser-amber"
                >
                  {service === "3dp" && (
                    <>
                      <option>PLA Plastic (Standard)</option>
                      <option>PETG (Durable)</option>
                      <option>ABS (Industrial)</option>
                    </>
                  )}
                  {service === "cnc" && (
                    <>
                      <option>FR4 Copper Clad (PCBs)</option>
                      <option>MDF Wood (Prototyping)</option>
                      <option>Aluminum Block (Alloy)</option>
                    </>
                  )}
                  {service === "laser" && (
                    <>
                      <option>Plexiglass Acrylic (Clear)</option>
                      <option>Plywood (3mm / 5mm)</option>
                    </>
                  )}
                </select>
              </div>

              {service === "3dp" ? (
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Infill Density ({infill}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={infill}
                    onChange={(e) => setInfill(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-obsidian-950 border border-obsidian-850 rounded-lg appearance-none cursor-pointer accent-laser-amber mt-4"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">Thickness (mm)</label>
                  <select className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-3 text-gray-300 focus:outline-none focus:border-laser-amber">
                    <option>1.6 mm</option>
                    <option>3.0 mm</option>
                    <option>5.0 mm</option>
                    <option>10.0 mm</option>
                  </select>
                </div>
              )}
            </div>

            {/* Model Dimensions */}
            <div className="space-y-2 text-xs">
              <label className="block text-gray-400 font-semibold">Dimensions (Length x Width x Height in mm)</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 block mb-0.5 font-mono">X Axis</span>
                  <input
                    type="number"
                    value={dimensions.x}
                    onChange={(e) => setDimensions({ ...dimensions, x: parseInt(e.target.value) || 0 })}
                    className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-center text-gray-300 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block mb-0.5 font-mono">Y Axis</span>
                  <input
                    type="number"
                    value={dimensions.y}
                    onChange={(e) => setDimensions({ ...dimensions, y: parseInt(e.target.value) || 0 })}
                    className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-center text-gray-300 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block mb-0.5 font-mono">Z Axis</span>
                  <input
                    type="number"
                    value={dimensions.z}
                    onChange={(e) => setDimensions({ ...dimensions, z: parseInt(e.target.value) || 0 })}
                    className="w-full bg-obsidian-950 border border-obsidian-850 rounded-xl p-2.5 text-center text-gray-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* File upload section */}
            <div className="space-y-2 text-xs">
              <label className="block text-gray-400 font-semibold">CAD File Upload (STL, DXF, or STEP)</label>
              <div className="border border-dashed border-obsidian-800 rounded-2xl p-6 text-center hover:border-laser-amber/40 transition-all bg-obsidian-950/50 relative cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".stl,.dxf,.step,.stp"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2 animate-pulse" />
                <span className="text-xs font-semibold text-gray-400 block">
                  {fileName ? `Uploaded: ${fileName}` : "Drag and drop CAD file or click to browse"}
                </span>
                <span className="text-[10px] text-gray-600 block mt-1">Maximum 50MB file size</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Pricing Estimator Column */}
        <div className="space-y-6">
          <GlassCard glowColor="amber" className="h-fit space-y-6 p-8" hoverable={false}>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-laser-amber" />
              Pricing Telemetry
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-obsidian-850">
                <span className="text-gray-500">Selected Node</span>
                <span className="text-white font-mono uppercase font-bold">{service === "3dp" ? "3D Printer" : service === "cnc" ? "CNC Router" : "Laser Cutter"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-obsidian-850">
                <span className="text-gray-500">Material Selection</span>
                <span className="text-white font-mono">{material}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-obsidian-850">
                <span className="text-gray-500">Dimensions (L*W*H)</span>
                <span className="text-white font-mono">{dimensions.x}x{dimensions.y}x{dimensions.z} mm</span>
              </div>
              
              {/* Quantity */}
              <div className="flex justify-between items-center py-2 border-b border-obsidian-850">
                <span className="text-gray-500">Production Quantity</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-6 h-6 border border-obsidian-800 bg-obsidian-950 rounded flex items-center justify-center hover:border-laser-amber text-gray-400 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-white">{qty}</span>
                  <button 
                    onClick={() => setQty(q => q + 1)}
                    className="w-6 h-6 border border-obsidian-800 bg-obsidian-950 rounded flex items-center justify-center hover:border-laser-amber text-gray-400 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price Estimate */}
              <div className="pt-4 text-center">
                <span className="text-[10px] text-gray-500 font-mono block uppercase">Estimated Production Fee</span>
                <span className="text-3xl font-extrabold text-laser-amber font-mono glow-border-amber/10 tracking-tight block mt-1">
                  {calculateEstimate().toLocaleString()} DZD
                </span>
                <span className="text-[9px] text-gray-600 block mt-1">Estimations subject to engineer approval.</span>
              </div>

              <button 
                onClick={() => alert("Manufacturing protocol request dispatched.")}
                className="w-full bg-laser-amber text-white font-bold p-3 rounded-xl hover:bg-laser-amber/90 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 text-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                Dispatch Order Protocol
              </button>
            </div>
          </GlassCard>

          {/* Help Info Card */}
          <div className="p-4 rounded-2xl bg-obsidian-900/40 border border-obsidian-850 flex gap-3 text-xs">
            <HelpCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <p className="text-gray-500 leading-relaxed">
              For large batch CNC router runs or precision SLS printing files, contact the support desk directly to request discount slots.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-obsidian-800 text-center text-[10px] text-gray-600 font-mono z-10 bg-obsidian-950/50">
        © 2026 TECHFORGE FABLAB NODE. SEC SYSTEM ONLINE.
      </footer>
    </div>
  );
}
