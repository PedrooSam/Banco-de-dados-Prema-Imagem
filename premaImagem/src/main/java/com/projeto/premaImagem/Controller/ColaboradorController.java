package com.projeto.premaImagem.Controller;
import com.projeto.premaImagem.Models.Colaborador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.premaImagem.Models.Colaborador;
import com.projeto.premaImagem.Repositorio.Repositorio;

@RestController
@RequestMapping("/Colaborador")
public class ColaboradorController {

    private final Repositorio repositorio;

    @Autowired
    public ColaboradorController(Repositorio repositorio) {
        this.repositorio = repositorio;
    }

    @PostMapping
    public String criarColaborador(@RequestBody Colaborador colaborador) {
        repositorio.salvarColaborador(colaborador);
        return "Colaborador inserido com sucesso!";
    }
}
