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
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Lock className="w-5 h-5 text-slate-900" />
          Privacy & RBAC Security Audit Logs
        </h2>
        <p className="text-xs text-slate-500 font-sans mt-0.5">Immutable governance log tracking every access, privacy face blur toggle, and RPF dispatch action</p>
      </div>

      <div className="bg-white border border-[#E4E4DF] rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F4F4F0] text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-[#E4E4DF]">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">User / System ID</th>
                <th className="p-3">Action Type</th>
                <th className="p-3">Target Resource</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">#LOG-{log.id}</td>
                  <td className="p-3 font-sans font-bold text-slate-900">{log.user}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{log.resource}</td>
                  <td className="p-3 text-slate-500">{log.time}</td>
                  <td className="p-3 text-slate-500">{log.ip}</td>
                  <td className="p-3 text-emerald-700 font-bold">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
