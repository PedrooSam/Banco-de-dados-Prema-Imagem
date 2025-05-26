package com.premaImagem.projeto_bd.repositorios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSetMetaData;
import java.util.List;
// import com.premaImagem.projeto_bd.dto.*; // Importe se precisar de algum DTO aqui dentro,
// mas para List<Object[]> não é estritamente necessário.

@Repository
public class DashboardRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DashboardRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper genérico para converter ResultSet em Object[]
    private final RowMapper<Object[]> objectArrayRowMapper = (rs, rowNum) -> {
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();
        Object[] row = new Object[columnCount];
        for (int i = 1; i <= columnCount; i++) {
            row[i - 1] = rs.getObject(i);
        }
        return row;
    };

    // 1. Top 10 exames mais realizados
    public List<Object[]> top10ExamesMaisRealizados() {
        String sql = "SELECT ex.nome, COUNT(ae.idExame) AS quantidade " +
                "FROM AgendaExame ae JOIN Exame ex ON ae.idExame = ex.id " +
                "WHERE ae.status = 'realizado' " +
                "GROUP BY ex.nome " +
                "ORDER BY quantidade DESC LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 2. Número de exames por médico
    public List<Object[]> examesPorMedico() {
        String sql = "SELECT m.id, col.nome, COUNT(ae.idMedico) AS total_exames " +
                "FROM AgendaExame ae " +
                "JOIN Medico m ON ae.idMedico = m.id " +
                "JOIN Colaborador col ON m.id = col.id " +
                "WHERE ae.status = 'realizado' " +
                "GROUP BY m.id, col.nome " +
                "ORDER BY total_exames DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 3. Distribuição dos exames por período do dia
    public List<Object[]> examesPorPeriodo() {
        String sql = "SELECT " +
                "CASE " +
                "  WHEN HOUR(dataHoraRealizacao) BETWEEN 6 AND 11 THEN 'Manhã' " +
                "  WHEN HOUR(dataHoraRealizacao) BETWEEN 12 AND 17 THEN 'Tarde' " +
                "  WHEN HOUR(dataHoraRealizacao) BETWEEN 18 AND 23 THEN 'Noite' " +
                "  ELSE 'Madrugada' END AS periodo, " +
                "COUNT(*) AS total_exames " +
                "FROM AgendaExame " + // Nome da tabela como no BD
                "WHERE status = 'realizado' " +
                "GROUP BY periodo";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 4. Total de exames realizados no mês/ano
    public List<Object[]> totalExamesPorMesAno() {
        String sql = "SELECT YEAR(dataHoraRealizacao) AS ano, MONTH(dataHoraRealizacao) AS mes, COUNT(*) AS totalExames " +
                "FROM AgendaExame " + // Nome da tabela como no BD
                "WHERE status = 'realizado' " +
                "GROUP BY YEAR(dataHoraRealizacao), MONTH(dataHoraRealizacao) " +
                "ORDER BY YEAR(dataHoraRealizacao), MONTH(dataHoraRealizacao)";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 5. % de exames realizados por médico
    public List<Object[]> percentualExamesPorMedico() {
        String sql = "SELECT c.nome, " +
                "       (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM AgendaExame WHERE status = 'realizado')) AS percentual " +
                "FROM AgendaExame a " + // Nome da tabela como no BD
                "JOIN Medico m ON a.idMedico = m.id " +
                "JOIN Colaborador c ON m.id = c.id " +
                "WHERE a.status = 'realizado' " +
                "GROUP BY c.nome " +
                "ORDER BY percentual DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 6. Médicos com mais atendimentos no mês atual
    public List<Object[]> top5MedicosAtendimentosMesAtual() {
        String sql = "SELECT c.nome, COUNT(*) AS atendimentos " +
                "FROM AgendaExame a " + // Nome da tabela como no BD
                "JOIN Medico m ON a.idMedico = m.id " +
                "JOIN Colaborador c ON m.id = c.id " +
                "WHERE a.status = 'realizado' " +
                "AND YEAR(a.dataHoraRealizacao) = YEAR(CURDATE()) " +
                "AND MONTH(a.dataHoraRealizacao) = MONTH(CURDATE()) " +
                "GROUP BY c.nome " +
                "ORDER BY atendimentos DESC " +
                "LIMIT 5";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 7. Pacientes com mais exames realizados
    public List<Object[]> top10PacientesMaisExames() {
        String sql = "SELECT p.nome, COUNT(*) AS total_exames " +
                "FROM AgendaExame a " + // Nome da tabela como no BD
                "JOIN Paciente p ON a.idPaciente = p.id " +
                "WHERE a.status = 'realizado' " +
                "GROUP BY p.id, p.nome " +
                "ORDER BY total_exames DESC " +
                "LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 8. Exames por faixa etária dos pacientes
    public List<Object[]> examesPorFaixaEtaria() {
        String sql = "SELECT " +
                "  CASE " +
                "    WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) < 18 THEN '<18' " +
                "    WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 18 AND 35 THEN '18-35' " +
                "    WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 36 AND 60 THEN '36-60' " +
                "    ELSE '>60' END AS faixa_etaria, " +
                "  COUNT(*) AS total_exames " +
                "FROM AgendaExame a " + // Nome da tabela como no BD
                "JOIN Paciente p ON a.idPaciente = p.id " +
                "WHERE a.status = 'realizado' " +
                "GROUP BY faixa_etaria " +
                "ORDER BY faixa_etaria";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 9. Pacientes que indicaram outro paciente
    public List<Object[]> top10PacientesIndicadores() {
        String sql = "SELECT p1.nome AS paciente, COUNT(p2.id) AS indicados " +
                "FROM Paciente p1 " + // Nome da tabela como no BD
                "LEFT JOIN Paciente p2 ON p2.pacienteIndicador = p1.id " +
                "GROUP BY p1.id, p1.nome " +
                "ORDER BY indicados DESC " +
                "LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 10. Produtos mais utilizados
    public List<Object[]> top10ProdutosMaisUtilizados() {
        String sql = "SELECT p.nome AS produto, " +
                "COUNT(v.dataHoraVenda) AS vezes_vendido, " +
                "SUM(v.quantidade) AS quantidade_vendida " +
                "FROM Venda v " + // Nome da tabela como no BD
                "JOIN Produto p ON v.idProduto = p.id " +
                "GROUP BY p.id, p.nome " +
                "ORDER BY quantidade_vendida DESC " +
                "LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 11. Quantidade de produtos
    public List<Object[]> quantidadeProdutos() {
        String sql = "SELECT nome, quantidade " +
                "FROM Produto " + // Nome da tabela como no BD
                "ORDER BY quantidade DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 12. Compras por fornecedor
    public List<Object[]> comprasPorFornecedor() {
        String sql = "SELECT f.nome AS fornecedor, SUM(v.quantidade) AS total_vendido " +
                "FROM Venda v " + // Nome da tabela como no BD
                "JOIN Fornecedor f ON v.idFornecedor = f.id " +
                "GROUP BY f.id, f.nome " +
                "ORDER BY total_vendido DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 13. Total de exames agendados por dia
    public List<Object[]> examesAgendadosPorDia() {
        String sql = "SELECT DATE(dataHoraRealizacao) AS dia, COUNT(*) AS total_exames " +
                "FROM AgendaExame " + // Nome da tabela como no BD
                "GROUP BY DATE(dataHoraRealizacao) " + // DATE() é importante aqui para agrupar corretamente
                "ORDER BY DATE(dataHoraRealizacao)";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 14. Número médio de exames que um paciente faz por agendamento
    public Double mediaExamesPorAgendamento() {
        String sql = "SELECT AVG(qtd_exames) AS media_exames_por_agendamento " +
                "FROM ( " +
                "  SELECT idPaciente, dataHoraRealizacao, COUNT(*) AS qtd_exames " +
                "  FROM AgendaExame " + // Nome da tabela como no BD
                "  GROUP BY idPaciente, dataHoraRealizacao " +
                ") sub";
        // queryForObject é usado quando se espera exatamente uma linha e uma coluna, ou um único valor.
        // Se a consulta puder não retornar nada, pode lançar EmptyResultDataAccessException.
        // Considere adicionar tratamento de erro se necessário (e.g., try-catch ou verificar contagem antes).
        return jdbcTemplate.queryForObject(sql, Double.class);
    }

    // 15. Quantos exames agendados por hora do dia
    public List<Object[]> examesPorHora() {
        String sql = "SELECT HOUR(dataHoraRealizacao) AS hora, COUNT(*) AS total_exames " +
                "FROM AgendaExame " + // Nome da tabela como no BD
                "GROUP BY hora " +
                "ORDER BY total_exames DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }
}