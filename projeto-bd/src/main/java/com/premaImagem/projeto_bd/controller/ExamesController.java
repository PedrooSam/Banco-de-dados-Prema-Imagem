package com.premaImagem.projeto_bd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premaImagem.projeto_bd.repositorios.ExameRepositorio;

@RestController 
@RequestMapping("/exames")
public class ExamesController {

	private final ExameRepositorio repositorio;

	@Autowired
	public ExamesController(ExameRepositorio repositorio) {
		this.repositorio = repositorio;
	}

	@GetMapping
	public List<Exame> listar(){

		return repositorio.buscarLista();
	}

	@getMapping
	public Exame buscarPorNome(long nome){

		return repositorio.buscar(nome);
	}

	@PostMapping
	public String criar(Exame exame){

		retorno = repositorio.criar(exame);

		if (retorno == 1){
			return "Exame adicionado com sucesso!";
		}
		else if (retorno > 1){
			return "Conflito com dados no banco";
		}
		return "Erro ao adicionar exame.";
	}

	@PostMapping
	public String deletar(long id){

		retorno = repositorio.deletar(id);

		if (retorno == 1){
			return "Exame deletado com sucesso!";
		}
		else if (retorno > 1){
			return "Conflito com dados do banco";
		}
		return "Erro ao deletar exame";
	}

	@PostMapping
	public String atualizar(Exame exame){
		
		retorno = repositorio.editar(exame);

		if (retorno == 1){
			return "Exame atualizado com sucesso!";
		}
		else if (retorno > 1){
			return "Conflito com dados do banco";
		}
		return "Erro ao atualizar exame.";
	}

}
