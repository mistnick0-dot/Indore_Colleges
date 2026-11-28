/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Globe, 
  Sparkles, 
  Check, 
  ExternalLink,
  Map,
  Info
} from 'lucide-react';
import { Institute } from '../types';

interface InteractiveMapProps {
  institutes: Institute[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  onViewDetail?: (inst: Institute) => void;
}

// Map Location to Zone Name
export function getInstituteZone(locationStr: string): string {
  const loc = (locationStr || '').toLowerCase();
  
  if (loc.includes('sanwer') || loc.includes('super corridor') || loc.includes('sukhliya') || loc.includes('scheme 78')) {
    return 'north';
  }
  if (loc.includes('simrol') || loc.includes('khandwa') || loc.includes('limbodi') || loc.includes('ralamandal') || loc.includes('garpiplaya')) {
    return 'simrol';
  }
  if (loc.includes('rau') || loc.includes('manik') || loc.includes('rajendra') || loc.includes('annapurna') || loc.includes('sudama') || loc.includes('gumasta') || loc.includes('dwarkapuri') || loc.includes('pigdamber') || loc.includes('mogh') || loc.includes('mog') || loc.includes('dhar')) {
    return 'south-west';
  }
  if (loc.includes('bypass') || loc.includes('jhalaria') || loc.includes('nipania') || loc.includes('bicholi') || loc.includes('mahalaxmi') || loc.includes('dakachya')) {
    return 'bypass';
  }
  return 'central';
}

const ZONES_META = [
  {
    id: 'central',
    name: 'Central & LIG (SGSITS, DAVV)',
    description: 'The historic academic core of Indore. Home of DAVV, LIG Colony, Vallabh Nagar, and Old Palasia centers.',
    color: 'border-red-500 bg-red-50/40 text-red-600 hover:bg-red-50/70',
    dotColor: 'bg-red-600',
    badgeColor: 'bg-red-100 text-red-600',
    keyLandmarks: 'SGSITS, DAVV, Palasia Hub, Vallabh Nagar'
  },
  {
    id: 'north',
    name: 'North Indore (Sanwer Rd)',
    description: 'Industrial and fast-growing educational belt. Home of SVVV, Scheme 78, and Super Corridor tech gateways.',
    color: 'border-amber-500 bg-amber-50/40 text-amber-800 hover:bg-amber-50/70',
    dotColor: 'bg-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    keyLandmarks: 'SVVV, Super Corridor, Sanwer Rd'
  },
  {
    id: 'bypass',
    name: 'Bypass Corridor (Shishukunj, Ac...)',
    description: 'Premium modern institutional campuses on the Eastern Ring Bypass. Includes Acropolis Tech and Nipania school clusters.',
    color: 'border-emerald-500 bg-emerald-50/40 text-emerald-800 hover:bg-emerald-50/70',
    dotColor: 'bg-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    keyLandmarks: 'Acropolis Institute, Bypass Road, Nipania'
  },
  {
    id: 'south-west',
    name: 'South-West Hub (Rau, Indore Heights)',
    description: 'Modern development quadrant and management hub. Houses Triple-Crown IIM Indore, Rau, and Manik Bagh.',
    color: 'border-purple-500 bg-purple-50/40 text-purple-800 hover:bg-purple-50/70',
    dotColor: 'bg-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
    keyLandmarks: 'IIM Indore, Rau Highway, Manik Bagh'
  },
  {
    id: 'simrol',
    name: 'Simrol Technology Corridor (IIT)',
    description: 'Elite research corridor on Khandwa road leading to Simrol mountain foothill. Houses premier IIT Indore campus.',
    color: 'border-indigo-500 bg-indigo-50/40 text-indigo-800 hover:bg-indigo-50/70',
    dotColor: 'bg-indigo-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    keyLandmarks: 'IIT Indore, Khandwa Road, Limbodi Hub'
  }
];

export default function InteractiveMap({
  institutes,
  selectedLocation,
  setSelectedLocation,
  onViewDetail
}: InteractiveMapProps) {
  const [mapType, setMapType] = useState<'zone' | 'osm'>('zone');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Calculate dynamic count of colleges in each zone based on the parent state
  const getZoneCount = (zoneId: string) => {
    return institutes.filter(inst => getInstituteZone(inst.location) === zoneId).length;
  };

  // Convert currently selectedLocation state to find out if we are in a specific zone
  const activeZoneId = selectedLocation.startsWith('Zone: ') 
    ? selectedLocation.replace('Zone: ', '').toLowerCase()
    : null;

  const handleZoneClick = (zoneId: string) => {
    if (activeZoneId === zoneId) {
      setSelectedLocation('All'); // Toggle off
    } else {
      setSelectedLocation(`Zone: ${zoneId.charAt(0).toUpperCase() + zoneId.slice(1)}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
      {/* Header and Map Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
            <Compass className="h-4 w-4 text-red-600 animate-spin-slow" />
            <span>Interactive Indore Maps Hub</span>
          </h3>
          <p className="text-[11px] text-gray-400">
            {mapType === 'zone' 
              ? 'Click sectors to instantly group & filter local institutes'
              : 'Real-time street exploration using 100% free OpenStreetMap'
            }
          </p>
        </div>

        {/* 100% Free Toggles */}
        <div className="flex rounded-lg bg-gray-100/80 p-0.5 self-start sm:self-auto">
          <button
            onClick={() => setMapType('zone')}
            className={`flex items-center space-x-1 px-3 py-1 text-[10px] font-extrabold rounded-md transition ${
              mapType === 'zone' 
                ? 'bg-white text-gray-900 shadow-2xs border border-gray-200/50' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Zone Filter Board</span>
          </button>
          <button
            onClick={() => setMapType('osm')}
            className={`flex items-center space-x-1 px-3 py-1 text-[10px] font-extrabold rounded-md transition ${
              mapType === 'osm' 
                ? 'bg-white text-gray-900 shadow-2xs border border-gray-200/50' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Free Live Map</span>
          </button>
        </div>
      </div>

      {/* RENDER VIEW 1: D3/SVG Zone Filter Board */}
      {mapType === 'zone' && (
        <div className="space-y-4">
          
          {/* Concentric Vector Radar Layout */}
          <div className="relative w-full aspect-[460/240] bg-slate-950 rounded-xl overflow-hidden border border-slate-900 flex items-center justify-center shadow-inner">
            
            {/* Dark Radar Grid lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[12%] aspect-square rounded-full border border-slate-800/60" />
              <div className="w-[30%] aspect-square rounded-full border border-slate-800/60 animate-pulse" />
              <div className="w-[55%] aspect-square rounded-full border border-slate-800/40" />
              <div className="w-[85%] aspect-square rounded-full border border-slate-800/20" />
              {/* Coordinate axis lines */}
              <div className="absolute w-full h-[1px] bg-slate-800/20" />
              <div className="absolute h-full w-[1px] bg-slate-800/20" />
            </div>

            {/* Glowing Tech Orbs for each zone based on coordinates */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Central & LIG */}
              <div 
                className={`absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center transition-all duration-300 ${
                  activeZoneId === 'central' || hoveredZone === 'central' ? 'scale-170 bg-red-500/40' : ''
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(246,103,16,0.8)]" />
              </div>

              {/* North (Sanwer) */}
              <div 
                className={`absolute left-[47%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center transition-all duration-300 ${
                  activeZoneId === 'north' || hoveredZone === 'north' ? 'scale-170 bg-amber-500/40' : ''
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#d97706]" />
              </div>

              {/* Bypass */}
              <div 
                className={`absolute left-[72%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center transition-all duration-300 ${
                  activeZoneId === 'bypass' || hoveredZone === 'bypass' ? 'scale-170 bg-emerald-500/40' : ''
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#059669]" />
              </div>

              {/* South-West */}
              <div 
                className={`absolute left-[28%] top-[60%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center transition-all duration-300 ${
                  activeZoneId === 'south-west' || hoveredZone === 'south-west' ? 'scale-170 bg-purple-500/40' : ''
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#7c3aed]" />
              </div>

              {/* Simrol (IIT) */}
              <div 
                className={`absolute left-[65%] top-[78%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center transition-all duration-300 ${
                  activeZoneId === 'simrol' || hoveredZone === 'simrol' ? 'scale-170 bg-indigo-500/40' : ''
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#4f46e5]" />
              </div>
            </div>

            {/* Labels overlay inside radar */}
            <div className="absolute top-3 left-4 text-[9px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
              <Map className="h-3 w-3 text-red-500" /> Sector Coordinates Overlay
            </div>

            <div className="absolute bottom-3 right-4 text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-900/60 px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
              <Sparkles className="h-2.5 w-2.5" /> Center Calibrated
            </div>

            {/* Center HUD */}
            <div className="text-center space-y-1 z-10 select-none">
              <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest">Selected Filter</span>
              <p className="text-lg font-black text-white tracking-tight leading-none">
                {activeZoneId 
                  ? ZONES_META.find(z => z.id === activeZoneId)?.name.split(' (')[0]
                  : 'Indore City Center'
                }
              </p>
              <p className="text-[10px] text-slate-400 font-medium max-w-[240px] leading-snug mx-auto">
                {activeZoneId 
                  ? 'Showing only institutes residing inside this zone'
                  : 'Click any sector cards below to filter institutes instantly!'
                }
              </p>
            </div>
          </div>

          {/* Zone clickable buttons list */}
          <div className="grid grid-cols-1 gap-2.5">
            {ZONES_META.map((zone) => {
              const count = getZoneCount(zone.id);
              const isActive = activeZoneId === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => handleZoneClick(zone.id)}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer flex justify-between items-start gap-4 ${
                    isActive 
                      ? `${zone.color} border-2 ring-1 ring-offset-1 ring-red-500/20` 
                      : 'border-gray-100 bg-gray-50/50 hover:bg-gray-100/50 text-gray-700'
                  }`}
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${zone.dotColor} ${isActive ? 'animate-ping' : ''}`} />
                      <span>{zone.name}</span>
                    </h4>
                    <p className="text-[10px] text-gray-400 leading-normal font-medium max-w-sm">
                      {zone.description}
                    </p>
                    <div className="text-[9px] text-gray-400 font-semibold pt-1">
                      <span className="text-gray-500 font-bold uppercase tracking-wide">Key landmarks: </span>
                      {zone.keyLandmarks}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full space-y-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${zone.badgeColor}`}>
                      {count} {count === 1 ? 'Inst' : 'Insts'}
                    </span>
                    {isActive && (
                      <span className="bg-emerald-50 text-emerald-700 p-0.5 rounded-full">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Action */}
          {activeZoneId && (
            <button
              onClick={() => setSelectedLocation('All')}
              className="w-full text-center py-2.5 text-[11px] font-black text-red-600 bg-red-50/50 hover:bg-red-50 hover:text-red-500 rounded-xl transition border border-red-100"
            >
              Reset Zone Filter to show All of Indore
            </button>
          )}

        </div>
      )}

      {/* RENDER VIEW 2: Free OpenStreetMap Live View */}
      {mapType === 'osm' && (
        <div className="space-y-3">
          <div className="relative w-full aspect-[460/340] rounded-xl border border-gray-100 overflow-hidden shadow-2xs">
            {/* Embed OpenStreetMap Iframe (COMPLETELY FREE, ZERO API KEYS) */}
            <iframe 
              title="Indore Free OpenStreetMap"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://www.openstreetmap.org/export/embed.html?bbox=75.7600%2C22.6500%2C75.9500%2C22.8200&amp;layer=mapnik"
              className="grayscale-[10%] hover:grayscale-0 transition duration-300"
            />
            
            {/* Coordinates Badge */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white border border-slate-800 text-[9px] font-extrabold px-2 py-1 rounded-lg backdrop-blur-xs select-none">
              Indore Central Hub: 22.7196° N, 75.8577° E
            </div>
          </div>

          {/* OpenStreetMap Instructions Notice */}
          <div className="bg-red-50/60 border border-red-100/50 rounded-xl p-3.5 text-[11px] text-red-600 leading-relaxed font-semibold flex items-start gap-2">
            <Info className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-600">100% Free Live Map Service</p>
              <p className="text-gray-500 font-medium text-[10px] mt-0.5">
                We utilize open-source OpenStreetMap servers so you never pay license rates. You can view campuses around Palasia, Vijay Nagar, Super Corridor, and Simrol corridors instantly.
              </p>
            </div>
          </div>

          {/* List of institutes within the map with fast routing links */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Quick Directions Overlays</span>
            <div className="max-h-[140px] overflow-y-auto space-y-1.5 pr-1 border border-gray-100 rounded-lg p-2 bg-gray-50/30">
              {institutes.slice(0, 8).map((inst) => (
                <div key={inst.id} className="flex justify-between items-center text-[11px] font-medium text-gray-700 bg-white p-2 rounded-lg border border-gray-100/50">
                  <span className="truncate max-w-[190px] font-bold text-gray-800">{inst.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-400 font-bold">{inst.location}</span>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inst.name + ' Indore')}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="text-red-600 hover:text-red-500 font-bold flex items-center gap-0.5 bg-red-50 px-1.5 py-0.5 rounded text-[9px]"
                    >
                      <span>Route</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
