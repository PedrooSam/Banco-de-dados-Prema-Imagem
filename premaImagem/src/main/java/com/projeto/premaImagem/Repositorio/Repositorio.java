package com.projeto.premaImagem.Repositorio;

import org.springframework.stereotype.Repository;

import com.projeto.premaImagem.Models.Colaborador;

import org.springframework.jdbc.core.JdbcTemplate;

@Repository
public class Repositorio {
	private final JdbcTemplate jdbc;
	
	public Repositorio(JdbcTemplate jdbc) {
		this.jdbc = jdbc;
	}
	
	public void salvarColaborador(Colaborador colaborador) {
		jdbc.update("INSERT INTO colaborador (id, nome, cpf) VALUES (?, ?, ?)",
			colaborador.getId(), colaborador.getNome(), colaborador.getCpf());
	}
}
