package com.premaImagem.projeto_bd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@PostMapping
	public String criar
}
