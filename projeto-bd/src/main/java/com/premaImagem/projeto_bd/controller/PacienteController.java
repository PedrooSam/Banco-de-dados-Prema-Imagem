package com.premaImagem.projeto_bd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.repositorios.PacienteRepositorio;
import com.premaImagem.projeto_bd.entidades.Paciente;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteRepositorio repositorio;

    @Autowired
    public PacienteController(PacienteRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    // GET: lista todos os pacientes
    @GetMapping
    public List<Paciente> listar() {
        return repositorio.buscarLista();
    }

    // GET: busca um paciente pelo ID
    @GetMapping("/{id}")
    public Paciente buscar(@PathVariable("id") long id) {
        return repositorio.buscarPorId(id);
    }

    @GetMapping("/{cpf}")
    public Paciente buscar(@PathVariable("cpf") String cpf) {
        return repositorio.buscarPorCpf(cpf);
    }

    // POST: cria novo paciente
    @PostMapping
    public String criar(@RequestBody Paciente paciente) {
        int retorno = repositorio.criar(paciente);

        if (retorno == 1) return "Paciente adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";
        return "Erro ao adicionar paciente.";
    }

    // DELETE: remove um paciente pelo ID
    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id) {
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Paciente deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao deletar paciente";
    }

    // PUT: atualiza um paciente existente
    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Paciente paciente) {
        paciente.setId(id); // garante que o ID vem da URL
        int retorno = repositorio.atualizar(paciente);

        if (retorno == 1) return "Paciente atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao atualizar paciente.";
    }
}
