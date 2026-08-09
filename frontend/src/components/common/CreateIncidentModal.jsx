import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';

export default function CreateIncidentModal({ isOpen, onClose, onSubmitIncident }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Unattended Object');
  const [zone, setZone] = useState('Platform 3, Sector B');
  const [cam, setCam] = useState('CAM-202');
  const [severity, setSeverity] = useState('CRITICAL');
  const [desc, setDesc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newInc = {
      id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      title,
      type,
      zone,
      cam,
      severity,
      desc: desc || `Manually logged incident at ${zone} by RPF Operator.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      conf: '100% (Manual Report)',
      status: 'PENDING'
    };

    onSubmitIncident(newInc);
    onClose();
    // Reset form
    setTitle('');
    setDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F4F4F0] border border-[#E4E4DF] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-900 font-sans">
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-railway-mint" />
            <h3 className="text-base font-extrabold font-heading">File New Control Room Incident</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
              Incident Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Unattended Suitcase on FOB Staircase"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#E4E4DF] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-navy-900 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                Incident Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white border border-[#E4E4DF] rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
              >
                <option value="Unattended Object">Unattended Object</option>
                <option value="Perimeter Breach">Perimeter Breach</option>
                <option value="Crowd Surge Warning">Crowd Surge Warning</option>
                <option value="PPE Violation">PPE Violation</option>
                <option value="Track Trespass">Track Trespass</option>
                <option value="Fire & Smoke Hazard">Fire & Smoke Hazard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-white border border-[#E4E4DF] rounded-xl px-3 py-2 text-slate-900 focus:outline-none font-bold"
              >
                <option value="CRITICAL">🔴 CRITICAL</option>
                <option value="WARNING">🟡 WARNING</option>
                <option value="NOTICE">🔵 NOTICE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                Station Zone
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-white border border-[#E4E4DF] rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
              >
                <option value="Platform 1 Concourse">Platform 1 Concourse</option>
                <option value="Platform 2 North">Platform 2 North</option>
                <option value="Platform 3, Sector B">Platform 3, Sector B</option>
                <option value="Platform 4 Main Yard">Platform 4 Main Yard</option>
                <option value="Maintenance Yard B">Maintenance Yard B</option>
                <option value="Foot Overbridge 2">Foot Overbridge 2</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                Associated Camera
              </label>
              <select
                value={cam}
                onChange={(e) => setCam(e.target.value)}
                className="w-full bg-white border border-[#E4E4DF] rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
              >
                <option value="CAM-101">CAM-101 (Platform 1)</option>
                <option value="CAM-202">CAM-202 (Platform 3)</option>
                <option value="CAM-301">CAM-301 (Platform 2)</option>
                <option value="CAM-042">CAM-042 (Yard B)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
              Operator Description / Notes
            </label>
            <textarea
              rows={3}
              placeholder="Provide context for RPF field dispatch team..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-white border border-[#E4E4DF] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-navy-900 shadow-sm"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#E4E4DF] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition-colors font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-navy-900 hover:bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md font-heading"
            >
              <Send className="w-3.5 h-3.5 text-railway-mint" />
              <span>Submit & Dispatch Alert</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
