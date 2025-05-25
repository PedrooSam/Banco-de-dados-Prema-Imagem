package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import com.premaImagem.projeto_bd.entidades.Medico;
import com.premaImagem.projeto_bd.entidades.Socio;
import com.premaImagem.projeto_bd.entidades.Venda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class SocioRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SocioRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Socio> buscarLista() {
        String sql = "SELECT c.id, c.nome, c.cpf, s.proLabore " +
                "FROM Colaborador c INNER JOIN Socio s ON c.id = s.id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Socio.class));
    }

    public List<Socio> buscarPorNome(String nome){
        String sqlSocio = "SELECT c.id, c.nome, c.cpf, s.prolabore FROM Colaborador c INNER JOIN Socio s ON c.id = s.id WHERE c.nome = ?";
        List<Socio> socio = jdbcTemplate.query(sqlSocio, new BeanPropertyRowMapper<>(Socio.class), nome);
        return socio;
    }

    public List<Socio> buscarPorId(long id) {
        String sql = "SELECT c.id, c.nome, c.cpf, s.proLabore " +
                "FROM Colaborador c INNER JOIN Socio s ON c.id = s.id WHERE c.id = ?";
        List<Socio> socio = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Socio.class), id);
        return socio;
    }

    public List<Venda> buscarVendasPorSocio(long idSocio) {
        String sql = "SELECT * FROM Venda WHERE idSocio = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Venda.class), idSocio);
    }

    @Transactional
    public int criar(Socio socio) {
        // Verifica se o colaborador já existe
        Colaborador colaboradorExistente = null;
        try {
            String sqlBusca = "SELECT * FROM Colaborador WHERE cpf = ?";
            colaboradorExistente = jdbcTemplate.queryForObject(sqlBusca,
                    new BeanPropertyRowMapper<>(Colaborador.class), socio.getCpf());
        } catch (Exception e) {
            // Colaborador não encontrado, vamos criar
        }

        long id;

        if (colaboradorExistente != null) {
            id = colaboradorExistente.getId();
        } else {
            // Cria o colaborador
            String sqlInserirColab = "INSERT INTO Colaborador (cpf, nome) VALUES (?, ?)";
            jdbcTemplate.update(sqlInserirColab, socio.getCpf(), socio.getNome());

            // Recupera o ID gerado
            Number idGerado = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Number.class);
            id = idGerado.longValue();
        }

        // Define o ID no objeto socio
        socio.setId(id);

        // Cria o sócio com o mesmo ID
        String sqlInserirSocio = "INSERT INTO Socio (id, proLabore) VALUES (?, ?)";
        return jdbcTemplate.update(sqlInserirSocio, socio.getId(), socio.getProLabore());
    }

    @Transactional
    public void transferirVendasSocio(long idSocioAntigo, long idSocioNovo) {
        String sql = "UPDATE Venda SET idSocio = ? WHERE idSocio = ?";
        jdbcTemplate.update(sql, idSocioNovo, idSocioAntigo);
    }

    @Transactional
    public int atualizar(Socio socio) {
        String sqlColab = "UPDATE Colaborador SET nome = ?, cpf = ? WHERE id = ?";
        jdbcTemplate.update(sqlColab, socio.getNome(), socio.getCpf(), socio.getId());

        String sql = "UPDATE Socio SET proLabore = ? WHERE id = ?";
        return jdbcTemplate.update(sql, socio.getProLabore(), socio.getId());
    }

    @Transactional
    public int deletar(long id) {
        String sqlSocio = "DELETE FROM Socio WHERE id = ?";
        jdbcTemplate.update(sqlSocio, id);

        String sqlColab = "DELETE FROM Colaborador WHERE id = ?";
        return jdbcTemplate.update(sqlColab, id);
    }
}
