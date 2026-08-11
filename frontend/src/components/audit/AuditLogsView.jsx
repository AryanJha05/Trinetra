import React from 'react';
import { Lock } from 'lucide-react';

export default function AuditLogsView() {
  const auditLogs = [
    { id: 101, user: 'Aryan Jha', action: 'ALERT_DISPATCH', resource: 'INC-2026-892', time: '10:43 AM IST', ip: '10.1.4.22', status: 'SUCCESS' },
    { id: 102, user: 'Mahipal', action: 'PRIVACY_MASK_ENABLE', resource: 'CAM-202', time: '10:35 AM IST', ip: '10.1.4.23', status: 'SUCCESS' },
    { id: 103, user: 'Sandeep', action: 'MULTI_FRAME_VERIFY', resource: 'INC-2026-887', time: '10:15 AM IST', ip: '10.1.4.24', status: 'VERIFIED' },
    { id: 104, user: 'Nikita', action: 'ANALYTICS_EXPORT', resource: 'SURVEILLANCE_REPORT', time: '09:10 AM IST', ip: '10.1.2.14', status: 'SUCCESS' },
    { id: 105, user: 'Aastha', action: 'PPE_RULE_UPDATE', resource: 'WORKFORCE_POLICIES', time: '08:50 AM IST', ip: '10.1.2.15', status: 'SUCCESS' },
    { id: 106, user: 'Smurtirani', action: 'SECURITY_LOG_AUDIT', resource: 'RBAC_AUDIT_TRAIL', time: '08:30 AM IST', ip: '10.1.2.16', status: 'SUCCESS' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 select-none font-sans text-[#111827]">
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
            GOVERNANCE & SECURITY AUDIT
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#111827] font-heading tracking-tight mt-0.5 flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#111827]" />
          Privacy & Security Audit Logs
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Immutable audit trail tracking all operator dispatch actions, privacy mask toggles, and system verification requests.
        </p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 text-[#111827] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="p-3">LOG ID</th>
                <th className="p-3">USER / SYSTEM ID</th>
                <th className="p-3">ACTION TYPE</th>
                <th className="p-3">TARGET RESOURCE</th>
                <th className="p-3">TIMESTAMP</th>
                <th className="p-3">IP ADDRESS</th>
                <th className="p-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-slate-700 font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold font-mono text-[#111827]">#LOG-{log.id}</td>
                  <td className="p-3 font-bold text-[#111827]">{log.user}</td>
                  <td className="p-3">
                    <span className="bg-[#111827] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{log.resource}</td>
                  <td className="p-3 text-slate-500">{log.time}</td>
                  <td className="p-3 font-mono text-slate-500">{log.ip}</td>
                  <td className="p-3 text-emerald-600 font-bold uppercase font-mono">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
