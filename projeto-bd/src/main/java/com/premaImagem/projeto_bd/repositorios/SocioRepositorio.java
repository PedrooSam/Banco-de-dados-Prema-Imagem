package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.premaImagem.projeto_bd.entidades.Socio;

@Repository
public class SocioRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SocioRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Socio> buscarLista() {
        String sql = "SELECT * FROM Socio";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Socio.class));
    }

    public Socio buscar(long id) {
        String sql = "SELECT id, cpf, nome, proLabore FROM Socio INNER JOIN Colaborador ON Socio.id = Colaborador.id  WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Socio.class), id);
    }

    public int criar(Socio socio) {
        String sql = "INSERT INTO Socio (id, proLabore) VALUES (?, ?)";
        return jdbcTemplate.update(sql, socio.getId(), socio.getProLabore());
    }

    public int atualizar(Socio socio) {
        String sql = "UPDATE Socio SET proLabore = ? WHERE id = ?";
        return jdbcTemplate.update(sql, socio.getProLabore(), socio.getId());
    }

    public int deletar(long id) {
        String sql = "DELETE FROM Socio WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
