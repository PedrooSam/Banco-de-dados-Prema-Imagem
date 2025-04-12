package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.entidades.Socio;
import com.premaImagem.projeto_bd.repositorios.SocioRepositorio;

@RestController
@RequestMapping("/socios")
public class SocioController {

    private final SocioRepositorio repositorio;

    @Autowired
    public SocioController(SocioRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Socio> listar() {
        return repositorio.buscarLista();
    }

    @GetMapping("/{id}")
    public Socio buscarPorId(@PathVariable("id") long id) {
        return repositorio.buscar(id);
    }

    @PostMapping
    public String criar(@RequestBody Socio socio) {
        int retorno = repositorio.criar(socio);
        if (retorno == 1) return "Sócio adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";
        return "Erro ao adicionar sócio.";
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Socio socio) {
        socio.setId(id);
        int retorno = repositorio.editar(socio);
        if (retorno == 1) return "Sócio atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";
        return "Erro ao atualizar sócio.";
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id) {
        int retorno = repositorio.deletar(id);
        if (retorno == 1) return "Sócio deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";
        return "Erro ao deletar sócio.";
    }
}
