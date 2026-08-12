import React from 'react';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found'
}) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden font-sans shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#0F172A]">
          <thead className="bg-[#F8FAFC] text-[#64748B] uppercase text-[10px] font-bold tracking-wider border-b border-[#E2E8F0]">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-3.5 font-sans ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] font-medium">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-[#64748B] text-xs font-sans">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr key={row[keyField] || rowIdx} className="hover:bg-[#F1F5F9] transition-colors">
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`p-3.5 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                    >
                      {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
