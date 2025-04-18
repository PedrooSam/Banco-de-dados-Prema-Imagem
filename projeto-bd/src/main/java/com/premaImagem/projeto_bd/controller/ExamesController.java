package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.repositorios.ExameRepositorio;
import com.premaImagem.projeto_bd.entidades.Exame;

@RestController
@RequestMapping("/exames")
public class ExamesController {

    private final ExameRepositorio repositorio;

    @Autowired
    public ExamesController(ExameRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    // GET: lista todos os exames
    @GetMapping
    public List<Exame> listar() {
        return repositorio.buscarLista();
    }

    // GET: busca um exame pelo nome (ou ID, dependendo do tipo)
    @GetMapping("/{id}")
    public Exame buscarPorId(@PathVariable("id") long id) {
        return repositorio.buscar(id);
    }

    // POST: cria novo exame
    @PostMapping
    public String criar(@RequestBody Exame exame) {
        int retorno = repositorio.criar(exame);

        if (retorno == 1) return "Exame adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";
        return "Erro ao adicionar exame.";
    }

    // DELETE: remove um exame pelo ID
    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id) {
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Exame deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao deletar exame";
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Exame exame) {
        exame.setId(id); // garante que o ID vem da URL
        int retorno = repositorio.atualizar(exame);

        if (retorno == 1) return "Exame atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao atualizar exame.";
    }
}
