import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export type ChartItem = { nombre: string; peso: number; ganancia: number };

type Props = { data: ChartItem[] };

export default function ProjectsChart({ data }: Props) {
  if (!data.length) return null;
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Comparativa de proyectos</h2>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ganancia" name="Ganancia" />
            <Bar dataKey="peso" name="Costo (peso)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}