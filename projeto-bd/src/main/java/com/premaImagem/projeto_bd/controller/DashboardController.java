package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.dto.*;
import com.premaImagem.projeto_bd.repositorios.DashboardRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardRepositorio dashboardRepositorio;

    // Medicos que mais realizaram exames
    @GetMapping("/top-exames")
    public List<ExameMaisRealizadoDTO> getTop10Exames() {
        List<Object[]> resultados = dashboardRepositorio.top10ExamesMaisRealizados(); // Método agora retorna List<Object[]>
        List<ExameMaisRealizadoDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String nome = (String) row[0]; // Coluna "nome" do Exame
            Long quantidade = ((Number) row[1]).longValue(); // Coluna "quantidade"
            dtos.add(new ExameMaisRealizadoDTO(nome, quantidade));
        }
        return dtos;
    }

    // Exames por medicos
    @GetMapping("/exames-por-medico")
    public List<ExamesPorMedicoDTO> getExamesPorMedico() {
        List<Object[]> resultados = dashboardRepositorio.examesPorMedico(); // Método agora retorna List<Object[]>
        List<ExamesPorMedicoDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            Long idMedico = ((Number) row[0]).longValue(); // Coluna "id" do Medico
            String nomeMedico = (String) row[1]; // Coluna "nome" do Colaborador (medico)
            Long totalExames = ((Number) row[2]).longValue(); // Coluna "total_exames"
            dtos.add(new ExamesPorMedicoDTO(idMedico, nomeMedico, totalExames));
        }
        return dtos;
    }

    // Dashboard para exames por periodo do dia
    @GetMapping("/exames-por-periodo")
    public List<ExamesPorPeriodoDiaDTO> getExamesPorPeriodo(@RequestParam String data) {

        LocalDate dataEspecifica = LocalDate.parse(data);

        List<Object[]> resultados = dashboardRepositorio.examesPorPeriodoParaDataEspecifica(dataEspecifica);
        List<ExamesPorPeriodoDiaDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String periodo = (String) row[0];
            Long total = ((Number) row[1]).longValue();
            dtos.add(new ExamesPorPeriodoDiaDTO(periodo, total));
        }
        return dtos;
    }

    // Dashboard para exames por mes ou ano
    @GetMapping("/exames-por-mes-ano")
    public ExamesPorMesAnoDTO getExamesPorMesAno(
            @RequestParam int ano,
            @RequestParam int mes) {

        Long totalExames = dashboardRepositorio.getContagemExamesRealizadosPorMesAno(ano, mes);

        // Se totalExames for null (o que não deve acontecer com COUNT(*)), trata como 0.
        if (totalExames == null) {
            totalExames = 0L;
        }

        return new ExamesPorMesAnoDTO(ano, mes, totalExames);
    }

    // Percentual de exame por medico
    @GetMapping("/percentual-exames-por-medico")
    public List<PercentualExamesPorMedicoDTO> getPercentualExamesPorMedico() {
        List<Object[]> resultados = dashboardRepositorio.percentualExamesPorMedico();
        List<PercentualExamesPorMedicoDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String nome = (String) row[0];
            Double percentual = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;
            dtos.add(new PercentualExamesPorMedicoDTO(nome, percentual));
        }
        return dtos;
    }

    // Medico com mais exames em determinado mes
    @GetMapping("/top5-medicos-atendimentos-mes")
    public List<MedicoAtendimentosMesDTO> getTop5MedicosAtendimentosMes(
            @RequestParam int ano,
            @RequestParam int mes) {

        List<Object[]> resultados = dashboardRepositorio.top5MedicosAtendimentosPorMesAno(ano, mes);
        List<MedicoAtendimentosMesDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String nome = (String) row[0];
            Long atendimentos = ((Number) row[1]).longValue();
            dtos.add(new MedicoAtendimentosMesDTO(nome, atendimentos));
        }
        return dtos;
    }

    // Pacientes com mais exames realizados
    @GetMapping("/top10-pacientes-mais-exames")
    public List<PacienteMaisExamesDTO> getTop10PacientesMaisExames() {
        List<Object[]> resultados = dashboardRepositorio.top10PacientesMaisExames();
        List<PacienteMaisExamesDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String nome = (String) row[0];
            Long totalExames = ((Number) row[1]).longValue();
            dtos.add(new PacienteMaisExamesDTO(nome, totalExames));
        }
        return dtos;
    }

    // Exames por faixa etaria dos pacientes
    @GetMapping("/exames-por-faixa-etaria")
    public ExamesPorFaixaEtariaDTO getExamesPorFaixaEtaria(@RequestParam String faixaEtaria) {
        return dashboardRepositorio.getExamesPorFaixaEtariaEspecifica(faixaEtaria);
    }

    // Pacientes que indicaram outros pacientes
    @GetMapping("/top10-pacientes-indicadores")
    public List<PacienteIndicadorDTO> getTop10PacientesIndicadores() {
        List<Object[]> resultados = dashboardRepositorio.top10PacientesIndicadores();
        List<PacienteIndicadorDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String paciente = (String) row[0];
            Long indicados = ((Number) row[1]).longValue();
            dtos.add(new PacienteIndicadorDTO(paciente, indicados));
        }
        return dtos;
    }

    // Produtos mais utilizados
    @GetMapping("/top10-produtos-mais-utilizados")
    public List<ProdutoMaisUtilizadoDTO> getTop10ProdutosMaisUtilizados() {
        List<Object[]> resultados = dashboardRepositorio.top10ProdutosMaisUtilizados();
        List<ProdutoMaisUtilizadoDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String produto = (String) row[0];
            Long vezesVendido = ((Number) row[1]).longValue();
            // Ajuste no índice para quantidadeVendida, se a consulta retornar 3 colunas
            Long quantidadeVendida = row.length > 2 && row[2] != null ? ((Number) row[2]).longValue() : 0L;
            dtos.add(new ProdutoMaisUtilizadoDTO(produto, vezesVendido, quantidadeVendida));
        }
        return dtos;
    }

    // Quantidade de produtos
    @GetMapping("/quantidade-produtos")
    public List<QuantidadeProdutoDTO> getQuantidadeProdutos() {
        List<Object[]> resultados = dashboardRepositorio.quantidadeProdutos();
        List<QuantidadeProdutoDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String nome = (String) row[0];
            Long quantidade = ((Number) row[1]).longValue();
            dtos.add(new QuantidadeProdutoDTO(nome, quantidade));
        }
        return dtos;
    }

    // Compras por fornecedor
    @GetMapping("/compras-por-fornecedor")
    public List<ComprasPorFornecedorDTO> getComprasPorFornecedor() {
        List<Object[]> resultados = dashboardRepositorio.comprasPorFornecedor();
        List<ComprasPorFornecedorDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String fornecedor = (String) row[0];
            Long totalVendido = ((Number) row[1]).longValue();
            dtos.add(new ComprasPorFornecedorDTO(fornecedor, totalVendido));
        }
        return dtos;
    }

    // Total de exames agendados por dia
    @GetMapping("/exames-agendados-por-dia")
    public ExamesAgendadosPorDiaDTO getExamesAgendadosPorDia(@RequestParam String data) {

        LocalDate dataEspecifica = LocalDate.parse(data);

        Long totalExames = dashboardRepositorio.getContagemExamesParaDataEspecifica(dataEspecifica);

        if (totalExames == null) {
            totalExames = 0L;
        }

        return new ExamesAgendadosPorDiaDTO(dataEspecifica, totalExames);
    }

    // Número médio de exames que um paciente faz por agendamento
    @GetMapping("/media-exames-por-agendamento")
    public MediaExamesPorAgendamentoDTO getMediaExamesPorAgendamento(@RequestParam long idPaciente) {
        // Chama o novo método do repositório com o idPaciente
        Double media = dashboardRepositorio.mediaExamesPorAgendamentoParaPaciente(idPaciente);

        if (media == null) {
            media = 0.0;
        }
        return new MediaExamesPorAgendamentoDTO(media);
    }

    // Quantos exames agendados por hora do dia
    @GetMapping("/exames-por-hora")
    public ExamesPorHoraDTO getExamesPorHora(
            @RequestParam int ano,
            @RequestParam int mes,
            @RequestParam int dia,
            @RequestParam int hora) {

        Long totalExames = dashboardRepositorio.getContagemExamesParaDataHoraEspecifica(ano, mes, dia, hora);

        if (totalExames == null) {
            totalExames = 0L;
        }

        return new ExamesPorHoraDTO(hora, totalExames);
    }
}