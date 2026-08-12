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
    <div className="w-full space-y-4 font-sans text-slate-900 select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 mb-0.5">
            <Lock className="w-3.5 h-3.5 text-slate-800" />
            <span>GOVERNANCE & AUDIT TRAIL</span>
            <span>·</span>
            <span>IMMUTABLE SYSTEM LOG</span>
          </div>
          <h1 className="fluid-heading font-bold text-slate-900 font-heading tracking-tight">
            Privacy & Security Audit Logs
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Immutable audit trail tracking all operator dispatch actions, privacy mask toggles, and system verification requests.
          </p>
        </div>
      </div>

      {/* 2. Audit Table Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs font-sans">
        <div className="responsive-table-wrapper">
          <table className="w-full text-left text-xs font-sans border-collapse min-w-[640px]">
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 font-mono shadow-xs">
              <tr>
                <th className="p-2.5">LOG ID</th>
                <th className="p-2.5">USER / OPERATOR</th>
                <th className="p-2.5">ACTION TYPE</th>
                <th className="p-2.5">TARGET RESOURCE</th>
                <th className="p-2.5">TIMESTAMP</th>
                <th className="p-2.5">IP ADDRESS</th>
                <th className="p-2.5">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold font-mono text-slate-900">#LOG-{log.id}</td>
                  <td className="p-3 font-bold text-slate-900">{log.user}</td>
                  <td className="p-3">
                    <span className="bg-slate-900 text-white px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{log.resource}</td>
                  <td className="p-3 text-slate-500 font-mono">{log.time}</td>
                  <td className="p-3 font-mono text-slate-500">{log.ip}</td>
                  <td className="p-3 text-emerald-700 font-bold uppercase font-mono">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
