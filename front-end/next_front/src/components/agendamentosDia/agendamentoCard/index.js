import { Clock } from 'lucide-react';
import { StatusBadge } from '../statusBadge';
import Link from 'next/link';


export function AgendamentoCard({ item }) {

  function formatDate(dateString) {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
  }

  return (
      <Link href={`/agenda-exames/${item.medico.id}/${item.paciente.id}/${item.exame.id}/${item.dataHoraRealizacao}`}>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Clock className="w-5 h-5 opacity-100 text-gray-500" />
            </div>
            {/* Gambiarra para alinhar os horários */}
            <div className='w-70 truncate'>
              <h3 className="font-semibold text-gray-600">{item.paciente?.nome}</h3>
              <p className="text-sm text-gray-500">{item.exame?.nome}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-gray-500">{formatDate(item.dataHoraRealizacao)}</span>
            <span className="text-sm text-gray-500">{item.medico?.nome}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StatusBadge status={item.status} />
          </div>
        </div>
      </Link>
  );
}
