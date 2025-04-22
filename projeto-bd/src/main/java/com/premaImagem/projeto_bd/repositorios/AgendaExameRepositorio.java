package com.premaImagem.projeto_bd.repositorios;

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

    public AgendaExame buscarPorId(LocalDateTime dataHoraRealizacao, long idMedico, long idPaciente, long idExame) {
        String sql = "SELECT * FROM AgendaExame WHERE idMedico = ? AND idPaciente = ? AND idExame = ? AND dataHoraRealizacao = ?";
        List<AgendaExame> agendaExame = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AgendaExame.class), idMedico, idPaciente, idExame, dataHoraRealizacao);
        if (agendaExame.isEmpty()) {
            return null;
        } else {
            return agendaExame.get(0); // Como a busca será baseada em uma combinação única, deve retornar no máximo 1 item.
        }
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

    public int deletar(LocalDateTime dataHoraRealizacao, long idPaciente, long idMedico, long idExame) {
        String sql = "DELETE FROM AgendaExame WHERE dataHoraRealizacao = ? AND idPaciente = ? AND idMedico = ? AND idExame = ?";
        return jdbcTemplate.update(sql, dataHoraRealizacao, idPaciente, idMedico, idExame);
    }
}
