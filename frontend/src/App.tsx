import React, { useEffect, useState } from 'react';
import api, { fetchRuns, Run } from './api/client';
import ProjectForm, { OptimizarBody } from './components/ProjectForm';
import ResultsCard from './components/ResultsCard';
import ProjectsChart from './components/ProjectsChart';
import RunsList from './components/RunsList';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ seleccionados: string[]; ganancia_total: number; peso_total: number } | null>(null);
  const [chartData, setChartData] = useState<{ nombre: string; peso: number; ganancia: number }[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);

  const loadRuns = async () => {
    try {
      const data = await fetchRuns(10, 1);
      setRuns(data.items);
    } catch (_) {}
  };

  useEffect(() => { loadRuns(); }, []);

  const handleSubmit = async (payload: OptimizarBody) => {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/optimizar', payload);
      setResult(data);
      setChartData(payload.objetos);
      await loadRuns();
    } catch (e: any) {
      setError(e?.response?.data?.error ? JSON.stringify(e.response.data.error) : 'Error al conectar con el backend');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setError(null);
    setResult(null);
    setChartData([]);
  };

  return (
    <div className="container space-y-4">
      <h1 className="text-2xl font-bold">Optimización de Portafolio (Knapsack 0/1)</h1>
      <ProjectForm onSubmit={handleSubmit} onClear={handleClear} loading={loading} />

      {error && <div className="card text-red-700">{error}</div>}
      {result && <ResultsCard {...result} />}
      <ProjectsChart data={chartData} />
      <RunsList runs={runs} />

      <footer className="text-sm text-gray-500 py-6">Backend: {import.meta.env.VITE_API_BASE_URL}</footer>
    </div>
  );
}