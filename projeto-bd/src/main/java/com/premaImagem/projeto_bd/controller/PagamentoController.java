package com.premaImagem.projeto_bd.controller;

import com.premaImagem.projeto_bd.entidades.Pagamento;
import com.premaImagem.projeto_bd.repositorios.PagamentoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagamentos")
public class PagamentoController{

    private final PagamentoRepositorio repositorio;

    @Autowired
    public PagamentoController(PagamentoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Pagamento> listar() {
        List<Pagamento> listaDePagamento = repositorio.buscarLista();
        return listaDePagamento;
    }

    @GetMapping("/{id}")
    public List<Pagamento> buscar(@PathVariable long id) {
        List<Pagamento> pagamento = repositorio.buscarPorId(id);
        return pagamento;
    }

    @PostMapping
    public String criar(@RequestBody Pagamento pagamento) {
        int retorno = repositorio.criar(pagamento);
        if (retorno == 1) {
            return "Pagamento registrado com sucesso!";
        } else {
            return "Erro ao registrar pagamento.";
        }
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Pagamento pagamento) {
        pagamento.setId(id);
        int retorno = repositorio.atualizar(pagamento);
        if (retorno == 1) {
            return "Pagamento atualizado com sucesso!";
        } else {
            return "Erro ao atualizar pagamento.";
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id) {
        int retorno = repositorio.deletar(id);
        if (retorno == 1) {
            return "Pagamento deletado com sucesso!";
        } else {
            return "Erro ao deletar pagamento.";
        }
    }



}