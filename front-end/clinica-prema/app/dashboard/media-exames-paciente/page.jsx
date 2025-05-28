'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HomeIcon, UserSearch, BarChart2, Info } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock de dados de pacientes e seus agendamentos
const todosPacientesMock = [
  { id: 'pac1', nome: 'Ana Silva', idade: 34, sexo: 'Feminino' },
  { id: 'pac2', nome: 'Carlos Oliveira', idade: 45, sexo: 'Masculino' },
  { id: 'pac3', nome: 'Beatriz Costa', idade: 28, sexo: 'Feminino' },
  { id: 'pac4', nome: 'Daniel Martins', idade: 52, sexo: 'Masculino' },
  { id: 'pac5', nome: 'Eduarda Lima', idade: 61, sexo: 'Feminino' },
];

const todosExamesMock = [
  { id: 'eco', nome: 'Ecocardiograma', tipo: 'Cardiológico' },
  { id: 'erg', nome: 'Teste Ergométrico', tipo: 'Cardiológico' },
  { id: 'mapa', nome: 'MAPA 24h', tipo: 'Cardiológico' },
  { id: 'holter', nome: 'Holter 24h', tipo: 'Cardiológico' },
  { id: 'usg_abd', nome: 'Ultrassonografia Abdome', tipo: 'Imagem' },
  { id: 'raiox_torax', nome: 'Raio-X Tórax', tipo: 'Imagem' },
];

const gerarAgendamentosPacienteMock = (pacienteId) => {
  const seed = pacienteId.charCodeAt(3);
  const random = (multiplier, max) => Math.floor(Math.abs(Math.sin(seed * multiplier)) * max) + 1;
  const numAgendamentos = random(1, 5); // Paciente pode ter de 1 a 5 agendamentos históricos
  let agendamentos = [];

  for (let i = 0; i < numAgendamentos; i++) {
    const dataAgendamento = new Date(2024 - random(i,3), random(i*2, 11), random(i*3, 28));
    const numExamesNesteAgendamento = random(i + 1, 3); // De 1 a 3 exames por agendamento
    let examesDoAgendamento = [];
    let examesDisponiveisCopia = [...todosExamesMock];

    for (let j = 0; j < numExamesNesteAgendamento; j++) {
      if (examesDisponiveisCopia.length === 0) break;
      const indiceExame = random(j * seed, examesDisponiveisCopia.length -1 );
      examesDoAgendamento.push(examesDisponiveisCopia.splice(indiceExame, 1)[0]);
    }
    
    if(examesDoAgendamento.length > 0){
        agendamentos.push({
            id: `ag${pacienteId}${i}`,
            data: format(dataAgendamento, 'yyyy-MM-dd'),
            exames: examesDoAgendamento,
            quantidadeExames: examesDoAgendamento.length
        });
    }
  }
  return agendamentos.sort((a,b) => new Date(b.data) - new Date(a.data)); // Mais recentes primeiro
};

