create database PremaImagem

create table Colaborador(
	id varchar primary key,
	nome varchar(45),
	cpf varchar(11)
);

create table Empregado(
	data_admissao date, 
	funcao varchar(10),
	numeroPis int,
	salario double,
	empregado_id int,
	foreign key(empregado_id) references Colaborador(id)
);

create table Medico(
	especialidade varchar(10),
	crm varchar(45),
	medico_id int,
	foreign key(medico_id) references Colaborador(id)
);

create table Socio(
	proLabore int,
	socio_idColaborador int,
	foreign key(socio_idColaborador) references colaboradores(idColaborador)
);

CREATE TABLE Exame(
	id varchar PRIMARY KEY,
	nome varchar(50),
	preparo varchar(100),
	preco double
);

CREATE TABLE Paciente(
	id varchar PRIMARY KEY,
	nome varchar(45),
	cpf varchar(11),
	rg varchar(8),
	cep varchar(8),
	numeroEndereco varchar(5),
	complementoEndereco varchar(15),
	telefone1 varchar(11),
	telefone2 varchar(11),
	email varchar(45),
	nomeMae varchar(45),
	pacienteIndicador varchar
);

