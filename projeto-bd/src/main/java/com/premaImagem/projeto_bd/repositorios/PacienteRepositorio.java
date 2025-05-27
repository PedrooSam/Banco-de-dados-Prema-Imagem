package com.premaImagem.projeto_bd.repositorios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.premaImagem.projeto_bd.entidades.Paciente;

import java.util.List;

@Repository
public class PacienteRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PacienteRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Paciente> buscarLista() {
        String sql = "SELECT * FROM Paciente";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Paciente.class));
    }

    public List<Paciente> buscarPorId(long id) {
        String sql = "SELECT * FROM Paciente WHERE id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Paciente.class), id);
    }

    public List<Paciente> buscarPorCpf(String cpf) {
        String sql = "SELECT * FROM Paciente WHERE cpf = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Paciente.class), cpf);
    }

    public int criar(Paciente paciente) {
        String sql = "INSERT INTO Paciente (nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) " +
                     "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

        return jdbcTemplate.update(sql,
                paciente.getNome(),
                paciente.getNomeSocial(),
                paciente.getCpf(),
                paciente.getRg(),
                paciente.getDataNascimento(),
                paciente.getCep(),
                paciente.getNumeroEndereco(),
                paciente.getComplementoEndereco(),
                paciente.getTelefone1(),
                paciente.getTelefone2(),
                paciente.getEmail(),
                paciente.getNomeMae(),
                paciente.getPacienteIndicador()
        );
    }

    public int atualizar(Paciente paciente) {
        String sql = "UPDATE Paciente SET nome = ?, nomeSocial = ?, cpf = ?, rg = ?, dataNascimento = ?, cep = ?, numeroEndereco = ?, complementoEndereco = ?, " +
                     "telefone1 = ?, telefone2 = ?, email = ?, nomeMae = ?, pacienteIndicador = ? WHERE id = ?";

        return jdbcTemplate.update(sql,
                paciente.getNome(),
                paciente.getNomeSocial(),
                paciente.getCpf(),
                paciente.getRg(),
                paciente.getDataNascimento(),
                paciente.getCep(),
                paciente.getNumeroEndereco(),
                paciente.getComplementoEndereco(),
                paciente.getTelefone1(),
                paciente.getTelefone2(),
                paciente.getEmail(),
                paciente.getNomeMae(),
                paciente.getPacienteIndicador(),
                paciente.getId()
        );
    }

    public int deletar(long id) {
        String sql = "DELETE FROM Paciente WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}