package com.premaImagem.projeto_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.premaImagem.projeto_bd.repositorios.FornecedorRepositorio;
import com.premaImagem.projeto_bd.entidades.Fornecedor;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    private final FornecedorRepositorio repositorio;

    @Autowired
    public FornecedorController(FornecedorRepositorio repositorio) {
        this.repositorio = repositorio;
    }


    @GetMapping
    public List<Fornecedor> listar() {
        return repositorio.buscarLista();
    }


    @GetMapping("/{id}")
    public Fornecedor buscarPorId(@PathVariable("id") String id) {
        return repositorio.buscar(id);
    }


    @PostMapping
    public String criar(@RequestBody Fornecedor fornecedor) {
        int retorno = repositorio.criar(fornecedor);

        if (retorno == 1) return "Fornecedor adicionado com sucesso!";
        if (retorno > 1) return "Conflito com dados no banco";
        return "Erro ao adicionar fornecedor.";
    }


    @DeleteMapping("/{id}")
    public String deletar(@PathVariable String id) {
        int retorno = repositorio.deletar(id);

        if (retorno == 1) return "Fornecedor deletado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao deletar fornecedor.";
    }


    @PutMapping("/{id}")
    public String atualizar(@PathVariable String id, @RequestBody Fornecedor fornecedor) {
        fornecedor.setId(id); // garante que o ID vem da URL
        int retorno = repositorio.atualizar(fornecedor);

        if (retorno == 1) return "Fornecedor atualizado com sucesso!";
        if (retorno > 1) return "Conflito com dados do banco";
        return "Erro ao atualizar fornecedor.";
    }
}
