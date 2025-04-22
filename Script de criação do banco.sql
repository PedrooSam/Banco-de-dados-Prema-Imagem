create database PremaImagem;

create table Colaborador(
	id BIGINT AUTO_INCREMENT primary key,
	nome varchar(45) not null,
	cpf varchar(11) unique not null
);

create table Empregado(
	dataAdmissao date not null, 
	funcao varchar(100) not null,
	numeroPis varchar(11) unique not null,
	salario double not null,
	id BIGINT PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

create table Medico(
	especialidade varchar(100) not null,
	crm varchar(8) unique not null,
	id BIGINT PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

create table Socio(
	proLabore double not null,
	id BIGINT PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

CREATE TABLE Exame(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	nome varchar(50) not null,
	preparo varchar(100) not null,
	preco double not null
);

CREATE TABLE Paciente(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	nome varchar(45) not null,
	nomeSocial varchar(45) default null,
	cpf varchar(11) unique not null,
	rg varchar(8) unique not null,
	dataNascimento date not null,
	cep varchar(8) not null,
	numeroEndereco varchar(5) not null,
	complementoEndereco varchar(15) not null,
	telefone1 varchar(11) not null,
	telefone2 varchar(11) default null,
	email varchar(50) unique not null,
	nomeMae varchar(45) not null,
	pacienteIndicador BIGINT default null,
	FOREIGN KEY (pacienteIndicador) REFERENCES Paciente(id)
);

CREATE TABLE AgendaExame(
	dataHoraRealizacao DATETIME,
	medicoRequisitante varchar(45) not null,
	laudo varchar(1000) not null,
	status varchar(10) not null,
	idPaciente BIGINT,
	idMedico  BIGINT,
	idExame BIGINT,
	PRIMARY KEY (dataHoraRealizacao, idPaciente, idMedico, idExame),
	FOREIGN key(idPaciente) REFERENCES Paciente(id),
	FOREIGN KEY(idMedico) REFERENCES Medico(id),
	FOREIGN KEY(idExame) REFERENCES Exame(id)
);

CREATE TABLE Pagamento(
	formaPagamento varchar(21) not null,
	notaFiscal varchar(30) unique not null,
	valorPago double not null,
	parcelas int not null,
	id BIGINT AUTO_INCREMENT,
	dataPagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
	agendaExameDataHora DATETIME,
	agendaExamePaciente BIGINT,
	agendaExameMedico BIGINT,
	agendaExameExame BIGINT,
	PRIMARY KEY (id, agendaExameExame,agendaExameDataHora,agendaExamePaciente, agendaExameMedico),
	FOREIGN KEY (agendaExameDataHora,agendaExamePaciente, agendaExameMedico,agendaExameExame) REFERENCES AgendaExame(dataHoraRealizacao, idPaciente, idMedico, idExame)
);

CREATE TABLE Fornecedor(
	id BIGINT AUTO_INCREMENT primary key,
	nome varchar(45) not null,
	cnpj varchar(14) unique not null,
	telefone1 varchar(11) not null,
	telefone2 varchar(11) default null,
	email varchar(50) unique not null
);

CREATE TABLE Produto(
	nome varchar (45) not null,
	preco double not null,
	quantidade int not null,
	id BIGINT AUTO_INCREMENT primary key
);

CREATE TABLE Venda(
	dataHoraVenda DATETIME DEFAULT CURRENT_TIMESTAMP,
	quantidade int not null,
	idFornecedor BIGINT,
	idProduto BIGINT,
	idSocio BIGINT,
	PRIMARY KEY (dataHoraVenda, idFornecedor, idProduto, idSocio),
	FOREIGN KEY (idFornecedor) REFERENCES Fornecedor(id),
	FOREIGN KEY (idProduto) REFERENCES Produto(id),
	FOREIGN KEY (idSocio) REFERENCES Socio(id)
);



