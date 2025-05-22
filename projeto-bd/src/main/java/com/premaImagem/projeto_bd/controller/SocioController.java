package com.premaImagem.projeto_bd.controller;

import java.util.List;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import com.premaImagem.projeto_bd.entidades.Medico;
import com.premaImagem.projeto_bd.entidades.Socio;
import com.premaImagem.projeto_bd.repositorios.ColaboradorRepositorio;
import com.premaImagem.projeto_bd.repositorios.SocioRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/socios")
public class SocioController {

    private final SocioRepositorio repositorio;
    private final ColaboradorRepositorio colaboradorRepositorio;

    @Autowired
    public SocioController(SocioRepositorio repositorio, ColaboradorRepositorio colaboradorRepositorio) {
        this.repositorio = repositorio;
        this.colaboradorRepositorio = colaboradorRepositorio;
    }

    @GetMapping
    public List<Socio> listar() {
        List<Socio> listaDeSocio = repositorio.buscarLista();
        return listaDeSocio;
    }

    @GetMapping("/nome/{nome}")
    public List<Socio> buscarPorNome(@PathVariable String nome) {
        List<Socio> socio = repositorio.buscarPorNome(nome);
        return socio;
    }

    @GetMapping("/{id}")
    public List<Socio> buscarPorId(@PathVariable("id") long id) {
        List<Socio> socio = repositorio.buscarPorId(id);
        return socio;
    }

    @PostMapping
    public String criar(@RequestBody Socio socio) {
        int retorno = repositorio.criar(socio);
        if (retorno == 1) {
            return "Sócio criado com sucesso!";
        } else {
            return "Erro ao criar sócio.";
        }
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Socio socio) {
        socio.setId(id);
        int retorno = repositorio.atualizar(socio);
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
