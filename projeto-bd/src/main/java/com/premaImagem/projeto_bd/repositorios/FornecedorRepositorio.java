package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.premaImagem.projeto_bd.entidades.Fornecedor;

@Repository
public class FornecedorRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FornecedorRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Fornecedor> buscarLista() {
        String sql = "SELECT * FROM Fornecedor";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Fornecedor.class));
    }

    public List<Fornecedor> buscarPorNome(String nome){
        String sql= "SELECT * FROM Fornecedor WHERE nome = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Fornecedor.class), nome);
    }

    public List<Fornecedor> buscarPorId(String id) {
        String sql = "SELECT * FROM Fornecedor WHERE id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Fornecedor.class), id);
    }

    public int criar(Fornecedor fornecedor) {
        String sql = "INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, fornecedor.getId(), fornecedor.getNome(), fornecedor.getCnpj(),
                fornecedor.getTelefone1(), fornecedor.getTelefone2(), fornecedor.getEmail());
    }

    public int atualizar(Fornecedor fornecedor) {
        String sql = "UPDATE Fornecedor SET nome = ?, cnpj = ?, telefone1 = ?, telefone2 = ?, email = ? WHERE id = ?";
        return jdbcTemplate.update(sql, fornecedor.getNome(), fornecedor.getCnpj(), fornecedor.getTelefone1(),
                fornecedor.getTelefone2(), fornecedor.getEmail(), fornecedor.getId());
    }

    public int deletar(String id) {
        String sql = "DELETE FROM Fornecedor WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
