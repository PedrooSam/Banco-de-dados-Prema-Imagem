package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Medico;
import com.premaImagem.projeto_bd.repositorios.MedicoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        List<Medico> listaDeMedico = repositorio.buscarLista();
        return listaDeMedico;
    }

    @GetMapping("/id/{id}")
    public List<Medico> buscarPorId(@PathVariable long id) {
        List<Medico> medico = repositorio.buscarPorId(id);
        return medico;
    }

    @GetMapping("/nome/{nome}")
    public List<Medico> buscarPorNome(@PathVariable String nome) {
        List<Medico> medico = repositorio.buscarPorNome(nome);
        return medico;
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

    @DeleteMapping("/id/{id}")
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