package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ColaboradorRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ColaboradorRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void criar(String nome, String cpf) {
        String sql = "INSERT INTO Colaborador (nome, cpf) VALUES (?, ?)";
        jdbcTemplate.update(sql, nome, cpf);
    }

    public Colaborador buscarPorCpf(String cpf) {
        String sql = "SELECT * FROM Colaborador WHERE cpf = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Colaborador.class), cpf);
    }
}
