package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premaImagem.projeto_bd.entidades.Empregado;
import com.premaImagem.projeto_bd.repositorios.EmpregadoRepositorio;

@RestController
@RequestMapping("/empregados")
public class EmpregadoController {

    private EmpregadoRepositorio repositorio;

    @Autowired
    public EmpregadoController(EmpregadoRepositorio repositorio){
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Empregado> listar(){
        return repositorio.buscarLista();
    }

    @GetMapping("/{nome}")
    public Empregado buscar(String nome){
        return repositorio.buscarPorNome(nome);
    }

    @GetMapping("/{id}")
    public Empregado buscar(long id){
        return repositorio.buscarPorId(id);
    }

    @PostMapping
    public String criar(Empregado empregado){
        int retorno = repositorio.criar(empregado);

        if (retorno == 1) return "Empregado adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";

        return "Erro ao adicionar empregado.";
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Empregado empregado){

        empregado.setId(id);
        int retorno = repositorio.atualizar(empregado);

        if (retorno == 1) return "Empregado atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao atualizar empregado.";
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id){
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Empregado deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao deletar empregado.";
    }
}