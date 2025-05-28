"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CalendarDays, BarChart3, Filter } from "lucide-react"
import Link from "next/link"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";


export default function ContagemExamesMesAnoPage() {
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear().toString())
  const [mesSelecionado, setMesSelecionado] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'))
  const [totalExames, setTotalExames] = useState(0)
  const [loadingDados, setLoadingDados] = useState(false)
  const [dadosGrafico, setDadosGrafico] = useState([]);

  const anos = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const meses = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  // Simulação de busca de dados
  useEffect(() => {
    setLoadingDados(true);
    // Simula uma chamada de API
    setTimeout(() => {
      // Lógica para simular a contagem de exames baseada no mês e ano
      const examesSimulados = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
      const fatorMes = parseInt(mesSelecionado);
      const fatorAno = parseInt(anoSelecionado) % 10;
      setTotalExames(examesSimulados + (fatorMes * 10) + (fatorAno * 5));

      // Simular dados para o gráfico (exames por mês no ano selecionado)
      const dadosMensais = meses.map(mes => ({
        name: mes.label.substring(0, 3), // Usar abreviação do mês
        total: Math.floor(Math.random() * (250 - 20 + 1)) + 20 + (parseInt(mes.value) * 5) + (fatorAno * 3), // Variação simulada
      }));
      setDadosGrafico(dadosMensais);
      setLoadingDados(false);
    }, 500);
  }, [anoSelecionado, mesSelecionado]);

  const mesLabel = meses.find(m => m.value === mesSelecionado)?.label || "";

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Contagem de Exames</h1>
            <p className="text-gray-500 mt-1">Visualize o total de exames realizados por mês e ano.</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              Filtrar por Período
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
              <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                <SelectTrigger id="ano">
                  <SelectValue placeholder="Selecione o Ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map(ano => (
                    <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger id="mes">
                  <SelectValue placeholder="Selecione o Mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map(mes => (
                    <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center text-blue-700">
              <CalendarDays className="h-6 w-6 mr-2" />
              Período Analisado: {mesLabel} de {anoSelecionado}
            </CardTitle>
            <CardDescription>Total de exames realizados no período selecionado.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingDados ? (
              <div className="flex items-center justify-center h-24">
                <p className="text-gray-500">Carregando dados...</p>
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg">
                <BarChart3 className="h-12 w-12 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-blue-600">Total de Exames Realizados</p>
                  <p className="text-5xl font-bold text-blue-800">{totalExames}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfico de Exames por Mês */}
        {!loadingDados && dadosGrafico.length > 0 && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-green-700">
                <BarChart3 className="h-6 w-6 mr-2" />
                Distribuição Mensal de Exames em {anoSelecionado}
              </CardTitle>
              <CardDescription>Contagem de exames realizados em cada mês do ano selecionado.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ total: { label: "Exames", color: "hsl(var(--chart-1))" } }} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosGrafico} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" strokeWidth={1} fontSize={12} />
                    <YAxis strokeWidth={1} fontSize={12} />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--muted))" }}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Legend content={<ChartLegendContent />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} name="Total de Exames" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  )
}
