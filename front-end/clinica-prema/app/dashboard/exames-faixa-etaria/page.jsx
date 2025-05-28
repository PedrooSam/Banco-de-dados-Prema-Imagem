"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, BarChart as BarChartIcon, CalendarDays, Activity, Info } from "lucide-react" 
import Link from "next/link"
import { 
  BarChart as RechartsBarChart, 
  Bar as RechartsBar, 
  ResponsiveContainer, 
  Tooltip, 
  Legend, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

// Mock de dados de pacientes e exames
const gerarPacientesMock = (numPacientes) => {
  const pacientes = [];
  const faixasEtarias = [
    { nome: "18-35 anos", min: 18, max: 35 },
    { nome: "36-60 anos", min: 36, max: 60 },
    { nome: "60+ anos", min: 61, max: 90 },
  ];
  for (let i = 0; i < numPacientes; i++) {
    const faixa = faixasEtarias[Math.floor(Math.random() * faixasEtarias.length)];
    pacientes.push({
      id: `p${i}`,
      idade: Math.floor(Math.random() * (faixa.max - faixa.min + 1)) + faixa.min,
      faixaEtaria: faixa.nome,
    });
  }
  return pacientes;
};

const gerarExamesMock = (pacientes) => {
  const exames = [];
  const tiposExame = [
    "Raio-X", "Ultrassonografia", "Tomografia Computadorizada", "Ressonância Magnética", 
    "Ecocardiograma", "Mamografia", "Densitometria Óssea", "Eletrocardiograma (ECG)",
    "Endoscopia Digestiva Alta", "Colonoscopia", "Exames de Sangue", "Teste Ergométrico"
  ];
  // Aumentando o intervalo de anos disponíveis para o mock
  const anosDisponiveis = [2020, 2021, 2022, 2023, 2024, 2025]; 

  pacientes.forEach(paciente => {
    const numExamesPaciente = Math.floor(Math.random() * 2) + 1; // 1 a 2 exames por paciente
    for (let i = 0; i < numExamesPaciente; i++) {
      const anoAleatorio = anosDisponiveis[Math.floor(Math.random() * anosDisponiveis.length)];
      exames.push({
        id: `ex${exames.length}`,
        pacienteId: paciente.id,
        pacienteIdade: paciente.idade,
        pacienteFaixaEtaria: paciente.faixaEtaria,
        tipo: tiposExame[Math.floor(Math.random() * tiposExame.length)],
        data: new Date(anoAleatorio, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      });
    }
  });
  return exames;
};

const todosPacientes = gerarPacientesMock(500); // Aumentar para ter mais dados
const todosExames = gerarExamesMock(todosPacientes);

const FAIXAS_ETARIAS_NOMES = ["18-35 anos", "36-60 anos", "60+ anos"];

// Cores para as faixas etárias no gráfico
const CORES_FAIXA_ETARIA = {
  "18-35 anos": "#0088FE",
  "36-60 anos": "#00C49F",
  "60+ anos": "#FFBB28",
};

const MESES_ABREVIADOS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function ExamesPorFaixaEtariaComparativoPage() {
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [loadingDados, setLoadingDados] = useState(false);
  const [dadosGraficoComparativo, setDadosGraficoComparativo] = useState([]);

  useEffect(() => {
    const anos = [...new Set(todosExames.map(exame => exame.data.getFullYear()))].sort((a, b) => b - a);
    setAnosDisponiveis(anos);
    if (anos.length > 0 && !anos.includes(anoSelecionado)) {
      setAnoSelecionado(anos[0]);
    } else if (anos.length === 0) {
      setAnoSelecionado(new Date().getFullYear()); // Fallback se não houver dados
    }
  }, []);

  useEffect(() => {
    if (!anoSelecionado) return;

    setLoadingDados(true);
    setTimeout(() => {
      const examesDoAno = todosExames.filter(ex => ex.data.getFullYear() === anoSelecionado);
      
      const dadosProcessados = MESES_ABREVIADOS.map((nomeMes, indexMes) => {
        const dadosMes = { nomeMes };
        FAIXAS_ETARIAS_NOMES.forEach(faixa => {
          dadosMes[faixa] = 0;
        });

        examesDoAno.forEach(exame => {
          if (exame.data.getMonth() === indexMes) {
            if (dadosMes.hasOwnProperty(exame.pacienteFaixaEtaria)) {
              dadosMes[exame.pacienteFaixaEtaria]++;
            }
          }
        });
        return dadosMes;
      });

      setDadosGraficoComparativo(dadosProcessados);
      setLoadingDados(false);
    }, 700);
  }, [anoSelecionado]);

  const chartConfig = useMemo(() => {
    const config = {};
    FAIXAS_ETARIAS_NOMES.forEach(faixa => {
      // Transforma o nome da faixa etária para ser uma chave válida para CSS variable
      const cssVarKey = faixa.replace(/\s|\+/g, '-');
      config[faixa] = {
        label: faixa,
        color: `hsl(var(--chart-${cssVarKey}))`, // Referencia a variável CSS
      };
    });
    return config;
  }, []);

  // Define as cores como variáveis CSS no estilo global ou no componente
  // Para este exemplo, vamos simular a definição das cores para o ChartContainer
  // Em um projeto real, você adicionaria isso ao seu CSS global ou a um <style jsx global>
  const chartColorsStyle = FAIXAS_ETARIAS_NOMES.reduce((acc, faixa) => {
    const cssVarKey = faixa.replace(/\s|\+/g, '-');
    // Simplificando a conversão de HEX para HSL (isso é uma aproximação)
    // Idealmente, você teria as cores já em HSL ou usaria uma lib para conversão precisa
    if (CORES_FAIXA_ETARIA[faixa] === "#0088FE") acc[`--chart-${cssVarKey}`] = '207 100% 50%'; // Azul
    else if (CORES_FAIXA_ETARIA[faixa] === "#00C49F") acc[`--chart-${cssVarKey}`] = '165 100% 38%'; // Verde
    else if (CORES_FAIXA_ETARIA[faixa] === "#FFBB28") acc[`--chart-${cssVarKey}`] = '45 100% 57%'; // Amarelo
    else acc[`--chart-${cssVarKey}`] = '240 60% 60%'; // Azul escuro como padrão
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50" style={chartColorsStyle}>
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Comparativo de Exames por Faixa Etária</h1>
            <p className="text-gray-500 mt-1">Análise mensal do volume de exames, comparando faixas etárias.</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-primary" />
              Selecione o Ano
            </CardTitle>
            <CardDescription>Filtre os dados de exames pelo ano de realização.</CardDescription>
          </CardHeader>
          <CardContent>
            {anosDisponiveis.length > 0 ? (
              <Select 
                value={anoSelecionado?.toString()} 
                onValueChange={(value) => setAnoSelecionado(parseInt(value))}
              >
                <SelectTrigger id="ano-select" className="w-full md:w-1/2 lg:w-1/3">
                  <SelectValue placeholder="Selecione o Ano" />
                </SelectTrigger>
                <SelectContent>
                  {anosDisponiveis.map(ano => (
                    <SelectItem key={ano} value={ano.toString()}>{ano}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-500">Nenhum ano com dados disponíveis.</p>
            )}
          </CardContent>
        </Card>

        {loadingDados ? (
          <div className="flex flex-col items-center justify-center h-80">
            <Activity className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Analisando dados anuais...</p>
          </div>
        ) : dadosGraficoComparativo.length > 0 && anoSelecionado ? (
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-indigo-600">
                <BarChartIcon className="h-6 w-6 mr-3" />
                Comparativo Mensal de Exames por Faixa Etária - {anoSelecionado}
              </CardTitle>
              <CardDescription>Volume de exames realizados mensalmente, comparando as diferentes faixas etárias.</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] pt-6"> 
              <ChartContainer 
                config={chartConfig}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={dadosGraficoComparativo} 
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="nomeMes" 
                      tickLine={false} 
                      axisLine={false} 
                      tickMargin={8}
                      fontSize={12}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tickMargin={8}
                      fontSize={12}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--muted))" }}
                      content={<ChartTooltipContent indicator="dot" hideLabel />}
                    />
                    <Legend content={<ChartLegendContent nameKey="name" className="text-xs" />} wrapperStyle={{paddingTop: '20px'}} />
                    {FAIXAS_ETARIAS_NOMES.map((faixa) => (
                      <RechartsBar
                        key={faixa} 
                        dataKey={faixa} 
                        fill={chartConfig[faixa]?.color} 
                        radius={[4, 4, 0, 0]} 
                      />
                    ))}
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-8 shadow-md">
            <CardContent className="pt-6">
              <div className="text-center py-16">
                <Info className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="mt-2 text-xl font-semibold text-gray-800">Nenhum Dado de Exame Encontrado</h3>
                <p className="mt-2 text-md text-gray-500">
                  Não foram encontrados registros de exames para o ano de {anoSelecionado || 'N/A'}.
                </p>
                <p className="mt-1 text-sm text-gray-500">Tente selecionar outro ano ou verifique se há dados de exames carregados.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
