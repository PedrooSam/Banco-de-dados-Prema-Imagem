package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Empregado;
import com.premaImagem.projeto_bd.repositorios.EmpregadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        return repositorio.buscarLista();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Empregado> buscarPorId(@PathVariable long id) {
        Empregado empregado = repositorio.buscarPorId(id);
        if (empregado != null) {
            return ResponseEntity.ok(empregado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/nome/{nome}")
    public Empregado buscarPorNome(@PathVariable String nome) {
        return repositorio.buscarPorNome(nome);
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
