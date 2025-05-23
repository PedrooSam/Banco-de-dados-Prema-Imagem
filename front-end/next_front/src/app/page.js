'use client';

import { useEffect, useState } from 'react';
import { AgendamentoTable } from '../components/agendamentosDia/agendamentoTable';
import { QuickAccess } from "../components/acessoRapido/acessoRapidoTable";

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
    <div className="flex gap-8">
      <AgendamentoTable agendamentos={agendamentos} />
      <QuickAccess />
    </div>
  );
}