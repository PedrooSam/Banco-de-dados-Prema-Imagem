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
        colaboradorRepositorio.criar(dto.getNome(), dto.getCpf());
        return "Colaborador criado com sucesso!";
    }


    @GetMapping("/cpf/{cpf}")
    public Colaborador buscarPorCpf(@PathVariable String cpf) {
        return colaboradorRepositorio.buscarPorCpf(cpf);
    }
}
