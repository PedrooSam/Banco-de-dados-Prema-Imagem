package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.entidades.Produto;
import com.premaImagem.projeto_bd.repositorios.ProdutoRepositorio;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepositorio repositorio;

    @Autowired
    public ProdutoController(ProdutoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        List<Produto> produtos = repositorio.buscarLista();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public List<Produto> buscarPorId(@PathVariable("id") long id){
        List<Produto> produto = repositorio.buscarPorId(id);
        return produto;
    }


    @GetMapping("/nome/{nome}")
    public List<Produto> buscarPorNome(@PathVariable("nome") String nome){
        List<Produto> produto = repositorio.buscarPorNome(nome);
        return produto;
    }

    @PostMapping
    public ResponseEntity<String> criar(@RequestBody Produto produto) {
        int retorno = repositorio.criar(produto);

        if (retorno == 1) {
            return ResponseEntity.status(201).body("Produto adicionado com sucesso!");
        } else if (retorno > 1) {
            return ResponseEntity.status(409).body("Conflito com dados no banco.");
        } else {
            return ResponseEntity.status(500).body("Erro ao adicionar produto.");
        }
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable long id){
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Produto excluído com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco.";

        return "Erro ao excluir produto.";
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable long id, @RequestBody Produto produto){
        produto.setId(id);
        int retorno = repositorio.atualizar(produto);

        if (retorno == 1) return "Produto atualizado com sucesso!";
        else return "Erro ao atualizar produto";

    }
}
