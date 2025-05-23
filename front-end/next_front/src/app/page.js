'use client';

import { useEffect, useState } from 'react';
import AgendamentoCard from '../components/agendamentoCard';

export default function Home() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
  const fetchAgendamentos = async () => {
    try {
      const res = await fetch('http://localhost:8080/agenda-exames');
      const data = await res.json();

      const agendamentosComDetalhes = await Promise.all(
        data.map(async (agendamento) => {
          console.log("Agendamento original da API:", agendamento);
          try {
            const medicoRes = await fetch(`http://localhost:8080/medicos/${agendamento.idMedico}`);
            const medico = await medicoRes.json();

            const pacienteRes = await fetch(`http://localhost:8080/pacientes/id/${agendamento.idPaciente}`);
            const paciente = await pacienteRes.json();

            const exameRes = await fetch(`http://localhost:8080/exames/${agendamento.idExame}`);
            const exame = await exameRes.json();

            return { ...agendamento, medico, paciente, exame };
          } catch (err) {
            console.error("Erro ao buscar dados relacionados:", err);
            return { ...agendamento, medico: null, paciente: null, exame: null };
          }
        })
      );

      setAgendamentos(agendamentosComDetalhes);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  fetchAgendamentos();
}, []);


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-700">Agendamentos do Dia</h2>
          <p className="text-gray-500">Visualize e gerencie os exames agendados para hoje</p>
        </div>
        <button className="text-green-600 font-semibold">Ver Todos</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 bg-green-100 text-green-700 rounded">Manhã</button>
        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded">Tarde</button>
      </div>

      <div className="space-y-3">
        {agendamentos.map((item, index) => (
          <AgendamentoCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}