package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.dto.*;
import com.premaImagem.projeto_bd.repositorios.DashboardRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardRepositorio dashboardRepositorio;

    //medicos que mais realizaram exames
    @GetMapping("/top-exames")
    public List<ExameMaisRealizadoDTO> getTop10Exames() {
        return dashboardRepositorio.top10ExamesMaisRealizados(PageRequest.of(0, 10));
    }

    //exames por medicos
    @GetMapping("/exames-por-medico")
    public List<ExamesPorMedicoDTO> getExamesPorMedico() {
        return dashboardRepositorio.examesPorMedico();
    }

    //dashboard para exames por periodo do dia
    @GetMapping("/exames-por-periodo")
    public List<ExamesPorPeriodoDiaDTO> getExamesPorPeriodo() {
        List<Object[]> resultados = dashboardRepositorio.examesPorPeriodo();
        List<ExamesPorPeriodoDiaDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String periodo = (String) row[0];
            Long total = ((Number) row[1]).longValue();
            dtos.add(new ExamesPorPeriodoDiaDTO(periodo, total));
        }
        return dtos;
    }

    //dashboard para exames por mes ou ano
    @GetMapping("/exames-por-mes-ano")
    public List<ExamesPorMesAnoDTO> getExamesPorMesAno() {
        return dashboardRepositorio.totalExamesPorMesAno();
    }

    //percentual de exame por medico
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

    //medico com mais exames em determinado mes
    @GetMapping("/top5-medicos-atendimentos-mes")
    public List<MedicoAtendimentosMesDTO> getTop5MedicosAtendimentosMes() {
        List<Object[]> resultados = dashboardRepositorio.top5MedicosAtendimentosMesAtual();
        List<MedicoAtendimentosMesDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String nome = (String) row[0];
            Long atendimentos = ((Number) row[1]).longValue();
            dtos.add(new MedicoAtendimentosMesDTO(nome, atendimentos));
        }
        return dtos;
    }

    //pacientes com mais exames realizados
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

    //exames por faixa etaria dos pacientes
    @GetMapping("/exames-por-faixa-etaria")
    public List<ExamesPorFaixaEtariaDTO> getExamesPorFaixaEtaria() {
        List<Object[]> resultados = dashboardRepositorio.examesPorFaixaEtaria();
        List<ExamesPorFaixaEtariaDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String faixaEtaria = (String) row[0];
            Long totalExames = ((Number) row[1]).longValue();
            dtos.add(new ExamesPorFaixaEtariaDTO(faixaEtaria, totalExames));
        }
        return dtos;
    }

    //pacientes que indicaram outros pacientes
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

    //Produtos mais utilizados
    @GetMapping("/top10-produtos-mais-utilizados")
    public List<ProdutoMaisUtilizadoDTO> getTop10ProdutosMaisUtilizados() {
        List<Object[]> resultados = dashboardRepositorio.top10ProdutosMaisUtilizados();
        List<ProdutoMaisUtilizadoDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            String produto = (String) row[0];
            Long vezesVendido = ((Number) row[1]).longValue();
            Long quantidadeVendida = ((Number) row[2]).longValue();
            dtos.add(new ProdutoMaisUtilizadoDTO(produto, vezesVendido, quantidadeVendida));
        }
        return dtos;
    }

    //quantidade de produtos
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

    //compras por fornecedor
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

    //Total de exames agendados por dia
    @GetMapping("/exames-agendados-por-dia")
    public List<ExamesAgendadosPorDiaDTO> getExamesAgendadosPorDia() {
        List<Object[]> resultados = dashboardRepositorio.examesAgendadosPorDia();
        List<ExamesAgendadosPorDiaDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            // Pode vir como java.sql.Date ou String dependendo do driver!
            LocalDate dia;
            Object raw = row[0];
            if (raw instanceof java.sql.Date) {
                dia = ((java.sql.Date) raw).toLocalDate();
            } else if (raw instanceof String) {
                dia = LocalDate.parse((String) raw);
            } else {
                dia = null;
            }
            Long totalExames = ((Number) row[1]).longValue();
            dtos.add(new ExamesAgendadosPorDiaDTO(dia, totalExames));
        }
        return dtos;
    }

    //Número médio de exames que um paciente faz por agendamento
    @GetMapping("/media-exames-por-agendamento")
    public MediaExamesPorAgendamentoDTO getMediaExamesPorAgendamento() {
        Double media = dashboardRepositorio.mediaExamesPorAgendamento();
        if (media == null) media = 0.0;
        return new MediaExamesPorAgendamentoDTO(media);
    }

    //Quantos exames agendados por hora do dia
    @GetMapping("/exames-por-hora")
    public List<ExamesPorHoraDTO> getExamesPorHora() {
        List<Object[]> resultados = dashboardRepositorio.examesPorHora();
        List<ExamesPorHoraDTO> dtos = new ArrayList<>();
        for (Object[] row : resultados) {
            Integer hora = ((Number) row[0]).intValue();
            Long totalExames = ((Number) row[1]).longValue();
            dtos.add(new ExamesPorHoraDTO(hora, totalExames));
        }
        return dtos;
    }
}
