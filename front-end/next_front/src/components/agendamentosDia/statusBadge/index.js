// Esse arquivo possui o ícone de status do exame na div de agendamentos da home

export function StatusBadge({ status }) {
  const statusColors = {
    realizado: "bg-green-100 text-green-700",
    agendado: "bg-yellow-100 text-yellow-700",
    cancelado: "bg-red-100 text-red-700",
  };

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}