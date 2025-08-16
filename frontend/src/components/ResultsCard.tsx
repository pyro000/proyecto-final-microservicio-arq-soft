import React from 'react';

type Props = {
  seleccionados: string[];
  ganancia_total: number;
  peso_total: number;
};

export default function ResultsCard({ seleccionados, ganancia_total, peso_total }: Props) {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Resultados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-600">Seleccionados</div>
          <div className="font-medium">{seleccionados.length ? `{ ${seleccionados.join(', ')} }` : '—'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Ganancia total</div>
          <div className="font-medium">{ganancia_total}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Peso total</div>
          <div className="font-medium">{peso_total}</div>
        </div>
      </div>
    </div>
  );
}