import { Clock } from 'lucide-react';
import StatusBadge from '../statusBadge';


export default function AgendamentoCard({ item }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-50 rounded-full">
          <Clock className="w-5 h-5 opacity-100 text-gray-500" />
        </div>
        <div>
          <h3 className="font-semibold">{item.paciente?.nome}</h3>
          <p className="text-sm text-gray-500">{item.exame?.nome}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-bold text-gray-500">{item.dataHoraRealizacao}</span>
        <span className="text-sm text-gray-500">{item.medico?.nome}</span>
        <StatusBadge status={item.status} />
      </div>
    </div>
  );
}
