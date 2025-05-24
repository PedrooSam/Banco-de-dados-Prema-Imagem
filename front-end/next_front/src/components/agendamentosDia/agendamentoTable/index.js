import { AgendamentoCard } from '../agendamentoCard';

export function AgendamentoTable({ agendamentos }) {
    return(
      <div className="p-6 bg-white rounded-lg shadow-xl ml-4 w-11/16">
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
  
        <div className="flex-1 overflow-y-auto max-h-[500px] space-y-3">
          {agendamentos.map((item, index) => (
            <AgendamentoCard key={index} item={item} />
          ))}
        </div>
      </div>
    )
}