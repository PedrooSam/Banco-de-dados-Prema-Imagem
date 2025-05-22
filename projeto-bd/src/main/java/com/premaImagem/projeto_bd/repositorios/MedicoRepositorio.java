package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.Medico;
import org.springframework.transaction.annotation.Transactional;



@Repository
public class MedicoRepositorio{

    private final JdbcTemplate jdbcTemplate;


    @Autowired
    public MedicoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Medico> buscarLista(){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id";
        return jdbcTemplate.query(sqlMedico, new BeanPropertyRowMapper<>(Medico.class));
    }

    public Medico buscarPorNome(String nome){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id WHERE c.nome = ?";
        return jdbcTemplate.queryForObject(sqlMedico, new BeanPropertyRowMapper<>(Medico.class), nome);
    }

    //buscar por id
    public List<Medico> buscarPorId(long id){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id WHERE c.id = ?";
        List<Medico> medico = jdbcTemplate.query(sqlMedico, new BeanPropertyRowMapper<>(Medico.class), id);
        return medico;
    }

    @Transactional
    public int criar(Medico medico) {
        // Primeiro tenta buscar colaborador pelo CPF
        Colaborador colaboradorExistente = null;
        try {
            String sqlBuscaColaborador = "SELECT * FROM Colaborador WHERE cpf = ?";
            colaboradorExistente = jdbcTemplate.queryForObject(
                    sqlBuscaColaborador,
                    new BeanPropertyRowMapper<>(Colaborador.class),
                    medico.getCpf()
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
            jdbcTemplate.update(sqlColaborador, medico.getCpf(), medico.getNome());

            // Pega o ID recém-gerado
            Number idNumber = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Number.class);
            id = idNumber.longValue();
        }

        // Define o ID no médico
        medico.setId(id);

        // Agora insere o médico
        String sqlMedico = "INSERT INTO Medico (id, crm, especialidade) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sqlMedico, medico.getId(), medico.getCrm(), medico.getEspecialidade());
    }

    @Transactional
    public int atualizar(Medico medico){
        String sqlColaborador = "UPDATE Colaborador SET Colaborador.nome = ?, Colaborador.cpf = ? WHERE id = ?";
        jdbcTemplate.update(sqlColaborador, medico.getNome(), medico.getCpf(), medico.getId());


        String sqlMedico = "UPDATE Medico SET Medico.crm = ?, Medico.especialidade = ? Where Medico.id = ?";
        return jdbcTemplate.update(sqlMedico, medico.getCrm(), medico.getEspecialidade(), medico.getId());
    }

    @Transactional
    public int deletar(long id){
        String sqlMedico = "DELETE FROM Medico WHERE id = ?";
        jdbcTemplate.update(sqlMedico, id);

        String sqlColaborador = "DELETE FROM Colaborador Where id = ?";
        return jdbcTemplate.update(sqlColaborador, id);
    }

}