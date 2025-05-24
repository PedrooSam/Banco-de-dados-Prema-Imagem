import Link from 'next/link';

export function StatCard({ title, value, percentage, color }) {
  const borderColor = color === 'green' ? 'border-l-green-500' : 'border-l-yellow-400';
  const textColor = color === 'green' ? 'text-green-600' : 'text-yellow-500';

  return (
    <div className={`border rounded-md p-4 w-[350px] h-[180px] max-w-xs border-l-4 ${borderColor} flex flex-col justify-center space-y-4 bg-white`}>
      <h3 className="text-gray-600 text-base font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className={`text-base mt-1 ${textColor}`}>
        {percentage} em relação à semana passada
      </p>
    </div>
  );
}
