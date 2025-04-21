package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.repositorios.AgendaExameRepositorio;
import com.premaImagem.projeto_bd.entidades.AgendaExame;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/agenda-exames")
public class AgendaExameController {

    private final AgendaExameRepositorio repositorio;

    @Autowired
    public AgendaExameController(AgendaExameRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    // GET: lista todos os agendamentos de exame
    @GetMapping
    public List<AgendaExame> listar() {
        return repositorio.buscarLista();
    }

    // GET: busca um agendamento específico (chave composta)
    @GetMapping("/buscar")
    public AgendaExame buscar(
            @RequestParam("dataHoraRealizacao") LocalDateTime dataHoraRealizacao,
            @RequestParam("idPaciente") long idPaciente,
            @RequestParam("idMedico") long idMedico,
            @RequestParam("idExame") long idExame
    ) {
        return repositorio.buscar(dataHoraRealizacao, idPaciente, idMedico, idExame);
    }

    // POST: cria um novo agendamento de exame
    @PostMapping
    public String criar(@RequestBody AgendaExame agendaExame) {
        int retorno = repositorio.criar(agendaExame);

        if (retorno == 1) return "Agendamento criado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";
        return "Erro ao criar agendamento.";
    }

    // PUT: atualiza um agendamento (usa os campos da chave composta no corpo da requisição)
    @PutMapping
    public String atualizar(@RequestBody AgendaExame agendaExame) {
        int retorno = repositorio.atualizar(agendaExame);

        if (retorno == 1) return "Agendamento atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";
        return "Erro ao atualizar agendamento.";
    }

    // DELETE: remove um agendamento específico (chave composta)
    @DeleteMapping
    public String deletar(
            @RequestParam("dataHoraRealizacao") LocalDateTime dataHoraRealizacao,
            @RequestParam("idPaciente") long idPaciente,
            @RequestParam("idMedico") long idMedico,
            @RequestParam("idExame") long idExame
    ) {
        int retorno = repositorio.deletar(dataHoraRealizacao, idPaciente, idMedico, idExame);

        if (retorno == 1) return "Agendamento deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao deletar agendamento.";
    }
}