export default function MediaExamesPacientePage() {
  const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState(todosPacientesMock[0].id);
  const [agendamentosPaciente, setAgendamentosPaciente] = useState([]);
  const [pacienteInfo, setPacienteInfo] = useState(null);

  useEffect(() => {
    if (pacienteSelecionadoId) {
      const info = todosPacientesMock.find(p => p.id === pacienteSelecionadoId);
      setPacienteInfo(info);
      const agendamentos = gerarAgendamentosPacienteMock(pacienteSelecionadoId);
      setAgendamentosPaciente(agendamentos);
    }
  }, [pacienteSelecionadoId]);

  const mediaExames = useMemo(() => {
    if (agendamentosPaciente.length === 0) return 0;
    const totalExames = agendamentosPaciente.reduce((sum, ag) => sum + ag.quantidadeExames, 0);
    return (totalExames / agendamentosPaciente.length).toFixed(2);
  }, [agendamentosPaciente]);

  const dadosGraficoHistorico = useMemo(() => {
    return agendamentosPaciente.map(ag => ({
      data: format(new Date(ag.data), 'dd/MM/yy'),
      quantidade: ag.quantidadeExames,
      exames: ag.exames.map(e => e.nome).join(', ')
    }));
  }, [agendamentosPaciente]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800">Média de Exames por Paciente</CardTitle>
              <CardDescription className="text-md text-gray-600">Análise do número médio de exames que um paciente realiza por agendamento.</CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-6 border-b">
            <div className="md:col-span-1">
              <label htmlFor="paciente" className="block text-sm font-medium text-gray-700 mb-1">Selecionar Paciente:</label>
              <Select value={pacienteSelecionadoId} onValueChange={setPacienteSelecionadoId}>
                <SelectTrigger id="paciente" className="w-full bg-white">
                  <SelectValue placeholder="Selecione um paciente" />
                </SelectTrigger>
                <SelectContent>
                  {todosPacientesMock.map(paciente => (
                    <SelectItem key={paciente.id} value={paciente.id}>{paciente.nome} (ID: {paciente.id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {pacienteInfo && (
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-blue-50 p-4 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Paciente</h3>
                  <p className="text-lg font-semibold text-blue-700">{pacienteInfo.nome}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Idade</h3>
                  <p className="text-lg font-semibold text-blue-700">{pacienteInfo.idade} anos</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sexo</h3>
                  <p className="text-lg font-semibold text-blue-700">{pacienteInfo.sexo}</p>
                </div>
              </div>
            )}
          </div>

          {pacienteSelecionadoId && pacienteInfo ? (
            agendamentosPaciente.length > 0 ? (
              <div>
                <Card className="mb-6 shadow-md bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700 flex items-center">
                      <BarChart2 className="mr-2 h-6 w-6" />
                      Média de Exames por Agendamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-green-600 text-center py-4">{mediaExames}</p>
                    <p className="text-center text-gray-600">exames por agendamento (média histórica para {pacienteInfo.nome}).</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-xl font-semibold text-gray-700">Histórico de Agendamentos de {pacienteInfo.nome}</CardTitle>
                    <CardDescription>Detalhes dos agendamentos e número de exames realizados em cada um.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dadosGraficoHistorico} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="data" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} label={{ value: 'Nº de Exames', angle: -90, position: 'insideLeft', offset: 0, style: {textAnchor: 'middle', fontSize: '14px', fill:'#666'} }} />
                        <Tooltip
                          formatter={(value, name, props) => [`${value} exames`, `Exames: ${props.payload.exames}`]}
                          labelFormatter={(label) => `Data: ${label}`}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <Legend formatter={(value) => <span className="text-gray-700 text-sm">{value}</span>} />
                        <Bar dataKey="quantidade" name="Nº de Exames Realizados" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30}/>
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">Lista Detalhada de Agendamentos:</h3>
                      <div className="overflow-x-auto rounded-md border">
                        <Table>
                          <TableHeader className="bg-gray-100">
                            <TableRow>
                              <TableHead className="font-semibold text-gray-600">Data do Agendamento</TableHead>
                              <TableHead className="text-center font-semibold text-gray-600">Qtd. Exames</TableHead>
                              <TableHead className="font-semibold text-gray-600">Exames Realizados</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {agendamentosPaciente.map(ag => (
                              <TableRow key={ag.id} className="hover:bg-gray-50">
                                <TableCell className="font-medium text-gray-800">{format(new Date(ag.data), 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                                <TableCell className="text-center text-gray-700">{ag.quantidadeExames}</TableCell>
                                <TableCell>
                                  {ag.exames.map(exame => (
                                    <Badge key={exame.id} variant="secondary" className="mr-1 mb-1 bg-blue-100 text-blue-700">
                                      {exame.nome}
                                    </Badge>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-md">
                <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center text-center">
                  <Info className="w-16 h-16 text-blue-500 mb-4" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Nenhum agendamento encontrado para {pacienteInfo?.nome}.
                  </p>
                  <p className="text-gray-500">
                    Este paciente ainda não possui histórico de agendamentos ou não realizou exames.
                  </p>
                </CardContent>
              </Card>
            )
          ) : (
            <Card className="shadow-md">
              <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center">
                <UserSearch className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-700 mb-2">Selecione um Paciente</p>
                <p className="text-gray-500">Escolha um paciente na lista acima para ver sua média de exames e histórico.</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
