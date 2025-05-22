package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import com.premaImagem.projeto_bd.entidades.Exame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ColaboradorRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ColaboradorRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void criar(Colaborador colaborador) {
        String sqlColaborador = "INSERT INTO Colaborador (nome, cpf) VALUES (?, ?)";
        jdbcTemplate.update(sqlColaborador, colaborador.getNome(), colaborador.getCpf());
    }

    public List<Colaborador> listar() {
        String sql = "SELECT * FROM Colaborador";
        List<Colaborador> colaborador = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Colaborador.class));
        return colaborador;
    }

    public List<Colaborador> buscarPorCpf(String cpf) {
        String sql = "SELECT * FROM Colaborador WHERE cpf = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Colaborador.class), cpf);
    }

    public List<Colaborador> buscarPorId(long id) {
        String sql = "SELECT * FROM Colaborador WHERE id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Colaborador.class), id);
    }
}
