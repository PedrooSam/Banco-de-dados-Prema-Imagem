package com.premaImagem.projeto_bd.repositorios;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.AgendaExame;
import java.time.LocalDateTime;

@Repository
public class AgendaExameRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AgendaExameRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AgendaExame> buscarLista() {
        String sql = "SELECT * FROM AgendaExame";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AgendaExame.class));
    }

    public List<AgendaExame> buscarPorId(long idMedico, long idPaciente, long idExame, LocalDateTime dataHoraRealizacao) {
        String sql = "SELECT * FROM AgendaExame WHERE idMedico = ? AND idPaciente = ? AND idExame = ? AND dataHoraRealizacao = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AgendaExame.class), idMedico, idPaciente, idExame, dataHoraRealizacao);
    }
    public List<AgendaExame> buscarPorData(LocalDate dataHoraRealizacao) {
        String sql = "SELECT * FROM AgendaExame WHERE extract(day from dataHoraRealizacao) = ? and extract(month from dataHoraRealizacao) = ? and extract(year from dataHoraRealizacao) = ?";
        List<AgendaExame> agendaExame = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AgendaExame.class), dataHoraRealizacao.getDayOfMonth(), dataHoraRealizacao.getMonthValue(), dataHoraRealizacao.getYear());
        return agendaExame;
    }

    public List<AgendaExame> buscarPorMedico(long idMedico) {
        String sql = "SELECT * FROM AgendaExame WHERE idMedico = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AgendaExame.class), idMedico);
    }

    public int criar(AgendaExame agendaExame) {
        String sql = "INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                agendaExame.getDataHoraRealizacao(),
                agendaExame.getMedicoRequisitante(),
                agendaExame.getLaudo(),
                agendaExame.getStatus(),
                agendaExame.getIdPaciente(),
                agendaExame.getIdMedico(),
                agendaExame.getIdExame()
        );
    }

    public int atualizar(AgendaExame agendaExame) {
        String sql = "UPDATE AgendaExame SET medicoRequisitante = ?, laudo = ?, status = ? " +
                     "WHERE dataHoraRealizacao = ? AND idPaciente = ? AND idMedico = ? AND idExame = ?";
        return jdbcTemplate.update(sql,
                agendaExame.getMedicoRequisitante(),
                agendaExame.getLaudo(),
                agendaExame.getStatus(),
                agendaExame.getDataHoraRealizacao(),
                agendaExame.getIdPaciente(),
                agendaExame.getIdMedico(),
                agendaExame.getIdExame()
        );
    }

    public int deletar(long idMedico, long idPaciente, long idExame, LocalDateTime dataHoraRealizacao) {
        String sql = "DELETE FROM AgendaExame WHERE idMedico = ? AND idPaciente = ? AND idExame = ? AND dataHoraRealizacao = ?";
        return jdbcTemplate.update(sql, idMedico, idPaciente, idExame, dataHoraRealizacao);
    }
}
