import { Calendar, User, Users, FileText, CreditCard } from 'lucide-react';
import { QuickAccessItem } from '../acessoRapidoItem';

export function QuickAccess() {
  const handleClick = (label) => {
    // Aqui você pode implementar navegação, por exemplo com next/router
    console.log('Clicou em:', label);
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-xl max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Acesso Rápido</h2>
      <p className="text-gray-500 mb-6">
        Acesse as principais funcionalidades do sistema
      </p>

      <div className="flex flex-col gap-3">
        <QuickAccessItem
          icon={<Calendar className="w-5 h-5" />}
          label="Agendamento de Exames"
          onClick={() => handleClick('Agendamento de Exames')}
        />
        <QuickAccessItem
          icon={<User className="w-5 h-5" />}
          label="Cadastro de Pacientes"
          onClick={() => handleClick('Cadastro de Pacientes')}
        />
        <QuickAccessItem
          icon={<Users className="w-5 h-5" />}
          label="Cadastro de Médicos"
          onClick={() => handleClick('Cadastro de Médicos')}
        />
        <QuickAccessItem
          icon={<FileText className="w-5 h-5" />}
          label="Cadastro de Exames"
          onClick={() => handleClick('Cadastro de Exames')}
        />
        <QuickAccessItem
          icon={<CreditCard className="w-5 h-5" />}
          label="Gestão de Pagamentos"
          onClick={() => handleClick('Gestão de Pagamentos')}
        />
      </div>
    </section>
  );
}
