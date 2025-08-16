import React, { useMemo, useState } from 'react';
import ProjectRow, { Project } from './ProjectRow';

export type OptimizarBody = {
  capacidad: number;
  objetos: { nombre: string; peso: number; ganancia: number }[];
};

type Props = {
  onSubmit: (payload: OptimizarBody) => void;
  onClear: () => void;
  loading?: boolean;
};

export default function ProjectForm({ onSubmit, onClear, loading }: Props) {
  const [capacidad, setCapacidad] = useState<number | ''>('');
  const [rows, setRows] = useState<Project[]>([
    { id: crypto.randomUUID(), nombre: 'A', peso: 2000, ganancia: 1500 },
    { id: crypto.randomUUID(), nombre: 'B', peso: 4000, ganancia: 3500 },
  ]);

  const isValid = useMemo(() => {
    if (capacidad === '' || capacidad < 0) return false;
    if (rows.length === 0) return false;
    return rows.every(r => r.nombre.trim() && r.peso !== '' && r.peso >= 0 && r.ganancia !== '' && r.ganancia >= 0);
  }, [capacidad, rows]);

  const addRow = () => setRows(prev => [...prev, { id: crypto.randomUUID(), nombre: '', peso: '', ganancia: '' }]);
  const updateRow = (p: Project) => setRows(prev => prev.map(r => (r.id === p.id ? p : r)));
  const removeRow = (id: string) => setRows(prev => prev.filter(r => r.id !== id));

  const handleClear = () => {
    setCapacidad('');
    setRows([]);
    onClear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const payload: OptimizarBody = {
      capacidad: Number(capacidad),
      objetos: rows.map(r => ({ nombre: r.nombre.trim(), peso: Number(r.peso), ganancia: Number(r.ganancia) })),
    };
    onSubmit(payload);
  };

  return (
    <form className="card space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Capacidad</label>
          <input
            className="input"
            type="number"
            min={0}
            placeholder="p.ej. 10000"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </div>
        <div className="md:col-span-3 flex items-end gap-2">
          <button type="button" className="btn" onClick={addRow}>Agregar proyecto</button>
          <button type="button" className="btn" onClick={handleClear}>Limpiar</button>
          <button type="submit" className="btn" disabled={!isValid || !!loading}>
            {loading ? 'Calculando…' : 'Calcular'}
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Proyecto</th>
              <th className="th">Costo (peso)</th>
              <th className="th">Ganancia</th>
              <th className="th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <ProjectRow key={r.id} project={r} onChange={updateRow} onRemove={removeRow} />
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}