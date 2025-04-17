package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import com.premaImagem.projeto_bd.repositorios.ColaboradorRepositorio;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    private final ColaboradorRepositorio repositorio;

    @Autowired
    public ColaboradorController(ColaboradorRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Colaborador> listar() {
        return repositorio.buscarLista();
    }

    @GetMapping("/{id}")
    public Colaborador buscarPorId(@PathVariable("id") String id) {
        return repositorio.buscar(id);
    }

    @PostMapping
    public String criar(@RequestBody Colaborador colaborador) {
        int retorno = repositorio.criar(colaborador);
        if (retorno == 1) return "Colaborador adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";
        return "Erro ao adicionar colaborador.";
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable String id, @RequestBody Colaborador colaborador) {
        colaborador.setId(id);
        int retorno = repositorio.editar(colaborador);
        if (retorno == 1) return "Colaborador atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao atualizar colaborador.";
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable String id) {
        int retorno = repositorio.deletar(id);
        if (retorno == 1) return "Colaborador deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao deletar colaborador.";
    }
}
