'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HomeIcon, Users, Gift, TrendingUp, UserPlus, Award, Search } from 'lucide-react';
import Link from 'next/link';

// Mock de dados simplificado: Pacientes e o total de suas indicações
const pacientesIndicacoesMock = [
  { id: 'pac1', nome: 'Maria Silva', totalIndicacoes: 3 },
  { id: 'pac2', nome: 'João Pereira', totalIndicacoes: 1 },
  { id: 'pac3', nome: 'Luiza Costa', totalIndicacoes: 5 },
  { id: 'pac4', nome: 'Roberto Alves', totalIndicacoes: 0 },
  { id: 'pac5', nome: 'Ana Beatriz', totalIndicacoes: 2 },
  { id: 'pac6', nome: 'Carlos Ferraz', totalIndicacoes: 4 },
  { id: 'pac7', nome: 'Mariana Lima', totalIndicacoes: 0 },
  { id: 'pac8', nome: 'Pedro Antunes', totalIndicacoes: 2 },
  { id: 'pac9', nome: 'Sofia Bernardes', totalIndicacoes: 1 },
  { id: 'pac10', nome: 'Ricardo Nobre', totalIndicacoes: 3 },
];

const getMedalColor = (rank) => {
  if (rank === 0) return "text-yellow-500";
  if (rank === 1) return "text-gray-400";
  if (rank === 2) return "text-orange-400";
  return "text-transparent"; // Para ranks além do pódio, não mostra medalha visível
};

export default function PacientesIndicacoesPage() {
  const [filtroNomeIndicador, setFiltroNomeIndicador] = useState('');

  const pacientesIndicadoresOrdenados = useMemo(() => {
    return [...pacientesIndicacoesMock]
      .filter(p => p.nome.toLowerCase().includes(filtroNomeIndicador.toLowerCase()))
      .sort((a, b) => b.totalIndicacoes - a.totalIndicacoes);
  }, [filtroNomeIndicador]);

  const kpiData = useMemo(() => {
    const indicadoresComIndicacoes = pacientesIndicacoesMock.filter(p => p.totalIndicacoes > 0);
    const totalIndicadores = indicadoresComIndicacoes.length;
    const totalIndicacoesGeral = pacientesIndicacoesMock.reduce((sum, p) => sum + p.totalIndicacoes, 0);
    const mediaIndicacoesPorIndicador = totalIndicadores > 0 ? (totalIndicacoesGeral / totalIndicadores) : 0;

    return [
      { title: "Total de Pacientes Indicadores", value: totalIndicadores, icon: Gift, color: "text-sky-500" },
      { title: "Total de Indicações Recebidas", value: totalIndicacoesGeral, icon: UserPlus, color: "text-green-500" },
      { title: "Média de Indicações por Indicador Ativo", value: mediaIndicacoesPorIndicador.toFixed(1), icon: TrendingUp, color: "text-purple-500" },
    ];
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <Gift className="mr-3 h-8 w-8 text-sky-600" /> Pacientes que Indicam
              </CardTitle>
              <CardDescription className="text-md text-gray-600">Pacientes que mais trouxeram novos pacientes para a clínica.</CardDescription>
            </div>
            <Link href="/" passHref>
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                <HomeIcon className="mr-2 h-4 w-4" />
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><Search className="mr-2 h-5 w-5 text-gray-600"/>Pesquisar Indicador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label htmlFor="nomeIndicador" className="block text-sm font-medium text-gray-700 mb-1">Nome do Paciente Indicador:</label>
                  <Input 
                    id="nomeIndicador"
                    type="text" 
                    placeholder="Digite o nome do paciente..."
                    value={filtroNomeIndicador}
                    onChange={(e) => setFiltroNomeIndicador(e.target.value)}
                    className="bg-white"
                  />
                </div>
                {pacientesIndicadoresOrdenados.length > 0 && (
                    <p className="text-sm text-gray-600 md:mt-7">Exibindo {pacientesIndicadoresOrdenados.length} de {pacientesIndicacoesMock.length} pacientes.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pacientesIndicadoresOrdenados.length > 0 ? (
            <div className="space-y-4">
              {pacientesIndicadoresOrdenados.map((paciente, index) => (
                <Card key={paciente.id} className="shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader 
                    className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                        <Award className={`h-7 w-7 mr-3 ${getMedalColor(index)}`} />
                        <div>
                            <CardTitle className="text-lg font-semibold text-sky-700">{paciente.nome}</CardTitle>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-sky-600">{paciente.totalIndicacoes}</p>
                        <p className="text-xs text-gray-500">Indicações</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">Nenhum paciente indicador encontrado.</p>
              <p className="text-gray-500">Ajuste o filtro de nome ou verifique os cadastros.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
