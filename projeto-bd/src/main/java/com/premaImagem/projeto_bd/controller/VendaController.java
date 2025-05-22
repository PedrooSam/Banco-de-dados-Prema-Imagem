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

    @GetMapping("/data/{dataHoraVenda}/{idFornecedor}/{idProduto}/{idSocio}")
    public List<Venda> buscar(@PathVariable LocalDateTime dataHoraVenda){
        List<Venda> venda = repositorio.buscarPorDataHora(dataHoraVenda);
        return venda;
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

    @PutMapping("/{dataHoraVenda}/{idFornecedor}/{idProduto}/{idSocio}")
    public String atualizar(@PathVariable LocalDateTime dataHoraVenda, @PathVariable("idFornecedor") long idFornecedor,
                            @PathVariable("idProduto") long idProduto,
                            @PathVariable("idSocio") long idSocio, @RequestBody Venda venda){
        venda.setDataHoraVenda(dataHoraVenda);
        int retorno = repositorio.atualizar(venda);
        if(retorno == 1){
            return "Venda atualizada com sucesso!";
        }
        else{
            return "Erro ao atualizar venda.";
        }
    }

    @DeleteMapping("/{dataHoraVenda}/{idFornecedor}/{idProduto}/{idSocio}")
    public String deletar(@PathVariable LocalDateTime dataHoraVenda, @PathVariable("idFornecedor") long idFornecedor,
    @PathVariable("idProduto") long idProduto,
    @PathVariable("idSocio") long idSocio){
        int retorno = repositorio.deletar(dataHoraVenda);
        if(retorno == 1){
            return "Venda deletada com sucesso!";
        }
        else{
            return "Erro ao deletar venda.";
        }
    }

}