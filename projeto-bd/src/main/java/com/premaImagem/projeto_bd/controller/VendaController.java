package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Venda;
import com.premaImagem.projeto_bd.repositorios.VendaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/vendas")

public class VendaController{
    private final VendaRepositorio repositorio;

    @Autowired
    public VendaController(VendaRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Venda> lista(){
        List<Venda> listaDeVenda = repositorio.buscarLista();
        return listaDeVenda;
    }

    @GetMapping("/data/{dataHoraVenda}")
    public Venda buscar(@PathVariable LocalDateTime dataHoraVenda){
        return repositorio.buscarPorDataHora(dataHoraVenda);
    }

    @GetMapping("/produto/{nome}")
    public List<Venda> buscar(@PathVariable String nome){
        return repositorio.buscarPorProduto(nome);
    }

    @PostMapping
    public String criar(@RequestBody Venda venda){
        int retorno = repositorio.criar(venda);
        if(retorno == 1){
            return "Venda registrada com sucesso!";
        }
        else{
            return "Erro ao registrar venda.";
        }
    }

    @PutMapping("/{dataHoraVenda}")
    public String atualizar(@PathVariable LocalDateTime dataHoraVenda, @RequestBody Venda venda){
        venda.setDataHoraVenda(dataHoraVenda);
        int retorno = repositorio.atualizar(venda);
        if(retorno == 1){
            return "Venda atualizada com sucesso!";
        }
        else{
            return "Erro ao atualizar venda.";
        }
    }

    @DeleteMapping("/{dataHoraVenda}")
    public String deletar(@PathVariable LocalDateTime dataHoraVenda){
        int retorno = repositorio.deletar(dataHoraVenda);
        if(retorno == 1){
            return "Venda deletada com sucesso!";
        }
        else{
            return "Erro ao deletar venda.";
        }
    }

}