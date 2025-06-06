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
    public List<AgendaExame> buscarPorIdComposto(@PathVariable long idMedico,
                                                           @PathVariable long idPaciente,
                                                           @PathVariable long idExame,
                                                           @PathVariable LocalDateTime dataHoraRealizacao) {
        // Certifique-se de que o método no repositório esteja pronto para lidar com esses 4 parâmetros
        List<AgendaExame> agendaExame = repositorio.buscarPorId(idMedico,idPaciente, idExame, dataHoraRealizacao);
        return agendaExame;
    }
    @GetMapping("/{dataHoraRealizacao}")
    public List<AgendaExame> buscarPorData(@PathVariable LocalDate dataHoraRealizacao){
        List<AgendaExame> listaDeAgendaExame = repositorio.buscarPorData(dataHoraRealizacao);
        return listaDeAgendaExame;
    }

    @GetMapping("/medico/{idMedico}")
    public List<AgendaExame> buscarPorMedico(@PathVariable long idMedico) {
        return repositorio.buscarPorMedico(idMedico);
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
    public String atualizar(@PathVariable long idMedico,
                                            @PathVariable long idPaciente,
                                            @PathVariable long idExame,
                                            @PathVariable LocalDateTime dataHoraRealizacao,
                                            @RequestBody AgendaExame agendaExame) {

        // Verifica se a agenda já existe
        List<AgendaExame> existente = repositorio.buscarPorId(idMedico,idPaciente, idExame, dataHoraRealizacao);
        if (existente.isEmpty()) {
            return "Agendamento não encontrado!";
        }

        // Atualize a agenda com os dados enviados
        agendaExame.setIdMedico(idMedico);
        agendaExame.setIdPaciente(idPaciente);
        agendaExame.setIdExame(idExame);
        agendaExame.setDataHoraRealizacao(dataHoraRealizacao);

        repositorio.atualizar(agendaExame);
        return "Agenda de exame atualizada com sucesso!";
    }

    // DELETE: remove um agendamento específico (chave composta)
    @DeleteMapping("/{idMedico}/{idPaciente}/{idExame}/{dataHoraRealizacao}")
    public String deletar(@PathVariable long idMedico,
                          @PathVariable long idPaciente,
                          @PathVariable long idExame,
                          @PathVariable LocalDateTime dataHoraRealizacao) {

        List<AgendaExame> existente = repositorio.buscarPorId(idMedico, idPaciente, idExame, dataHoraRealizacao);
        if (existente.isEmpty()) {
            return "Agendamento não encontrado!";
        }

        int deletados = repositorio.deletar(idMedico, idPaciente, idExame, dataHoraRealizacao);
        if (deletados > 0) {
            return "Agenda de exame deletada com sucesso!";
        } else {
            return "Falha ao deletar agendamento!";
        }
    }
}
