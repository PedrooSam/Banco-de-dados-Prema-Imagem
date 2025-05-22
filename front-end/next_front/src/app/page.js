'use client';

import { useEffect, useState } from 'react';


export default function Home() {
  
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/agendamentos-exames')
      .then((res) => res.json())
      .then((data) => setAgendamentos(data))
      .catch((err) => console.error('Erro ao buscar agendamentos:', err));
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Agendamentos de Exames</h1>
      <ul className="space-y-3">
        {agendamentos.map((agendamento, index) => (
          <li key={index} className="border rounded p-4 shadow">
            <p><strong>Data/Hora:</strong> {new Date(agendamento.dataHoraRealizacao).toLocaleString()}</p>
            <p><strong>Médico Requisitante:</strong> {agendamento.medicoRequisitante}</p>
            <p><strong>Status:</strong> {agendamento.status}</p>
            <p><strong>Laudo:</strong> {agendamento.laudo || '—'}</p>
            <p><strong>ID Paciente:</strong> {agendamento.idPaciente}</p>
            <p><strong>ID Médico:</strong> {agendamento.idMedico}</p>
            <p><strong>ID Exame:</strong> {agendamento.idExame}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
