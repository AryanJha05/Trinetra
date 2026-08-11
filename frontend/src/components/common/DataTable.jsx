import React from 'react';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found'
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-800">
          <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-3 font-mono ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-6 text-center text-slate-500 text-xs">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr key={row[keyField] || rowIdx} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`p-3 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
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
