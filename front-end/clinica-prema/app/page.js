'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Home,
  Calendar,
  Users,
  UserCheck,
  Plus,
  Clock,
  CalendarDays,
  UserPlus,
  Stethoscope,
  FileText,
  CreditCard,
  DollarSign,
  BarChart3,
  Settings,
  ExternalLink,
  ListChecks,
  Filter as FilterIcon,
  TrendingUp,
  Package,
  PieChart,
  UsersRound,
  Gift,
  Warehouse,
  Truck,
  AlertTriangle
} from "lucide-react";

// Helper to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Updated initialDashboardCards to include all 17 items
const initialDashboardCards = [
  {
    id: "agendamentos",
    title: "Total de Agendamentos",
    value: "0",
    change: "Carregando...",
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    href: "/dashboard/agendamentos",
    icon: <CalendarDays className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  {
    id: "examesAgendados",
    title: "Total de Exames Agendados",
    value: "0",
    change: "Carregando...",
    borderColor: "border-l-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    href: "/dashboard/exames",
    icon: <ListChecks className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
  },
  {
    id: "totalPacientes",
    title: "Total de Pacientes",
    value: "0",
    change: "Carregando...",
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    href: "/pacientes",
    icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: "examesPorPeriodo",
    title: "Exames por Período do Dia",
    value: "Visualizar",
    change: "Análise detalhada por período",
    borderColor: "border-l-sky-500",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    href: "/dashboard/exames-periodo",
    icon: <Clock className="h-5 w-5 text-sky-600 dark:text-sky-400" />
  },
  {
    id: "contagemExamesMesAno",
    title: "Contagem Exames Mês/Ano",
    value: "Verificar",
    change: "Contagem de exames por mês e ano",
    borderColor: "border-l-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    href: "/dashboard/contagem-exames-mes-ano",
    icon: <Calendar className="h-5 w-5 text-pink-600 dark:text-pink-400" />
  },
  {
    id: "medicosMaisAtendimentos",
    title: "Médicos Mais Atendimentos",
    value: "Top 3",
    change: "Performance mensal",
    borderColor: "border-l-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    href: "/dashboard/medicos-mais-atendimentos",
    icon: <Stethoscope className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
  },
  {
    id: "examesFaixaEtaria",
    title: "Exames por Faixa Etária",
    value: "Detalhes",
    change: "Contagem por faixa etária",
    borderColor: "border-l-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    href: "/dashboard/exames-faixa-etaria",
    icon: <UsersRound className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
  },
  {
    id: "totalExamesDia",
    title: "Total Exames Agendados/Dia",
    value: "Consultar",
    change: "Contagem diária de tipos",
    borderColor: "border-l-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    href: "/dashboard/total-exames-dia",
    icon: <ListChecks className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />,
  },
  {
    id: "mediaExamesPaciente",
    title: "Média Exames/Paciente",
    value: "Analisar",
    change: "Média por agendamento",
    borderColor: "border-l-lime-500",
    bgColor: "bg-lime-50 dark:bg-lime-900/20",
    href: "/dashboard/media-exames-paciente",
    icon: <FileText className="h-5 w-5 text-lime-600 dark:text-lime-400" />,
  },
  {
    id: "examesAgendadosHora",
    title: "Exames Agendados por Hora",
    value: "Verificar",
    change: "Contagem por hora",
    borderColor: "border-l-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    href: "/dashboard/exames-agendados-hora",
    icon: <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
  },
  {
    id: "medicosMaisExames",
    title: "Médicos Mais Exames",
    value: "Ranking",
    change: "Total por médico",
    borderColor: "border-l-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    href: "/dashboard/medicos-mais-exames",
    icon: <UserCheck className="h-5 w-5 text-red-600 dark:text-red-400" />,
  },
  {
    id: "percentualExamesMedico",
    title: "Percentual Exames/Médico",
    value: "Analisar",
    change: "Participação nos totais",
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    href: "/dashboard/percentual-exames-medico",
    icon: <PieChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
  },
  {
    id: "pacientesMaisExames",
    title: "Pacientes Mais Exames",
    value: "Ranking",
    change: "Total por paciente",
    borderColor: "border-l-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    href: "/dashboard/pacientes-mais-exames",
    icon: <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
  },
  {
    id: "pacientesIndicacoes",
    title: "Pacientes que Indicam",
    value: "Verificar",
    change: "Pacientes que trouxeram novos",
    borderColor: "border-l-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    href: "/dashboard/pacientes-indicacoes",
    icon: <Gift className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
  },
  {
    id: "produtosMaisUtilizados",
    title: "Produtos Mais Utilizados",
    value: "Ranking",
    change: "Itens mais consumidos",
    borderColor: "border-l-fuchsia-500",
    bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    href: "/dashboard/produtos-mais-utilizados",
    icon: <Package className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />,
  },
  {
    id: "quantidadeProdutos",
    title: "Quantidade de Produtos",
    value: "Consultar",
    change: "Visão geral do inventário",
    borderColor: "border-l-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    href: "/dashboard/quantidade-produtos",
    icon: <Warehouse className="h-5 w-5 text-violet-600 dark:text-violet-400" />,
  },
  {
    id: "comprasFornecedor",
    title: "Compras por Fornecedor",
    value: "Analisar",
    change: "Total comprado por fornecedor",
    borderColor: "border-l-stone-500",
    bgColor: "bg-stone-50 dark:bg-stone-900/20",
    href: "/dashboard/compras-fornecedor",
    icon: <Truck className="h-5 w-5 text-stone-600 dark:text-stone-400" />,
  },
];


export default function HomePage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("manha");
  const [mostrarTodosAgendamentos, setMostrarTodosAgendamentos] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());

  // States for fetched data
  const [allPacientes, setAllPacientes] = useState([]);
  const [loadingPacientesData, setLoadingPacientesData] = useState(true);
  const [errorPacientesData, setErrorPacientesData] = useState(null);

  const [allExamesTipos, setAllExamesTipos] = useState([]);
  const [loadingExamesTiposData, setLoadingExamesTiposData] = useState(true);
  const [errorExamesTiposData, setErrorExamesTiposData] = useState(null);

  const [allAgendaExames, setAllAgendaExames] = useState([]);
  const [loadingAgendaExames, setLoadingAgendaExames] = useState(true);
  const [errorAgendaExames, setErrorAgendaExames] = useState(null);

  const [dashboardStats, setDashboardStats] = useState(initialDashboardCards);
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch All Pacientes
  useEffect(() => {
    const fetchPacientes = async () => {
      setLoadingPacientesData(true);
      try {
        const response = await fetch('http://localhost:8080/pacientes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ao buscar pacientes`);
        }
        const data = await response.json();
        setAllPacientes(data);
        setDashboardStats(prevStats => prevStats.map(stat =>
          stat.id === 'totalPacientes' ? { ...stat, value: data.length.toString(), change: `${data.length} pacientes cadastrados` } : stat
        ));
      } catch (e) {
        setErrorPacientesData(e.message);
        console.error("Failed to fetch pacientes:", e);
        setDashboardStats(prevStats => prevStats.map(stat =>
          stat.id === 'totalPacientes' ? { ...stat, value: "Erro", change: "Falha ao carregar" } : stat
        ));
      } finally {
        setLoadingPacientesData(false);
      }
    };
    fetchPacientes();
  }, []);

  // Fetch All Exame Types
  useEffect(() => {
    const fetchExamesTipos = async () => {
      setLoadingExamesTiposData(true);
      try {
        const response = await fetch('http://localhost:8080/exames');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ao buscar tipos de exames`);
        }
        const data = await response.json();
        setAllExamesTipos(data);
      } catch (e) {
        setErrorExamesTiposData(e.message);
        console.error("Failed to fetch exame tipos:", e);
      } finally {
        setLoadingExamesTiposData(false);
      }
    };
    fetchExamesTipos();
  }, []);


  // Fetch All Agenda de Exames (once)
  useEffect(() => {
    const fetchAllAgendaExamesData = async () => {
      setLoadingAgendaExames(true);
      try {
        const response = await fetch('http://localhost:8080/agenda-exames');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ao buscar todos os agendamentos`);
        }
        const data = await response.json();
        setAllAgendaExames(Array.isArray(data) ? data : []);

        setDashboardStats(prevStats => {
          const totalAgendamentos = Array.isArray(data) ? data.length : 0;
          const totalExamesAgendados = totalAgendamentos; 

          return prevStats.map(stat => {
            if (stat.id === 'agendamentos') {
              return { ...stat, value: totalAgendamentos.toString(), change: `${totalAgendamentos} agendamentos no total` };
            }
            if (stat.id === 'examesAgendados') {
              return { ...stat, value: totalExamesAgendados.toString(), change: `${totalExamesAgendados} exames agendados no total` };
            }
            return stat;
          });
        });

      } catch (e) {
        setErrorAgendaExames(e.message);
        setAllAgendaExames([]);
        console.error("Failed to fetch all agenda de exames:", e);
         setDashboardStats(prevStats => prevStats.map(stat => {
          if (stat.id === 'agendamentos' || stat.id === 'examesAgendados') {
            return { ...stat, value: "Erro", change: "Falha ao carregar" };
          }
          return stat;
        }));
      } finally {
        setLoadingAgendaExames(false);
      }
    };
    fetchAllAgendaExamesData();
  }, []);

  // Update combined loading state for dashboard
   useEffect(() => {
    if (!loadingPacientesData && !loadingAgendaExames && !loadingExamesTiposData) {
      setLoadingStats(false);
    }
  }, [loadingPacientesData, loadingAgendaExames, loadingExamesTiposData]);


  const getPeriodo = (dataHora) => {
    if (!dataHora) return "indefinido";
    try {
      const hora = new Date(dataHora).getHours();
      if (hora >= 5 && hora < 12) return "manha";
      if (hora >= 12 && hora < 18) return "tarde";
      if (hora >= 18 && hora < 24) return "noite";
      return "madrugada";
    } catch (error) {
      console.error("Error parsing date for periodo: ", dataHora, error);
      return "indefinido";
    }
  };

  const formatHorario = (dataHora) => {
    if (!dataHora) return "N/A";
    try {
      return new Date(dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting horario: ", dataHora, error);
      return "N/A";
    }
  };

  const formatDate = (dataHora) => {
    if (!dataHora) return "N/A";
    try {
      return new Date(dataHora).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    } catch (error) {
      console.error("Error formatting date: ", dataHora, error);
      return "N/A";
    }
  }


  const agendamentosAtivos = () => {
    if (loadingAgendaExames || loadingPacientesData || loadingExamesTiposData) return [];
    
    let filteredAgendamentos = [...allAgendaExames];

    if (selectedDate) {
      filteredAgendamentos = filteredAgendamentos.filter(ag => ag.dataHoraRealizacao && ag.dataHoraRealizacao.startsWith(selectedDate));
    }

    if (searchTerm.trim() !== "") {
      filteredAgendamentos = filteredAgendamentos.filter(ag =>
        ag.medicoRequisitante && ag.medicoRequisitante.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== "todos") {
      filteredAgendamentos = filteredAgendamentos.filter(ag => ag.status && ag.status.toLowerCase() === selectedStatus);
    }

    const agendamentosComPeriodo = filteredAgendamentos.map(ag => {
      const paciente = allPacientes.find(p => p.id === ag.idPaciente);
      const exameTipo = allExamesTipos.find(et => et.id === ag.idExame);

      return {
        ...ag,
        // Use a combination of fields for a more unique key if 'id' from backend is not guaranteed for agendamento itself
        processedKey: ag.id || `${ag.dataHoraRealizacao}-${ag.idPaciente}-${ag.idExame}-${ag.medicoRequisitante || ''}`,
        horarioDisplay: formatHorario(ag.dataHoraRealizacao),
        dataDisplay: formatDate(ag.dataHoraRealizacao), // Add formatted date for display
        pacienteDisplay: paciente ? paciente.nome : `Paciente ID: ${ag.idPaciente || 'N/A'}`,
        exameDisplay: exameTipo ? exameTipo.nome : `Exame ID: ${ag.idExame || 'N/A'}`,
        medicoDisplay: ag.medicoRequisitante || 'Médico não informado',
        statusDisplay: ag.status ? ag.status.charAt(0).toUpperCase() + ag.status.slice(1) : 'Status não informado',
        statusColor: ag.status === "agendado" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                   : ag.status === "realizado" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                   : ag.status === "cancelado" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                   : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        periodoComputed: getPeriodo(ag.dataHoraRealizacao),
        periodoColor: getPeriodo(ag.dataHoraRealizacao) === "manha" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    : getPeriodo(ag.dataHoraRealizacao) === "tarde" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                    : getPeriodo(ag.dataHoraRealizacao) === "noite" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      };
    }).sort((a, b) => new Date(a.dataHoraRealizacao) - new Date(b.dataHoraRealizacao));


    if (mostrarTodosAgendamentos) {
      return agendamentosComPeriodo;
    }
    
    return agendamentosComPeriodo.filter(ag => ag.periodoComputed === periodoSelecionado);
  };

  const acessoRapido = [
    { title: "Agendar Exame", icon: CalendarDays, href: "/agendamentos/novo" },
    { title: "Novo Paciente", icon: UserPlus, href: "/pacientes/novo" },
    { title: "Novo Médico", icon: UserCheck, href: "/medicos/novo" },
    { title: "Novo Tipo de Exame", icon: Stethoscope, href: "/exames/novo" },
    { title: "Registrar Pagamento", icon: CreditCard, href: "/pagamentos" },
  ];

  const isAgendamentosListLoading = loadingAgendaExames || loadingPacientesData || loadingExamesTiposData;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  PremaImagem
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sistema de Gestão</p>
              </div>
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar pacientes, exames, médicos..."
                  className="pl-12 pr-4 py-3 w-full rounded-full border-0 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <nav className="flex items-center space-x-1 sm:space-x-2">
              <Link href="/" passHref>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Home className="h-4 w-4" />
                  <span className="hidden md:inline text-sm">Início</span>
                </Button>
              </Link>
              <Link href="/dashboard/agendamentos" passHref>
                 <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden md:inline text-sm">Agendamentos</span>
                </Button>
              </Link>
               <Link href="/pacientes" passHref>
                 <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Users className="h-4 w-4" />
                    <span className="hidden md:inline text-sm">Pacientes</span>
                  </Button>
              </Link>
              <Link href="/agendamentos/novo" passHref>
                <Button className="ml-2 sm:ml-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm">
                  <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Novo Agendamento</span>
                  <span className="sm:hidden">Novo</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Painel de Controle Section */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Painel de Controle</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Métricas e indicadores principais da clínica</p>
            </div>
          </div>
          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {dashboardStats.map((stat, index) => (
                <CarouselItem key={stat.id || index} className="pl-2 md:pl-4 basis-full xxs:basis-1/2 xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Link href={stat.href} className="block h-full group">
                    <Card
                      className={`${stat.borderColor} border-l-4 ${stat.bgColor} dark:bg-gray-800/70 h-full cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-all duration-300 rounded-xl overflow-hidden group-hover:border-l-[6px] flex flex-col justify-between`}
                    >
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {stat.title}
                          </CardTitle>
                          {stat.icon && <span className="opacity-70 group-hover:opacity-100 transition-opacity text-gray-600 dark:text-gray-400">{stat.icon}</span>}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 pb-3 px-4">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300 origin-bottom-left">
                          {loadingStats ? "..." : stat.value}
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-tight">
                           {loadingStats ? "Carregando..." : stat.change}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex hover:bg-green-50 dark:hover:bg-green-900/50 hover:border-green-200 transition-colors" />
            <CarouselNext className="hidden sm:flex hover:bg-green-50 dark:hover:bg-green-900/50 hover:border-green-200 transition-colors" />
          </Carousel>
        </div>
        
        <Card className="mb-6 sm:mb-8 shadow-lg rounded-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
                    <FilterIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Filtrar Agendamentos</CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Refine a busca por data, médico requisitante ou status.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input 
                  placeholder="Buscar por Médico Requisitante..." 
                  className="pl-10 py-3 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="py-3 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Status do Agendamento" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <label htmlFor="filter-date" className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">Data do Agendamento</label>
                  <Input 
                    id="filter-date"
                    type="date" 
                    className="py-3 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => setSelectedDate("")}
                  variant="outline" 
                  className="py-3 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs h-[46px]"
                  title="Limpar data"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl rounded-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <CalendarDays className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Agendamentos {selectedDate ? `para ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}` : "(Todas as Datas)"}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                      {searchTerm && `Médico Req.: "${searchTerm}" | `}
                      {selectedStatus !== "todos" && `Status: ${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} | `}
                      Exames agendados
                    </CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setMostrarTodosAgendamentos(!mostrarTodosAgendamentos);
                    if (mostrarTodosAgendamentos) {
                      setPeriodoSelecionado("manha");
                    }
                  }}
                  variant="outline"
                  className="rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/50 transition-all duration-200 shadow-sm text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                >
                  {mostrarTodosAgendamentos ? "Ver por Período" : "Ver Todos os Períodos"}
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                {!mostrarTodosAgendamentos && (
                  <div className="grid grid-cols-2 sm:flex sm:space-x-2 gap-2 sm:gap-0 mb-6 p-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    {["manha", "tarde", "noite", "madrugada"].map(periodo => (
                      <Button
                        key={periodo}
                        onClick={() => setPeriodoSelecionado(periodo)}
                        className={`flex-1 rounded-lg py-2.5 px-2 sm:px-4 font-medium transition-all duration-200 text-xs sm:text-sm shadow-sm hover:shadow-md
                          ${periodoSelecionado === periodo
                            ? (periodo === "manha" ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white transform scale-105"
                              : periodo === "tarde" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white transform scale-105"
                              : periodo === "noite" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white transform scale-105"
                              : "bg-gradient-to-r from-purple-500 to-pink-600 text-white transform scale-105")
                            : "text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                      >
                        {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
                      </Button>
                    ))}
                  </div>
                )}

                {mostrarTodosAgendamentos && agendamentosAtivos().length > 0 && (
                  <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-blue-100 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Todos os Agendamentos {selectedDate ? `para ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}` : "(Todas as Datas)"}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Total de <span className="font-semibold text-blue-600 dark:text-blue-400">{agendamentosAtivos().length} agendamentos</span> programados.
                    </p>
                  </div>
                )}
                
                {isAgendamentosListLoading && <p className="text-center text-gray-500 dark:text-gray-400 py-4">Carregando agendamentos...</p>}
                {errorAgendaExames && !isAgendamentosListLoading && <p className="text-center text-red-500 dark:text-red-400 py-4">Erro ao carregar agendamentos: {errorAgendaExames}</p>}
                {!isAgendamentosListLoading && !errorAgendaExames && agendamentosAtivos().length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    Nenhum agendamento encontrado para os filtros selecionados.
                  </p>
                )}

                {!isAgendamentosListLoading && !errorAgendaExames && agendamentosAtivos().length > 0 && (
                  <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2 custom-scrollbar">
                    {agendamentosAtivos().map((agendamento) => (
                      <div
                        key={agendamento.processedKey} // Using the generated stable key
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-700/80 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/60 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0 flex-grow">
                           {/* Date and Time Icon */}
                          <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-105 transition-transform duration-200 p-1">
                            <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 leading-tight">{agendamento.dataDisplay}</span>
                            <Clock className={`h-4 w-4 mt-0.5 ${agendamento.statusColor.includes('green') ? 'text-green-500' : agendamento.statusColor.includes('yellow') ? 'text-yellow-500' : agendamento.statusColor.includes('red') ? 'text-red-500' : 'text-gray-500'}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {agendamento.pacienteDisplay}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{agendamento.exameDisplay}</p>
                          </div>
                        </div>

                        <div className="text-left sm:text-center my-2 sm:my-0 sm:mx-4 flex-shrink-0">
                          <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">{agendamento.horarioDisplay}</p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{agendamento.medicoDisplay}</p>
                           {mostrarTodosAgendamentos && agendamento.periodoComputed && (
                            <Badge variant="outline" className={`text-[10px] mt-1 ${agendamento.periodoColor} border-opacity-50`}>
                              {agendamento.periodoComputed.charAt(0).toUpperCase() + agendamento.periodoComputed.slice(1)}
                            </Badge>
                          )}
                        </div>

                        <Badge className={`${agendamento.statusColor} rounded-md px-2.5 py-1 text-xs font-medium shadow-sm self-start sm:self-center`}>
                          {agendamento.statusDisplay}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-800/70 border-0 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Acesso Rápido
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                      Principais ações do sistema
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {acessoRapido.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link key={index} href={item.href} passHref>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-auto py-3 px-4 text-left bg-white/50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-300 group rounded-lg"
                        >
                          <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300 text-sm">
                            {item.title}
                          </span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    PremaImagem
                  </span>
                  <p className="text-xs text-gray-300">Sistema de Gestão</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sistema completo de gestão para clínicas de exames médicos,
                oferecendo controle total sobre agendamentos, pacientes e relatórios.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Links Rápidos</h3>
              <div className="space-y-2">
                {["Agendamentos", "Pacientes", "Médicos", "Exames", "Relatórios"].map(link => (
                  <Link key={link} href={`/${link.toLowerCase().replace('ó', 'o').replace('ç', 'c')}`} className="block text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Suporte</h3>
              <div className="space-y-2 text-sm">
                {[
                  { text: "Sistema Online", color: "bg-green-400" },
                  { text: "Suporte 24/7", color: "bg-blue-400" },
                  { text: "Atualizações Automáticas", color: "bg-purple-400" }
                ].map(item => (
                  <div key={item.text} className="flex items-center space-x-2 text-gray-300">
                    <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()} PremaImagem. Todos os direitos reservados.
              </p>
              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-right">
                <span className="text-gray-400 text-xs sm:text-sm">Versão 1.0.0</span>
                <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">•</span>
                <span className="text-gray-400 text-xs sm:text-sm">Sistema de Gestão Clínica</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
