'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HomeIcon, Users, Activity, Filter, Award, TrendingUp, UserPlus, Gift, Search } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock de dados: Pacientes e quem eles indicaram
const pacientesIndicacoesMock = [
  {
    id: 'pac1', 
    nome: 'Maria Silva', 
    dataCadastro: '2023-01-15',
    totalIndicacoes: 3,
    indicados: [
      { id: 'pacInd1', nome: 'Carlos Andrade', dataCadastroIndicado: '2023-05-20', status: 'Ativo' },
      { id: 'pacInd2', nome: 'Beatriz Costa', dataCadastroIndicado: '2023-08-10', status: 'Ativo' },
      { id: 'pacInd3', nome: 'Lucas Martins', dataCadastroIndicado: '2024-01-05', status: 'Pendente' },
    ]
  },
  {
    id: 'pac2', 
    nome: 'João Pereira', 
    dataCadastro: '2022-11-05',
    totalIndicacoes: 1,
    indicados: [
      { id: 'pacInd4', nome: 'Fernanda Lima', dataCadastroIndicado: '2023-02-15', status: 'Ativo' },
    ]
  },
  {
    id: 'pac3', 
    nome: 'Luiza Costa', 
    dataCadastro: '2023-02-01',
    totalIndicacoes: 5,
    indicados: [
      { id: 'pacInd5', nome: 'Ricardo Alves', dataCadastroIndicado: '2023-06-10', status: 'Ativo' },
      { id: 'pacInd6', nome: 'Juliana Souza', dataCadastroIndicado: '2023-09-22', status: 'Ativo' },
      { id: 'pacInd7', nome: 'Marcos Oliveira', dataCadastroIndicado: '2024-02-11', status: 'Ativo' },
      { id: 'pacInd8', nome: 'Patricia Gomes', dataCadastroIndicado: '2024-04-30', status: 'Cancelado' },
      { id: 'pacInd9', nome: 'Gabriel Santos', dataCadastroIndicado: '2024-05-15', status: 'Ativo' },
    ]
  },
   {
    id: 'pac4', 
    nome: 'Roberto Alves', 
    dataCadastro: '2022-10-10',
    totalIndicacoes: 0,
    indicados: []
  },
  {
    id: 'pac5', 
    nome: 'Ana Beatriz', 
    dataCadastro: '2023-07-22',
    totalIndicacoes: 2,
    indicados: [
      { id: 'pacInd10', nome: 'Vinicius Moraes', dataCadastroIndicado: '2023-11-01', status: 'Ativo' },
      { id: 'pacInd11', nome: 'Larissa Dias', dataCadastroIndicado: '2024-03-18', status: 'Pendente' },
    ]
  },
];

const getMedalColor = (rank) => {
  if (rank === 0) return "text-yellow-500";
  if (rank === 1) return "text-gray-400";
  if (rank === 2) return "text-orange-400";
  return "text-transparent";
};

export default function PacientesIndicacoesPage() {
  const [filtroNomeIndicador, setFiltroNomeIndicador] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const pacientesIndicadoresOrdenados = useMemo(() => {
    return [...pacientesIndicacoesMock]
      .filter(p => p.nome.toLowerCase().includes(filtroNomeIndicador.toLowerCase()))
      .sort((a, b) => b.totalIndicacoes - a.totalIndicacoes);
  }, [filtroNomeIndicador]);

  const handleVerDetalhes = (paciente) => {
    setPacienteSelecionado(pacienteSelecionado?.id === paciente.id ? null : paciente);
  };

  const kpiData = useMemo(() => {
    const totalIndicadores = pacientesIndicacoesMock.filter(p => p.totalIndicacoes > 0).length;
    const totalIndicacoesGeral = pacientesIndicacoesMock.reduce((sum, p) => sum + p.totalIndicacoes, 0);
    const mediaIndicacoesPorIndicador = totalIndicadores > 0 ? (totalIndicacoesGeral / totalIndicadores) : 0;

    return [
      { title: "Total de Pacientes Indicadores", value: totalIndicadores, icon: Gift, color: "text-sky-500" },
      { title: "Total de Indicações Recebidas", value: totalIndicacoesGeral, icon: UserPlus, color: "text-green-500" },
      { title: "Média de Indicações por Indicador", value: mediaIndicacoesPorIndicador.toFixed(1), icon: TrendingUp, color: "text-purple-500" },
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
                <Card key={paciente.id} className={`shadow-md hover:shadow-lg transition-all duration-300 ${pacienteSelecionado?.id === paciente.id ? 'ring-2 ring-sky-500' : ''}`}>
                  <CardHeader 
                    className="flex flex-row items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-t-lg hover:bg-gray-100"
                    onClick={() => handleVerDetalhes(paciente)}
                  >
                    <div className="flex items-center">
                        <Award className={`h-7 w-7 mr-3 ${getMedalColor(index)}`} />
                        <div>
                            <CardTitle className="text-lg font-semibold text-sky-700">{paciente.nome}</CardTitle>
                            <CardDescription className="text-xs text-gray-500">Cliente desde: {format(parseISO(paciente.dataCadastro), 'dd/MM/yyyy')}</CardDescription>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-sky-600">{paciente.totalIndicacoes}</p>
                        <p className="text-xs text-gray-500">Indicações</p>
                    </div>
                  </CardHeader>
                  {pacienteSelecionado?.id === paciente.id && paciente.indicados.length > 0 && (
                    <CardContent className="p-4 border-t">
                      <h4 className="text-md font-semibold mb-3 text-gray-700">Pacientes Indicados por {paciente.nome}:</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome do Indicado</TableHead>
                            <TableHead>Data de Cadastro</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paciente.indicados.map(indicado => (
                            <TableRow key={indicado.id}>
                              <TableCell className="font-medium">{indicado.nome}</TableCell>
                              <TableCell>{format(parseISO(indicado.dataCadastroIndicado), 'dd/MM/yyyy')}</TableCell>
                              <TableCell className="text-center">
                                <Badge 
                                  variant={indicado.status === 'Ativo' ? 'default' : indicado.status === 'Pendente' ? 'outline' : 'destructive'}
                                  className={indicado.status === 'Ativo' ? 'bg-green-100 text-green-700' : indicado.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}
                                >
                                  {indicado.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  )}
                  {pacienteSelecionado?.id === paciente.id && paciente.indicados.length === 0 && (
                     <CardContent className="p-4 border-t text-center text-gray-500">
                        <Users className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        Este paciente ainda não fez nenhuma indicação.
                    </CardContent>
                  )}
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
