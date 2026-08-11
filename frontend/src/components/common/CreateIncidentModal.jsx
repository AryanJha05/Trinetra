import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Send } from 'lucide-react';

export default function CreateIncidentModal({ isOpen, onClose, onSubmitIncident }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Unattended Object');
  const [zone, setZone] = useState('Public Zone B (Concourse)');
  const [cam, setCam] = useState('CAM-001');
  const [severity, setSeverity] = useState('CRITICAL');
  const [desc, setDesc] = useState('');

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
      desc: desc || `Manually logged incident at ${zone} by Security Operator.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      conf: '100% (Manual Log)',
      status: 'ACTIVE'
    };

    onSubmitIncident(newInc);
    onClose();
    setTitle('');
    setDesc('');
  };

  const footerActions = (
    <>
      <Button
        variant="secondary"
        size="md"
        onClick={onClose}
        className="min-w-[85px]"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="create-incident-form"
        variant="primary"
        size="md"
        icon={Send}
        className="min-w-[170px]"
      >
        Log & Dispatch
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="File New Operations Incident"
      subtitle="Manual Security Dispatch Entry · TRINETRA Operations Desk"
      icon={AlertTriangle}
      maxWidth="max-w-lg"
      footerActions={footerActions}
    >
      <form id="create-incident-form" onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono text-[10px]">
            Incident Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Unattended Package near West Entry Gate"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2 text-slate-900 focus:outline-none focus:border-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
              Category
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none font-sans"
            >
              <option value="Unattended Object">Unattended Object</option>
              <option value="Perimeter Breach">Perimeter Breach</option>
              <option value="Crowd Surge Warning">Crowd Surge Warning</option>
              <option value="PPE Violation">PPE Violation</option>
              <option value="Restricted Trespass">Restricted Trespass</option>
              <option value="Fire & Smoke Hazard">Fire & Smoke Hazard</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
              Severity Level
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none font-bold"
            >
              <option value="CRITICAL">🔴 CRITICAL</option>
              <option value="WARNING">🟡 WARNING</option>
              <option value="NOTICE">🔵 NOTICE</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
              Operational Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none font-sans"
            >
              <option value="Zone A (Main Concourse Entrance)">Zone A (Main Concourse Entrance)</option>
              <option value="Public Zone B (Concourse)">Public Zone B (Concourse)</option>
              <option value="Zone C (West Escalator Link)">Zone C (West Escalator Link)</option>
              <option value="Zone D (Service Facility Yard)">Zone D (Service Facility Yard)</option>
              <option value="Perimeter Gate 2">Perimeter Gate 2</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
              Associated Camera
            </label>
            <select
              value={cam}
              onChange={(e) => setCam(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none font-mono"
            >
              <option value="CAM-001">CAM-001 (Concourse)</option>
              <option value="CAM-002">CAM-002 (Gathering Area)</option>
              <option value="CAM-003">CAM-003 (Restricted Gate)</option>
              <option value="CAM-004">CAM-004 (Service Yard)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono text-[10px]">
            Operator Notes / Description
          </label>
          <textarea
            rows={3}
            placeholder="Provide operational context for security response unit..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2 text-slate-900 focus:outline-none focus:border-slate-800"
          />
        </div>
      </form>
    </Modal>
  );
}
