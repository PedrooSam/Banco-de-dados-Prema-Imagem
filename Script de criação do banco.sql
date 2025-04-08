create database PremaImagem;

create table Colaborador(
	id varchar (12) primary key,
	nome varchar(45),
	cpf varchar(11)
);

create table Empregado(
	dataAdmissao date, 
	funcao varchar(10),
	numeroPis int,
	salario double,
	id varchar (12) PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

create table Medico(
	especialidade varchar(10),
	crm varchar(45),
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
	cpf varchar(11),
	rg varchar(8),
	cep varchar(8),
	numeroEndereco varchar(5),
	complementoEndereco varchar(15),
	telefone1 varchar(11),
	telefone2 varchar(11),
	email varchar(50),
	nomeMae varchar(45),
	pacienteIndicador varchar (12),
	FOREIGN KEY (pacienteIndicador) REFERENCES Paciente(id)
);

CREATE TABLE AgendaExame(
	id varchar (12) PRIMARY KEY,
	dataRealizacao date,
	medicoRequisitante varchar(45),
	laudo varchar(1000),
	status varchar(10),
	idPaciente varchar(12),
	idMedico  varchar(12),
	idExame varchar(12),
	FOREIGN key(idPaciente) REFERENCES Paciente(id),
	FOREIGN KEY(idMedico) REFERENCES Medico(id),
	FOREIGN KEY(idExame) REFERENCES Exame(id)
);

CREATE TABLE Pagamento(
	formaPagamento varchar(21),
	notaFiscal varchar(30),
	valorPago double,
	parcelas int,
	id varchar(12),
	idAgendaExame varchar(12),
	dataPagamento date,
	FOREIGN KEY (idAgenda) REFERENCES AgendaExame(id)
);

CREATE TABLE Fornecedor(
	id varchar(12),
	nome varchar(45),
	cnpj varchar(14),
	telefone1 varchar(11),
	telefone2 varchar(11),
	email varchar(50)
);

CREATE TABLE Produto(
	nome varchar (45),
	preco double,
	quantidade int,
	id varchar (12)
);

CREATE TABLE Venda(
	dataVenda date,
	idFornecedor varchar (12),
	idProduto varchar (12),
	idSocio varchar (12),
	id varchar (12) primary key,
	FOREIGN KEY (idFornecedor) REFERENCES Agenda(id),
	FOREIGN KEY (idProduto) REFERENCES Agenda(id),
	FOREIGN KEY (idSocio) REFERENCES Agenda(id)
);
