// components/Navbar.js
import { Home, CalendarDays, User, Users, Plus, FileText, Search } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow border-b">
      {/* Logo e nome */}
      <div className="flex items-center gap-2 text-green-600 font-semibold text-lg">
        <FileText className="w-6 h-6" />
        Prema Imagem
      </div>

      {/* Campo de busca */}
      <div className="flex items-center gap-2 w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm text-gray-600 font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-green-600">
          <Home className="w-4 h-4" />
          Início
        </Link>
        <Link href="/agendamentos" className="flex items-center gap-1 hover:text-green-600">
          <CalendarDays className="w-4 h-4" />
          Agendamentos
        </Link>
        <Link href="/pacientes" className="flex items-center gap-1 hover:text-green-600">
          <User className="w-4 h-4" />
          Pacientes
        </Link>
        <Link href="/medicos" className="flex items-center gap-1 hover:text-green-600">
          <Users className="w-4 h-4" />
          Médicos
        </Link>

        {/* Botão de novo agendamento */}
        <Link href="/agendamentos/novo">
          <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
            Novo Agendamento
            <Plus className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </nav>
  );
}
