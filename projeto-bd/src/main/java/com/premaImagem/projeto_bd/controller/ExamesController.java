package com.premaImagem.projeto_bd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/exames")
public class ExamesController {
	@GetMapping
	public String HelloWorld() {
		return "Hello World";
	}
}
