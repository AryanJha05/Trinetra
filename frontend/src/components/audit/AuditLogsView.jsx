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
    <div className="w-full space-y-4 font-sans text-[#0F172A] select-none">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#64748B] mb-1 font-sans">
            <Lock className="w-3.5 h-3.5 text-[#0F172A]" />
            <span className="font-semibold text-[#0F172A]">GOVERNANCE & AUDIT TRAIL</span>
            <span>·</span>
            <span>IMMUTABLE SYSTEM LOG</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
            Privacy & Security Audit Logs
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Immutable audit trail tracking all operator dispatch actions, privacy mask toggles, and system verification requests.
          </p>
        </div>
      </div>

      {/* 2. Audit Table Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs font-sans">
        <div className="responsive-table-wrapper">
          <table className="w-full text-left text-xs font-sans border-collapse min-w-[640px]">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase text-[10px] font-bold tracking-wider border-b border-[#E2E8F0] font-sans">
              <tr>
                <th className="p-3">LOG ID</th>
                <th className="p-3">USER / OPERATOR</th>
                <th className="p-3">ACTION TYPE</th>
                <th className="p-3">TARGET RESOURCE</th>
                <th className="p-3">TIMESTAMP</th>
                <th className="p-3">IP ADDRESS</th>
                <th className="p-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#334155] font-medium">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="p-3 font-bold font-mono text-[#0F172A]">#LOG-{log.id}</td>
                  <td className="p-3 font-bold text-[#0F172A] font-sans">{log.user}</td>
                  <td className="p-3">
                    <span className="bg-[#0F172A] text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[#64748B]">{log.resource}</td>
                  <td className="p-3 text-[#64748B] font-mono">{log.time}</td>
                  <td className="p-3 font-mono text-[#64748B]">{log.ip}</td>
                  <td className="p-3 text-[#047857] font-semibold uppercase font-mono">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
