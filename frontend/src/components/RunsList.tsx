import React from 'react';
import type { Run } from '../api/client';

type Props = { runs: Run[] };

export default function RunsList({ runs }: Props) {
  if (!runs.length) return null;
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Ejecuciones recientes (MongoDB)</h2>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Fecha</th>
              <th className="th">Capacidad</th>
              <th className="th">Seleccionados</th>
              <th className="th">Ganancia</th>
              <th className="th">Costo</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r._id}>
                <td className="td">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="td">{r.input.capacidad}</td>
                <td className="td">{r.result.seleccionados.join(', ') || '—'}</td>
                <td className="td">{r.result.ganancia_total}</td>
                <td className="td">{r.result.peso_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}