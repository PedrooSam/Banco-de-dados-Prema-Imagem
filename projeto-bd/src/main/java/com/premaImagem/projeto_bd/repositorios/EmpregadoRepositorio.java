package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.Empregado;


@Repository
public class EmpregadoRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmpregadoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Empregado> buscarLista(){
        String sql = "SELECT * FROM Empregado INNER JOIN Colaborador ON Empregado.id = Colaborador.id";
        List<Empregado> exames = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Empregado.class));
        return exames;
    }

    public Empregado buscarPorNome(String nome){
        String sql = "SELECT * FROM Empregado INNER JOIN Colaborador ON Empregado.id = Colaborador.id WHERE Colaborador.nome = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Empregado.class), nome);
    }

    public Empregado buscarPorId(long id){
        String sql = "SELECT * FROM Empregado INNER JOIN Colaborador ON Empregado.id = Colaborador.id WHERE Colaborador.id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Empregado.class), id);
    }

    public int criar(Empregado empregado){

        String sqlColaborador = "INSERT INTO Colaborador (cpf, nome) VALUES (?, ?)";
        jdbcTemplate.update(sqlColaborador, empregado.getCpf(), empregado.getNome());

        String sqlEmpregado = "INSERT INTO Empregado (id, numeroPis, salario, funcao, dataAdmissao) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sqlEmpregado, empregado.getId(), empregado.getNumeroPis(), empregado.getSalario(), empregado.getFuncao(), empregado.getDataAdmissao());
    }

    public int atualizar(Empregado empregado){
        String sqlColaborador = "UPDATE Colaborador SET cpf = ?, nome = ? WHERE id = ?";
        jdbcTemplate.update(sqlColaborador, empregado.getCpf(), empregado.getNome(), empregado.getId());

        String sqlEmpregado = "UPDATE Empregado SET numeroPis = ?, salario = ?, funcao = ?, dataAdmissao = ? WHERE id = ?";
        return jdbcTemplate.update(sqlEmpregado, empregado.getNumeroPis(), empregado.getSalario(), empregado.getFuncao(), empregado.getDataAdmissao(), empregado.getId());
    }

    public int deletar(long id){
        String sqlColaborador = "DELETE FROM Colaborador WHERE id = ?";
        jdbcTemplate.update(sqlColaborador, id);

        String sqlEmpregado = "DELETE FROM Empregado WHERE id = ?";
        return jdbcTemplate.update(sqlEmpregado, id);
    }

}