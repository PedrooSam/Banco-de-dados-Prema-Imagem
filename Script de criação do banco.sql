create database PremaImagem;

create table Colaborador(
	id varchar (12) primary key,
	nome varchar(45),
	cpf varchar(11) UNIQUE
);

create table Empregado(
	dataAdmissao date, 
	funcao varchar(10),
	numeroPis varchar(11) UNIQUE,
	salario double,
	id varchar (12) PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

create table Medico(
	especialidade varchar(10),
	crm varchar(45) UNIQUE,
	id varchar (12) PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

create table Socio(
	proLabore double,
	id varchar (12) PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

CREATE TABLE Exame(
	id varchar (12) PRIMARY KEY,
	nome varchar(50),
	preparo varchar(100),
	preco double
);

CREATE TABLE Paciente(
	id varchar (12) PRIMARY KEY,
	nome varchar(45),
	cpf varchar(11) UNIQUE,
	rg varchar(8) UNIQUE,
	dataNascimento date,
	cep varchar(8),
	numeroEndereco varchar(5),
	complementoEndereco varchar(15),
	telefone1 varchar(11),
	telefone2 varchar(11),
	email varchar(50) UNIQUE,
	nomeMae varchar(45),
	pacienteIndicador varchar (12),
	FOREIGN KEY (pacienteIndicador) REFERENCES Paciente(id)
);

CREATE TABLE AgendaExame(
	dataHoraRealizacao date,
	medicoRequisitante varchar(45),
	laudo varchar(1000),
	status varchar(10),
	idPaciente varchar(12),
	idMedico  varchar(12),
	idExame varchar(12),
	PRIMARY KEY (dataHoraRealizacao, idPaciente, idMedico, idExame),
	FOREIGN key(idPaciente) REFERENCES Paciente(id),
	FOREIGN KEY(idMedico) REFERENCES Medico(id),
	FOREIGN KEY(idExame) REFERENCES Exame(id)
);

CREATE TABLE Pagamento(
	formaPagamento varchar(21),
	notaFiscal varchar(30) UNIQUE,
	valorPago double,
	parcelas int,
	id varchar(12),
	dataPagamento date,
	idAgendaExame varchar(12),
	PRIMARY KEY (id, idAgendaExame),
	FOREIGN KEY (idAgendaExame) REFERENCES AgendaExame(id)
);

CREATE TABLE Fornecedor(
	id varchar(12) primary key,
	nome varchar(45),
	cnpj varchar(14) UNIQUE,
	telefone1 varchar(11),
	telefone2 varchar(11),
	email varchar(50) UNIQUE
);

CREATE TABLE Produto(
	nome varchar (45),
	preco double,
	quantidade int,
	id varchar (12) primary key
);

CREATE TABLE Venda(
	dataHoraVenda date,
	quantidade int,
	idFornecedor varchar (12),
	idProduto varchar (12),
	idSocio varchar (12),
	PRIMARY KEY (dataHoraVenda, idFornecedor, idProduto, idSocio),
	FOREIGN KEY (idFornecedor) REFERENCES Fornecedor(id),
	FOREIGN KEY (idProduto) REFERENCES Produto(id),
	FOREIGN KEY (idSocio) REFERENCES Socio(id)
);



