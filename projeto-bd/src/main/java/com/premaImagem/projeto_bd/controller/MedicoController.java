package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Medico;
import com.premaImagem.projeto_bd.repositorios.MedicoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")

public class MedicoController{

    private final MedicoRepositorio repositorio;

    @Autowired
    public MedicoController(MedicoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Medico>lista(){
        return repositorio.buscarLista();
    }

    @GetMapping("/{id}")
    public Medico buscar(@PathVariable long id){
        return repositorio.buscarPorId(id);
    }

    @GetMapping("/{nome}")
    public Medico buscar(@PathVariable String nome){
        return repositorio.buscarPorNome(nome);
    }

    @PostMapping
    public String criar(@RequestBody Medico medico){
        int retorno = repositorio.criar(medico);
        if(retorno == 1){
            return "Médico criado com sucesso!";
        }
        else{
            return "Erro ao criar médico.";
        }
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Medico medico){
        medico.setId(id);

        int retorno = repositorio.atualizar(medico);
        if(retorno == 1){
            return "Médico atualizado com sucesso!";
        }
        else{
            return "Erro ao atualizar médico.";
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id){
        int retorno = repositorio.deletar(id);
        if(retorno ==1){
            return "Médico deletado com sucesso!";
        }
        else{
            return "Erro ao deletar médico.";
        }
    }

}