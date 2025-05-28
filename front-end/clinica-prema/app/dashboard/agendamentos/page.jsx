'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Home, Calendar, Users, UserCheck, Plus, Clock, TrendingUp, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";

// Helper to get today's date in<y_bin_46>-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper functions
const getPeriodo = (dataHora) => {
  if (!dataHora) return "indefinido";
  try {
    const hora = new Date(dataHora).getHours();
    if (hora >= 6 && hora < 12) return "manha";
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


export default function DashboardAgendamentosPage() {
  // Data states
  const [allPacientes, setAllPacientes] = useState([]);
  const [allExamesTipos, setAllExamesTipos] = useState([]);
  const [allAgendaExames, setAllAgendaExames] = useState([]);

  // Loading states
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [loadingExamesTipos, setLoadingExamesTipos] = useState(true);
  const [loadingAgendaExames, setLoadingAgendaExames] = useState(true);

  // Error states
  const [errorPacientes, setErrorPacientes] = useState(null);
  const [errorExamesTipos, setErrorExamesTipos] = useState(null);
  const [errorAgendaExames, setErrorAgendaExames] = useState(null);
  
  const [processedAgendamentos, setProcessedAgendamentos] = useState({
    manha: [],
    tarde: [],
    noite: [],
    madrugada: [],
  });

  const [estatisticas, setEstatisticas] = useState([
    { titulo: "Total Agendado", valor: "0", icone: Calendar, cor: "text-blue-600 dark:text-blue-400", bgCor: "bg-blue-50 dark:bg-blue-900/30" },
    { titulo: "Confirmados", valor: "0", icone: Clock, cor: "text-yellow-600 dark:text-yellow-400", bgCor: "bg-yellow-50 dark:bg-yellow-900/30"  },
    { titulo: "Realizados", valor: "0",icone: TrendingUp, cor: "text-green-600 dark:text-green-400", bgCor: "bg-green-50 dark:bg-green-900/30" },
    { titulo: "Cancelados", valor: "0", icone: FileText, cor: "text-red-600 dark:text-red-400", bgCor: "bg-red-50 dark:bg-red-900/30" },
  ]);

  const isLoading = loadingPacientes || loadingExamesTipos || loadingAgendaExames;
  const fetchError = errorPacientes || errorExamesTipos || errorAgendaExames;

  // Fetch Pacientes
  useEffect(() => {
    const fetchPacientesData = async () => {
      setLoadingPacientes(true);
      try {
        const response = await fetch('http://localhost:8080/pacientes');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status} ao buscar pacientes`);
        const data = await response.json();
        setAllPacientes(data);
        setErrorPacientes(null);
      } catch (e) {
        setErrorPacientes(e.message);
        console.error("Failed to fetch pacientes:", e);
      } finally {
        setLoadingPacientes(false);
      }
    };
    fetchPacientesData();
  }, []);

  // Fetch Exame Types
  useEffect(() => {
    const fetchExamesTiposData = async () => {
      setLoadingExamesTipos(true);
      try {
        const response = await fetch('http://localhost:8080/exames');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status} ao buscar tipos de exames`);
        const data = await response.json();
        setAllExamesTipos(data);
        setErrorExamesTipos(null);
      } catch (e) {
        setErrorExamesTipos(e.message);
        console.error("Failed to fetch exame tipos:", e);
      } finally {
        setLoadingExamesTipos(false);
      }
    };
    fetchExamesTiposData();
  }, []);

  // Fetch AgendaExames
  useEffect(() => {
    const fetchAgendaExamesData = async () => {
      setLoadingAgendaExames(true);
      try {
        const response = await fetch('http://localhost:8080/agenda-exames');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status} ao buscar agendamentos`);
        const data = await response.json();
        // Ensure data is an array before setting
        setAllAgendaExames(Array.isArray(data) ? data : []);
        setErrorAgendaExames(null);
      } catch (e) {
        setErrorAgendaExames(e.message);
        setAllAgendaExames([]); // Set to empty array on error
        console.error("Failed to fetch agenda exames:", e);
      } finally {
        setLoadingAgendaExames(false);
      }
    };
    fetchAgendaExamesData();
  }, []);

  // Process data when all fetches are complete
  useEffect(() => {
    if (!isLoading && !fetchError && Array.isArray(allAgendaExames) && Array.isArray(allPacientes) && Array.isArray(allExamesTipos)) {
      // Process ALL agendamentos for period categorization
      const todosOsAgendamentosProcessados = allAgendaExames
        .map(ag => {
          // Ensure ag is an object and has necessary properties
          if (typeof ag !== 'object' || ag === null) return null;

          const paciente = allPacientes.find(p => p.id === ag.idPaciente);
          const exameTipo = allExamesTipos.find(et => et.id === ag.idExame);
          let displayStatus = "Desconhecido";
          let statusColor = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

          if (ag.status) {
            const lowerStatus = String(ag.status).toLowerCase();
            if (lowerStatus === "agendado") {
              displayStatus = "Confirmado";
              statusColor = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            } else if (lowerStatus === "realizado") {
              displayStatus = "Realizado";
              statusColor = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            } else if (lowerStatus === "cancelado") {
              displayStatus = "Cancelado";
              statusColor = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            } else if (lowerStatus === "aguardando") {
                displayStatus = "Aguardando";
                statusColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            }
          }
          // Create a more stable key if ag.id is not present or not unique for the agendamento itself
          const key = ag.id || `${ag.dataHoraRealizacao}-${ag.idPaciente}-${ag.idExame}-${ag.medicoRequisitante || ''}`;

          return {
            ...ag,
            processedKey: key, // Use this for React keys
            paciente: paciente ? paciente.nome : `Paciente ID: ${ag.idPaciente || 'N/A'}`,
            exame: exameTipo ? exameTipo.nome : `Exame ID: ${ag.idExame || 'N/A'}`,
            horario: formatHorario(ag.dataHoraRealizacao),
            data: formatDate(ag.dataHoraRealizacao),
            medico: ag.medicoRequisitante || 'N/A',
            status: displayStatus,
            statusOriginal: ag.status,
            statusColor: statusColor,
            periodo: getPeriodo(ag.dataHoraRealizacao),
          };
        })
        .filter(ag => ag !== null) // Remove any nulls if ag was not an object
        .sort((a, b) => new Date(a.dataHoraRealizacao) - new Date(b.dataHoraRealizacao));

      const manha = todosOsAgendamentosProcessados.filter(ag => ag.periodo === 'manha');
      const tarde = todosOsAgendamentosProcessados.filter(ag => ag.periodo === 'tarde');
      const noite = todosOsAgendamentosProcessados.filter(ag => ag.periodo === 'noite');
      const madrugada = todosOsAgendamentosProcessados.filter(ag => ag.periodo === 'madrugada');
      
      setProcessedAgendamentos({ manha, tarde, noite, madrugada });

      // Calculate statistics ONLY for TODAY
      const todayString = getTodayDateString();
      const hojeBackendStatus = allAgendaExames;

      const totalAgendadoHoje = hojeBackendStatus.length;
      // Ensure ag.status exists before calling toLowerCase()
      const confirmados = hojeBackendStatus.filter(ag => ag.status && ag.status.toLowerCase() === 'agendado').length;
      const realizado = hojeBackendStatus.filter(ag => ag.status && ag.status.toLowerCase() === 'realizado').length;
      const cancelados = hojeBackendStatus.filter(ag => ag.status && ag.status.toLowerCase() === 'cancelado').length;

      setEstatisticas([
        { ...estatisticas[0], valor: totalAgendadoHoje.toString() },
        { ...estatisticas[1], valor: confirmados.toString() },
        { ...estatisticas[2], valor: realizado.toString() },
        { ...estatisticas[3], valor: cancelados.toString() },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, fetchError, allAgendaExames, allPacientes, allExamesTipos]); // Added allExamesTipos here as it's used


  const renderAgendamentoItem = (agendamento) => (
    <div
      key={agendamento.processedKey} // Use the processed stable key
      className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full text-center">
          {/* Displaying date of the agendamento */}
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-none">{agendamento.data}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{agendamento.paciente}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">{agendamento.exame}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{agendamento.horario}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{agendamento.medico}</p>
      </div>
      <Badge className={`${agendamento.statusColor} text-xs`}>{agendamento.status}</Badge>
    </div>
  );

  const renderAgendamentosCard = (titulo, descricao, agendamentosDoPeriodo) => (
    <Card className="shadow-lg rounded-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">{titulo}</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">{descricao}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => ( <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div> ))}
          </div>
        ) : agendamentosDoPeriodo.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
            {agendamentosDoPeriodo.map(renderAgendamentoItem)}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">Nenhum agendamento neste período.</p>
        )}
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">PremaImagem</span>
            </Link>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar..." className="pl-10 w-full rounded-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Home className="h-4 w-4" />
                <span className="text-sm">Início</span>
              </Link>
              <Link href="/agendamentos" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Agendamentos</span>
              </Link>
              <Link href="/pacientes" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Users className="h-4 w-4" />
                <span className="text-sm">Pacientes</span>
              </Link>
              <Link href="/agendamentos/novo" passHref>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Agendamento
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/" passHref>
            <Button variant="outline" size="sm" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard - Visão Geral de Agendamentos</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Agrupamento de todos os agendamentos por período do dia. Estatísticas referem-se ao dia de hoje.</p>
          </div>
        </div>

        {fetchError && (
          <Card className="mb-8 bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-700">
            <CardHeader className="flex flex-row items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400"/>
              <CardTitle className="text-red-700 dark:text-red-300">Erro ao carregar dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 dark:text-red-400 text-sm">
                Não foi possível carregar todos os dados necessários para esta página. Verifique a consola para mais detalhes.
                {errorPacientes && <><br/>- Erro Pacientes: {errorPacientes}</>}
                {errorExamesTipos && <><br/>- Erro Tipos de Exame: {errorExamesTipos}</>}
                {errorAgendaExames && <><br/>- Erro Agendamentos: {errorAgendaExames}</>}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estatisticas.map((stat, index) => {
            const Icon = stat.icone;
            return (
              <Card key={index} className={`${stat.bgCor} border-l-4 ${stat.cor.replace('text-', 'border-l-')} shadow-md rounded-lg dark:border-opacity-50`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.titulo}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.cor}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.cor}`}>{isLoading ? "..." : stat.valor}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderAgendamentosCard("Agendamentos da Manhã", "Todos (06:00 - 11:59)", processedAgendamentos.manha)}
          {renderAgendamentosCard("Agendamentos da Tarde", "Todos (12:00 - 17:59)", processedAgendamentos.tarde)}
          {renderAgendamentosCard("Agendamentos da Noite", "Todos (18:00 - 23:59)", processedAgendamentos.noite)}
          {renderAgendamentosCard("Agendamentos da Madrugada", "Todos (00:00 - 05:59)", processedAgendamentos.madrugada)}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/agendamentos" passHref>
            <Button variant="outline" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Ver Todos os Agendamentos (Lista)</Button>
          </Link>
          <Link href="/agendamentos/novo" passHref>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
