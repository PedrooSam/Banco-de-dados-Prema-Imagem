package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Empregado;
import com.premaImagem.projeto_bd.repositorios.EmpregadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empregados")
public class EmpregadoController {

    private final EmpregadoRepositorio repositorio;

    @Autowired
    public EmpregadoController(EmpregadoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Empregado> lista() {
        List<Empregado> listaDeEmpregado = repositorio.buscarLista();
        return listaDeEmpregado;
    }

    @GetMapping("/id/{id}")
    public List<Empregado> buscarPorId(@PathVariable long id) {
        List<Empregado> empregado = repositorio.buscarPorId(id);
        return empregado;
    }

    @GetMapping("/nome/{nome}")
    public List<Empregado> buscarPorNome(@PathVariable String nome) {
        List<Empregado> empregado = repositorio.buscarPorNome(nome);
        return empregado;
    }

    @PostMapping
    public String criar(@RequestBody Empregado empregado) {
        int retorno = repositorio.criar(empregado);
        if (retorno == 1) {
            return "Empregado criado com sucesso!";
        } else {
            return "Erro ao criar empregado.";
        }
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Empregado empregado) {
        empregado.setId(id);
        int retorno = repositorio.atualizar(empregado);
        if (retorno == 1) {
            return "Empregado atualizado com sucesso!";
        } else {
            return "Erro ao atualizar empregado.";
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id) {
        int retorno = repositorio.deletar(id);
        if (retorno == 1) {
            return "Empregado deletado com sucesso!";
        } else {
            return "Erro ao deletar empregado.";
        }
    }
}
