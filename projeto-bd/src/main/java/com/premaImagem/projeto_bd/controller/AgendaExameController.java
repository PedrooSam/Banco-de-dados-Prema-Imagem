package com.premaImagem.projeto_bd.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        List<AgendaExame> listaDeAgendaExame = repositorio.buscarLista();
        return listaDeAgendaExame;
    }

    // GET: busca um agendamento específico (chave composta)
    @GetMapping("/{idMedico}/{idPaciente}/{idExame}/{dataHoraRealizacao}")
    public ResponseEntity<AgendaExame> buscarPorIdComposto(@PathVariable long idMedico,
                                                           @PathVariable long idPaciente,
                                                           @PathVariable long idExame,
                                                           @PathVariable LocalDateTime dataHoraRealizacao) {
        // Certifique-se de que o método no repositório esteja pronto para lidar com esses 4 parâmetros
        AgendaExame agendaExame = repositorio.buscarPorId(dataHoraRealizacao, idMedico, idPaciente, idExame);
        if (agendaExame != null) {
            return ResponseEntity.ok(agendaExame);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{dataHoraRealizacao}")
    public List<AgendaExame> buscarPorData(@PathVariable LocalDate dataHoraRealizacao){
        List<AgendaExame> listaDeAgendaExame = repositorio.buscarPorData(dataHoraRealizacao);
        return listaDeAgendaExame;
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
    @PutMapping("/{idMedico}/{idPaciente}/{idExame}/{dataHoraRealizacao}")
    public ResponseEntity<String> atualizar(@PathVariable long idMedico,
                                            @PathVariable long idPaciente,
                                            @PathVariable long idExame,
                                            @PathVariable LocalDateTime dataHoraRealizacao,
                                            @RequestBody AgendaExame agendaExame) {

        // Verifica se a agenda já existe
        AgendaExame existente = repositorio.buscarPorId(dataHoraRealizacao, idMedico, idPaciente, idExame);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        // Atualize a agenda com os dados enviados
        agendaExame.setIdMedico(idMedico);
        agendaExame.setIdPaciente(idPaciente);
        agendaExame.setIdExame(idExame);
        agendaExame.setDataHoraRealizacao(dataHoraRealizacao);

        repositorio.atualizar(agendaExame);
        return ResponseEntity.ok("Agenda de exame atualizada com sucesso!");
    }

    // DELETE: remove um agendamento específico (chave composta)
    @DeleteMapping("/{idMedico}/{idPaciente}/{idExame}/{dataHoraRealizacao}")
    public ResponseEntity<String> deletar(@PathVariable long idMedico,
                                          @PathVariable long idPaciente,
                                          @PathVariable long idExame,
                                          @PathVariable LocalDateTime dataHoraRealizacao) {

        // Verificar se a agenda do exame existe
        AgendaExame agendaExame = repositorio.buscarPorId(dataHoraRealizacao, idMedico, idPaciente, idExame);
        if (agendaExame == null) {
            return ResponseEntity.notFound().build();
        }

        // Deletar a agenda do exame
        repositorio.deletar(dataHoraRealizacao, idMedico, idPaciente, idExame);
        return ResponseEntity.ok("Agenda de exame deletada com sucesso!");
    }
}
