package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import com.premaImagem.projeto_bd.repositorios.ColaboradorRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    private final ColaboradorRepositorio colaboradorRepositorio;

    @Autowired
    public ColaboradorController(ColaboradorRepositorio colaboradorRepositorio) {
        this.colaboradorRepositorio = colaboradorRepositorio;
    }

    @PostMapping
    public String criarColaborador(@RequestBody Colaborador dto) {
        colaboradorRepositorio.criar(dto);
        return "Colaborador criado com sucesso!";
    }

    @GetMapping
    public List<Colaborador> buscarPorLista() {
        List<Colaborador> colaborador = colaboradorRepositorio.listar();
        return colaborador;
    }

    @GetMapping("/cpf/{cpf}")
    public List<Colaborador> buscarPorCpf(@PathVariable String cpf) {
        List<Colaborador> colaborador = colaboradorRepositorio.buscarPorCpf(cpf);
        return colaborador;
    }

    @GetMapping("/id/{id}")
    public List<Colaborador> buscarPorId(@PathVariable long id) {
        List<Colaborador> colaborador = colaboradorRepositorio.buscarPorId(id);
        return colaborador;
    }
}
