package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import com.premaImagem.projeto_bd.entidades.Empregado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class EmpregadoRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmpregadoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Empregado> buscarLista() {
        String sql = "SELECT e.id, e.numeroPis, e.salario, e.funcao, e.dataAdmissao, c.nome, c.cpf " +
                "FROM Empregado e INNER JOIN Colaborador c ON e.id = c.id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Empregado.class));
    }

    public Empregado buscarPorId(long id) {
        String sql = "SELECT e.id, e.numeroPis, e.salario, e.funcao, e.dataAdmissao, c.nome, c.cpf " +
                "FROM Empregado e INNER JOIN Colaborador c ON e.id = c.id WHERE e.id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Empregado.class), id);
    }

    public Empregado buscarPorNome(String nome) {
        String sql = "SELECT e.id, e.numeroPis, e.salario, e.funcao, e.dataAdmissao, c.nome, c.cpf " +
                "FROM Empregado e INNER JOIN Colaborador c ON e.id = c.id WHERE c.nome = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Empregado.class), nome);
    }

    @Transactional
    public int criar(Empregado empregado) {
        // Verificar se o colaborador com o CPF já existe
        Colaborador colaboradorExistente = null;
        try {
            String sqlBuscaColaborador = "SELECT * FROM Colaborador WHERE cpf = ?";
            colaboradorExistente = jdbcTemplate.queryForObject(
                    sqlBuscaColaborador,
                    new BeanPropertyRowMapper<>(Colaborador.class),
                    empregado.getCpf()
            );
        } catch (Exception e) {
            // Se não encontrar, ignora o erro e segue com a criação
        }

        long id;

        if (colaboradorExistente != null) {
            // Colaborador já existe, usa o ID dele
            id = colaboradorExistente.getId();
        } else {
            // Cria novo colaborador
            String sqlColaborador = "INSERT INTO Colaborador (cpf, nome) VALUES (?, ?)";
            jdbcTemplate.update(sqlColaborador, empregado.getCpf(), empregado.getNome());

            // Pega o ID recém-gerado
            Number idNumber = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Number.class);
            id = idNumber.longValue();
        }

        // Define o ID no empregado
        empregado.setId(id);

        // Agora insere o empregado
        String sqlEmpregado = "INSERT INTO Empregado (id, numeroPis, salario, funcao, dataAdmissao) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sqlEmpregado, empregado.getId(), empregado.getNumeroPis(), empregado.getSalario(),
                empregado.getFuncao(), empregado.getDataAdmissao());
    }

    @Transactional
    public int atualizar(Empregado empregado) {
        // Atualiza dados do colaborador
        String sqlColaborador = "UPDATE Colaborador SET nome = ?, cpf = ? WHERE id = ?";
        jdbcTemplate.update(sqlColaborador, empregado.getNome(), empregado.getCpf(), empregado.getId());

        // Atualiza dados do empregado
        String sqlEmpregado = "UPDATE Empregado SET numeroPis = ?, salario = ?, funcao = ?, dataAdmissao = ? WHERE id = ?";
        return jdbcTemplate.update(sqlEmpregado, empregado.getNumeroPis(), empregado.getSalario(), empregado.getFuncao(),
                empregado.getDataAdmissao(), empregado.getId());
    }

    @Transactional
    public int deletar(long id) {
        // Deleta o empregado
        String sqlEmpregado = "DELETE FROM Empregado WHERE id = ?";
        jdbcTemplate.update(sqlEmpregado, id);

        // Deleta o colaborador associado
        String sqlColaborador = "DELETE FROM Colaborador WHERE id = ?";
        return jdbcTemplate.update(sqlColaborador, id);
    }
}
