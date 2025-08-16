import React from 'react';

export type Project = { id: string; nombre: string; peso: number | ''; ganancia: number | '' };

type Props = {
  project: Project;
  onChange: (p: Project) => void;
  onRemove: (id: string) => void;
};

export default function ProjectRow({ project, onChange, onRemove }: Props) {
  return (
    <tr>
      <td className="td">
        <input
          className="input"
          placeholder="ID/Nombre"
          value={project.nombre}
          onChange={(e) => onChange({ ...project, nombre: e.target.value })}
        />
      </td>
      <td className="td">
        <input
          className="input"
          type="number"
          min={0}
          placeholder="Costo (peso)"
          value={project.peso}
          onChange={(e) => onChange({ ...project, peso: e.target.value === '' ? '' : Number(e.target.value) })}
        />
      </td>
      <td className="td">
        <input
          className="input"
          type="number"
          min={0}
          placeholder="Ganancia"
          value={project.ganancia}
          onChange={(e) => onChange({ ...project, ganancia: e.target.value === '' ? '' : Number(e.target.value) })}
        />
      </td>
      <td className="td">
        <button className="btn" onClick={() => onRemove(project.id)}>Eliminar</button>
      </td>
    </tr>
  );
}