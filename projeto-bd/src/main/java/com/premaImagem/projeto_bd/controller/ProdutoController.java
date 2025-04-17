package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.premaImagem.projeto_bd.entidades.Produto;
import com.premaImagem.projeto_bd.repositorios.ProdutoRepositorio;

public class ProdutoController {

    private final ProdutoRepositorio repositorio;

    @Autowired
    public ProdutoController(ProdutoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Produto> listar() {
        return repositorio.buscarLista();
    }

    @GetMapping("/{id}")
    public Produto buscar(long id){
        return repositorio.buscarPorId(id);
    }

    @GetMapping("/{nome}")
    public Produto buscar(String nome){
        return repositorio.buscarPorNome(nome);
    }

    @PostMapping
    public String criar(@RequestBody Produto produto){
        int retorno = repositorio.criar(produto);

        if (retorno == 1) return "Produto adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";

        return "Erro ao adicionar produto.";
    }

    @DeleteMapping("/{id}")
    public String deletar(@RequestBody long id){
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Produto excluído com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";

        return "Erro ao excluir produto.";
    }

    @PutMapping("/{id}")
    public String atualizar(@RequestBody long id){
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Produto atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";

        return "Erro ao adicionar produto.";
    }
}
