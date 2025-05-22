create database PremaImagem;

create table Colaborador(
	id BIGINT AUTO_INCREMENT primary key,
	nome varchar(45) not null,
	cpf varchar(11) unique not null
);

create table Empregado(
	dataAdmissao date not null, 
	funcao varchar(100) not null,
	numeroPis varchar(20) unique not null,
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
	status varchar(20) not null,
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

-- Inserções
-- Inserção Colaborador
INSERT INTO Colaborador (id, nome, cpf) VALUES (1, 'Gustavo Souza', '35192975196');
INSERT INTO Colaborador (id, nome, cpf) VALUES (2, 'Pedro Nascimento', '58261979254');
INSERT INTO Colaborador (id, nome, cpf) VALUES (3, 'Laura Oliveira', '70063100605');
INSERT INTO Colaborador (id, nome, cpf) VALUES (4, 'Gustavo Moraes', '29225349754');
INSERT INTO Colaborador (id, nome, cpf) VALUES (5, 'Isabela Cardoso', '68297115560');
INSERT INTO Colaborador (id, nome, cpf) VALUES (6, 'Mariana Nascimento', '33546861547');
INSERT INTO Colaborador (id, nome, cpf) VALUES (7, 'Bruna Araújo', '70045216404');
INSERT INTO Colaborador (id, nome, cpf) VALUES (8, 'Maria Moraes', '74611037304');
INSERT INTO Colaborador (id, nome, cpf) VALUES (9, 'Marcos Freitas', '22399995016');
INSERT INTO Colaborador (id, nome, cpf) VALUES (10, 'Camila Rodrigues', '86065701251');
INSERT INTO Colaborador (id, nome, cpf) VALUES (11, 'Isabela Ferreira', '88553748095');
INSERT INTO Colaborador (id, nome, cpf) VALUES (12, 'Sofia Barros', '80822874470');
INSERT INTO Colaborador (id, nome, cpf) VALUES (13, 'Sofia Cardoso', '08174503192');
INSERT INTO Colaborador (id, nome, cpf) VALUES (14, 'Marcos Ferreira', '34989449405');
INSERT INTO Colaborador (id, nome, cpf) VALUES (15, 'Camila Freitas', '97917862620');
INSERT INTO Colaborador (id, nome, cpf) VALUES (16, 'Gustavo Freitas', '68902933402');
INSERT INTO Colaborador (id, nome, cpf) VALUES (17, 'João Costa', '43467530918');
INSERT INTO Colaborador (id, nome, cpf) VALUES (18, 'Laura Moreira', '18092961168');
INSERT INTO Colaborador (id, nome, cpf) VALUES (19, 'Sofia Barros', '43927908371');
INSERT INTO Colaborador (id, nome, cpf) VALUES (20, 'Felipe Moraes', '78988603692');
INSERT INTO Colaborador (id, nome, cpf) VALUES (21, 'Bruna Cardoso', '97671098383');
INSERT INTO Colaborador (id, nome, cpf) VALUES (22, 'Marcos Lima', '32845857895');
INSERT INTO Colaborador (id, nome, cpf) VALUES (23, 'Bruna Pereira', '75968678956');
INSERT INTO Colaborador (id, nome, cpf) VALUES (24, 'Bruna Rodrigues', '41225795179');
INSERT INTO Colaborador (id, nome, cpf) VALUES (25, 'Isabela Gustavo Costa', '37772720805');
INSERT INTO Colaborador (id, nome, cpf) VALUES (26, 'Mateus Bruna Almeida', '04198529727');
INSERT INTO Colaborador (id, nome, cpf) VALUES (27, 'Lucas Moreira', '24573544138');
INSERT INTO Colaborador (id, nome, cpf) VALUES (28, 'Gabriel Sofia Ramos', '37604380699');
INSERT INTO Colaborador (id, nome, cpf) VALUES (29, 'Isabela Lima', '78148803293');
INSERT INTO Colaborador (id, nome, cpf) VALUES (30, 'Mateus Rodrigues', '51689051933');
INSERT INTO Colaborador (id, nome, cpf) VALUES (31, 'Felipe João Almeida', '27655545068');
INSERT INTO Colaborador (id, nome, cpf) VALUES (32, 'Gabriel Santos', '99577227134');
INSERT INTO Colaborador (id, nome, cpf) VALUES (33, 'Isabela Moraes', '23613587930');
INSERT INTO Colaborador (id, nome, cpf) VALUES (34, 'Gabriel Ferreira', '98877838250');
INSERT INTO Colaborador (id, nome, cpf) VALUES (35, 'Julia Ferreira', '52555633670');
INSERT INTO Colaborador (id, nome, cpf) VALUES (36, 'Isabela Moraes', '90549428350');
INSERT INTO Colaborador (id, nome, cpf) VALUES (37, 'Isabela Gabriel Ramos', '94548083958');
INSERT INTO Colaborador (id, nome, cpf) VALUES (38, 'Ana Souza', '93626879938');
INSERT INTO Colaborador (id, nome, cpf) VALUES (39, 'Gabriel Rodrigues', '21670815318');
INSERT INTO Colaborador (id, nome, cpf) VALUES (40, 'Rafael Moreira', '35250465284');
INSERT INTO Colaborador (id, nome, cpf) VALUES (41, 'Lucas Costa', '81411168398');
INSERT INTO Colaborador (id, nome, cpf) VALUES (42, 'João Silva', '52394803972');
INSERT INTO Colaborador (id, nome, cpf) VALUES (43, 'Isabela Freitas', '40044216154');
INSERT INTO Colaborador (id, nome, cpf) VALUES (44, 'Beatriz Pedro Santos', '55885779280');
INSERT INTO Colaborador (id, nome, cpf) VALUES (45, 'Pedro Castro', '98031520968');
INSERT INTO Colaborador (id, nome, cpf) VALUES (46, 'Maria Silva', '22990007213');
INSERT INTO Colaborador (id, nome, cpf) VALUES (47, 'Mateus Araújo', '12088275402');
INSERT INTO Colaborador (id, nome, cpf) VALUES (48, 'Lucas Cardoso', '14896258214');
INSERT INTO Colaborador (id, nome, cpf) VALUES (49, 'Sofia Castro', '29958043747');
INSERT INTO Colaborador (id, nome, cpf) VALUES (50, 'Pedro Silva', '63760735895');
INSERT INTO Colaborador (id, nome, cpf) VALUES (51, 'Marcos Silva', '38251436459');
INSERT INTO Colaborador (id, nome, cpf) VALUES (52, 'Bruna Oliveira', '39349721578');
INSERT INTO Colaborador (id, nome, cpf) VALUES (53, 'Lucas Oliveira', '36990732815');
INSERT INTO Colaborador (id, nome, cpf) VALUES (54, 'Gustavo Ana Campos', '89429405070');
INSERT INTO Colaborador (id, nome, cpf) VALUES (55, 'João Oliveira', '92065384298');
INSERT INTO Colaborador (id, nome, cpf) VALUES (56, 'Ana Cardoso', '70111725950');
INSERT INTO Colaborador (id, nome, cpf) VALUES (57, 'Bruna Ferreira', '48522509060');
INSERT INTO Colaborador (id, nome, cpf) VALUES (58, 'Gustavo Moreira', '47466156068');
INSERT INTO Colaborador (id, nome, cpf) VALUES (59, 'Felipe Moraes', '58545433521');
INSERT INTO Colaborador (id, nome, cpf) VALUES (60, 'Sofia Castro', '09285134733');
INSERT INTO Colaborador (id, nome, cpf) VALUES (61, 'Beatriz Ramos', '60418355082');
INSERT INTO Colaborador (id, nome, cpf) VALUES (62, 'Rafael Campos', '70491817910');
INSERT INTO Colaborador (id, nome, cpf) VALUES (63, 'Beatriz João Campos', '97528144162');
INSERT INTO Colaborador (id, nome, cpf) VALUES (64, 'Julia Lima', '06029413115');
INSERT INTO Colaborador (id, nome, cpf) VALUES (65, 'Mariana Silva', '08332167016');
INSERT INTO Colaborador (id, nome, cpf) VALUES (66, 'Lucas Ramos', '79157971094');
INSERT INTO Colaborador (id, nome, cpf) VALUES (67, 'Leonardo Moreira', '71593111204');
INSERT INTO Colaborador (id, nome, cpf) VALUES (68, 'Bruna Lima', '47066779239');
INSERT INTO Colaborador (id, nome, cpf) VALUES (69, 'Felipe Silva', '88864366509');
INSERT INTO Colaborador (id, nome, cpf) VALUES (70, 'Camila Silva', '75887051905');
INSERT INTO Colaborador (id, nome, cpf) VALUES (71, 'Marcos Almeida', '90248900942');
INSERT INTO Colaborador (id, nome, cpf) VALUES (72, 'Felipe Silva', '09436029851');
INSERT INTO Colaborador (id, nome, cpf) VALUES (73, 'Felipe Gustavo Lima', '49930129742');
INSERT INTO Colaborador (id, nome, cpf) VALUES (74, 'Ana Nascimento', '60749955553');
INSERT INTO Colaborador (id, nome, cpf) VALUES (75, 'Isabela Ramos', '22029752272');
INSERT INTO Colaborador (id, nome, cpf) VALUES (76, 'Camila Freitas', '88662055359');
INSERT INTO Colaborador (id, nome, cpf) VALUES (77, 'Maria Souza', '16265436513');
INSERT INTO Colaborador (id, nome, cpf) VALUES (78, 'Felipe Santos', '05759989951');
INSERT INTO Colaborador (id, nome, cpf) VALUES (79, 'Pedro Oliveira', '40773820959');
INSERT INTO Colaborador (id, nome, cpf) VALUES (80, 'Gustavo Oliveira', '07068221264');
INSERT INTO Colaborador (id, nome, cpf) VALUES (81, 'Julia Moraes', '95701309374');
INSERT INTO Colaborador (id, nome, cpf) VALUES (82, 'João Moreira', '22137901000');
INSERT INTO Colaborador (id, nome, cpf) VALUES (83, 'Julia Mateus Freitas', '25472699884');
INSERT INTO Colaborador (id, nome, cpf) VALUES (84, 'Bruna Lima', '58532601606');
INSERT INTO Colaborador (id, nome, cpf) VALUES (85, 'Beatriz Moraes', '49085518774');
INSERT INTO Colaborador (id, nome, cpf) VALUES (86, 'Camila Rafael Moraes', '46540661238');
INSERT INTO Colaborador (id, nome, cpf) VALUES (87, 'Beatriz João Nascimento', '68085931315');
INSERT INTO Colaborador (id, nome, cpf) VALUES (88, 'Mariana Souza', '15359210720');
INSERT INTO Colaborador (id, nome, cpf) VALUES (89, 'Beatriz Campos', '59206485969');
INSERT INTO Colaborador (id, nome, cpf) VALUES (90, 'Sofia Souza', '68920320464');
INSERT INTO Colaborador (id, nome, cpf) VALUES (91, 'Laura Moraes', '39931661213');
INSERT INTO Colaborador (id, nome, cpf) VALUES (92, 'Julia Laura Moraes', '68742522148');
INSERT INTO Colaborador (id, nome, cpf) VALUES (93, 'Gustavo Rodrigues', '57301772751');
INSERT INTO Colaborador (id, nome, cpf) VALUES (94, 'Julia Moreira', '55427545894');
INSERT INTO Colaborador (id, nome, cpf) VALUES (95, 'Lucas Cardoso', '47928003091');
INSERT INTO Colaborador (id, nome, cpf) VALUES (96, 'Ana Silva', '11904056977');
INSERT INTO Colaborador (id, nome, cpf) VALUES (97, 'Mateus Cardoso', '76728267761');
INSERT INTO Colaborador (id, nome, cpf) VALUES (98, 'Rafael Campos', '95994379512');
INSERT INTO Colaborador (id, nome, cpf) VALUES (99, 'Camila Castro', '53620385241');
INSERT INTO Colaborador (id, nome, cpf) VALUES (100, 'João Cardoso', '57122310402');
INSERT INTO Colaborador (id, nome, cpf) VALUES (101, 'Sofia Ramos', '45405525162');
INSERT INTO Colaborador (id, nome, cpf) VALUES (102, 'Camila Rodrigues', '42747559433');
INSERT INTO Colaborador (id, nome, cpf) VALUES (103, 'Marcos Santos', '87653261742');
INSERT INTO Colaborador (id, nome, cpf) VALUES (104, 'Laura Julia Ramos', '95699979805');
INSERT INTO Colaborador (id, nome, cpf) VALUES (105, 'Beatriz Lima', '13551899384');
INSERT INTO Colaborador (id, nome, cpf) VALUES (106, 'Laura Ferreira', '21265714356');
INSERT INTO Colaborador (id, nome, cpf) VALUES (107, 'Camila Moreira', '13603925932');
INSERT INTO Colaborador (id, nome, cpf) VALUES (108, 'Mateus Gustavo Souza', '67262178333');
INSERT INTO Colaborador (id, nome, cpf) VALUES (109, 'Julia Almeida', '56377881146');
INSERT INTO Colaborador (id, nome, cpf) VALUES (110, 'João Nascimento', '76182438623');
INSERT INTO Colaborador (id, nome, cpf) VALUES (111, 'Maria Barros', '32539894369');
INSERT INTO Colaborador (id, nome, cpf) VALUES (112, 'Marcos Marcos Barros', '07134669024');
INSERT INTO Colaborador (id, nome, cpf) VALUES (113, 'Isabela Almeida', '92517372113');
INSERT INTO Colaborador (id, nome, cpf) VALUES (114, 'Marcos Moreira', '18272401282');
INSERT INTO Colaborador (id, nome, cpf) VALUES (115, 'Leonardo Pedro Silva', '74503347467');
INSERT INTO Colaborador (id, nome, cpf) VALUES (116, 'Gabriel Gustavo Moraes', '66201928550');
INSERT INTO Colaborador (id, nome, cpf) VALUES (117, 'Pedro Ramos', '11864395905');
INSERT INTO Colaborador (id, nome, cpf) VALUES (118, 'Laura Castro', '43344742867');
INSERT INTO Colaborador (id, nome, cpf) VALUES (119, 'João Castro', '55231793277');
INSERT INTO Colaborador (id, nome, cpf) VALUES (120, 'Laura Santos', '46858739149');
INSERT INTO Colaborador (id, nome, cpf) VALUES (121, 'Gustavo Ferreira', '46345008068');
INSERT INTO Colaborador (id, nome, cpf) VALUES (122, 'Bruna Silva', '02946773790');
INSERT INTO Colaborador (id, nome, cpf) VALUES (123, 'Ana Campos', '81649607884');
INSERT INTO Colaborador (id, nome, cpf) VALUES (124, 'Felipe Pereira', '15312100410');
INSERT INTO Colaborador (id, nome, cpf) VALUES (125, 'Mateus Cardoso', '03736710886');
INSERT INTO Colaborador (id, nome, cpf) VALUES (126, 'Beatriz Beatriz Campos', '27942784248');
INSERT INTO Colaborador (id, nome, cpf) VALUES (127, 'Camila Leonardo Castro', '86397124593');
INSERT INTO Colaborador (id, nome, cpf) VALUES (128, 'Marcos Moreira', '12059983335');
INSERT INTO Colaborador (id, nome, cpf) VALUES (129, 'Isabela Araújo', '27377391677');
INSERT INTO Colaborador (id, nome, cpf) VALUES (130, 'Marcos Almeida', '80703550244');
INSERT INTO Colaborador (id, nome, cpf) VALUES (131, 'Mariana Ferreira', '12531568779');
INSERT INTO Colaborador (id, nome, cpf) VALUES (132, 'Ana Santos', '83027417926');
INSERT INTO Colaborador (id, nome, cpf) VALUES (133, 'Beatriz Sofia Ramos', '98211589177');
INSERT INTO Colaborador (id, nome, cpf) VALUES (134, 'João Laura Lima', '90464403784');
INSERT INTO Colaborador (id, nome, cpf) VALUES (135, 'Mateus Almeida', '74662765591');
INSERT INTO Colaborador (id, nome, cpf) VALUES (136, 'Maria Maria Ramos', '05800212717');
INSERT INTO Colaborador (id, nome, cpf) VALUES (137, 'Gabriel Rodrigues', '78911993738');
INSERT INTO Colaborador (id, nome, cpf) VALUES (138, 'Rafael Castro', '81734888580');
INSERT INTO Colaborador (id, nome, cpf) VALUES (139, 'Isabela Cardoso', '94480684922');
INSERT INTO Colaborador (id, nome, cpf) VALUES (140, 'Felipe Ferreira', '27752507310');
INSERT INTO Colaborador (id, nome, cpf) VALUES (141, 'Julia Pereira', '49719288418');
INSERT INTO Colaborador (id, nome, cpf) VALUES (142, 'Gabriel Silva', '21536607607');
INSERT INTO Colaborador (id, nome, cpf) VALUES (143, 'João Freitas', '80904381355');
INSERT INTO Colaborador (id, nome, cpf) VALUES (144, 'Pedro Costa', '17333155928');
INSERT INTO Colaborador (id, nome, cpf) VALUES (145, 'Mariana Almeida', '91189926722');
INSERT INTO Colaborador (id, nome, cpf) VALUES (146, 'Camila Mateus Oliveira', '85985974810');
INSERT INTO Colaborador (id, nome, cpf) VALUES (147, 'Laura Lucas Barros', '38088298063');
INSERT INTO Colaborador (id, nome, cpf) VALUES (148, 'Mateus Silva', '51609538041');
INSERT INTO Colaborador (id, nome, cpf) VALUES (149, 'Lucas Lima', '45720693612');
INSERT INTO Colaborador (id, nome, cpf) VALUES (150, 'Beatriz Lima', '76982130892');
INSERT INTO Colaborador (id, nome, cpf) VALUES (151, 'Bruna Freitas', '26302460298');
INSERT INTO Colaborador (id, nome, cpf) VALUES (152, 'Marcos Silva', '81889622309');
INSERT INTO Colaborador (id, nome, cpf) VALUES (153, 'Ana Campos', '86497229699');
INSERT INTO Colaborador (id, nome, cpf) VALUES (154, 'Sofia Barros', '14623120900');
INSERT INTO Colaborador (id, nome, cpf) VALUES (155, 'Rafael Oliveira', '14153840876');
INSERT INTO Colaborador (id, nome, cpf) VALUES (156, 'Isabela Costa', '23992824669');
INSERT INTO Colaborador (id, nome, cpf) VALUES (157, 'Leonardo Rafael Castro', '97513245375');
INSERT INTO Colaborador (id, nome, cpf) VALUES (158, 'Felipe Oliveira', '46649092878');
INSERT INTO Colaborador (id, nome, cpf) VALUES (159, 'Gabriel Ferreira', '47296808152');
INSERT INTO Colaborador (id, nome, cpf) VALUES (160, 'Lucas Costa', '68131695032');
INSERT INTO Colaborador (id, nome, cpf) VALUES (161, 'Laura Santos', '64775143939');
INSERT INTO Colaborador (id, nome, cpf) VALUES (162, 'Camila Santos', '08326142626');
INSERT INTO Colaborador (id, nome, cpf) VALUES (163, 'Camila Silva', '04507778996');
INSERT INTO Colaborador (id, nome, cpf) VALUES (164, 'Ana Lima', '18835243629');
INSERT INTO Colaborador (id, nome, cpf) VALUES (165, 'Isabela Laura Ferreira', '75825690083');
INSERT INTO Colaborador (id, nome, cpf) VALUES (166, 'Bruna Mateus Oliveira', '62890112969');
INSERT INTO Colaborador (id, nome, cpf) VALUES (167, 'Leonardo Souza', '74389994795');
INSERT INTO Colaborador (id, nome, cpf) VALUES (168, 'Laura Barros', '67416427430');
INSERT INTO Colaborador (id, nome, cpf) VALUES (169, 'Gabriel Castro', '19685936837');
INSERT INTO Colaborador (id, nome, cpf) VALUES (170, 'Beatriz Almeida', '25098365437');
INSERT INTO Colaborador (id, nome, cpf) VALUES (171, 'Felipe Ana Moreira', '40423506701');
INSERT INTO Colaborador (id, nome, cpf) VALUES (172, 'Rafael Barros', '07635737828');
INSERT INTO Colaborador (id, nome, cpf) VALUES (173, 'Lucas Oliveira', '53733105327');
INSERT INTO Colaborador (id, nome, cpf) VALUES (174, 'Gabriel Cardoso', '13837480472');
INSERT INTO Colaborador (id, nome, cpf) VALUES (175, 'Rafael Moreira', '48591336953');
INSERT INTO Colaborador (id, nome, cpf) VALUES (176, 'Rafael Gustavo Oliveira', '57990659436');
INSERT INTO Colaborador (id, nome, cpf) VALUES (177, 'Felipe Nascimento', '82188936058');
INSERT INTO Colaborador (id, nome, cpf) VALUES (178, 'Rafael Nascimento', '52813419378');
INSERT INTO Colaborador (id, nome, cpf) VALUES (179, 'João Camila Ramos', '22795563297');
INSERT INTO Colaborador (id, nome, cpf) VALUES (180, 'Beatriz Souza', '67763412966');
INSERT INTO Colaborador (id, nome, cpf) VALUES (181, 'Bruna Souza', '86245684903');
INSERT INTO Colaborador (id, nome, cpf) VALUES (182, 'Felipe Rodrigues', '58718785966');
INSERT INTO Colaborador (id, nome, cpf) VALUES (183, 'Mariana Costa', '69503333342');
INSERT INTO Colaborador (id, nome, cpf) VALUES (184, 'Camila Santos', '19301026907');
INSERT INTO Colaborador (id, nome, cpf) VALUES (185, 'Marcos Castro', '39780028374');
INSERT INTO Colaborador (id, nome, cpf) VALUES (186, 'Camila Nascimento', '67173067922');
INSERT INTO Colaborador (id, nome, cpf) VALUES (187, 'Sofia Nascimento', '10872040264');
INSERT INTO Colaborador (id, nome, cpf) VALUES (188, 'Camila Marcos Souza', '61313310995');
INSERT INTO Colaborador (id, nome, cpf) VALUES (189, 'Pedro Cardoso', '27764413520');
INSERT INTO Colaborador (id, nome, cpf) VALUES (190, 'Lucas Souza', '45356136099');
INSERT INTO Colaborador (id, nome, cpf) VALUES (191, 'Julia Pedro Cardoso', '26526704584');
INSERT INTO Colaborador (id, nome, cpf) VALUES (192, 'Leonardo Felipe Ramos', '03272487957');
INSERT INTO Colaborador (id, nome, cpf) VALUES (193, 'Beatriz Lima', '72423857058');
INSERT INTO Colaborador (id, nome, cpf) VALUES (194, 'Rafael Barros', '82001312156');
INSERT INTO Colaborador (id, nome, cpf) VALUES (195, 'Lucas Moraes', '55565620366');
INSERT INTO Colaborador (id, nome, cpf) VALUES (196, 'Maria Pereira', '53801209179');
INSERT INTO Colaborador (id, nome, cpf) VALUES (197, 'Maria Costa', '49286590115');
INSERT INTO Colaborador (id, nome, cpf) VALUES (198, 'Mariana Moreira', '15581642990');
INSERT INTO Colaborador (id, nome, cpf) VALUES (199, 'Maria Araújo', '01317315364');
INSERT INTO Colaborador (id, nome, cpf) VALUES (200, 'Beatriz Lucas Moraes', '80812158536');
INSERT INTO Colaborador (id, nome, cpf) VALUES (201, 'Marcos Almeida', '64579181462');
INSERT INTO Colaborador (id, nome, cpf) VALUES (202, 'Julia Leonardo Souza', '16063070864');
INSERT INTO Colaborador (id, nome, cpf) VALUES (203, 'Mateus Leonardo Cardoso', '11063440155');
INSERT INTO Colaborador (id, nome, cpf) VALUES (204, 'Julia Cardoso', '89460722328');
INSERT INTO Colaborador (id, nome, cpf) VALUES (205, 'Leonardo Ferreira', '86401643925');
INSERT INTO Colaborador (id, nome, cpf) VALUES (206, 'Pedro Costa', '24814955324');
INSERT INTO Colaborador (id, nome, cpf) VALUES (207, 'Camila Bruna Cardoso', '27280273311');
INSERT INTO Colaborador (id, nome, cpf) VALUES (208, 'Camila Sofia Costa', '79483073287');
INSERT INTO Colaborador (id, nome, cpf) VALUES (209, 'Sofia Laura Ramos', '61038326840');
INSERT INTO Colaborador (id, nome, cpf) VALUES (210, 'Mateus Pereira', '50457764356');
INSERT INTO Colaborador (id, nome, cpf) VALUES (211, 'Leonardo Barros', '20544198960');
INSERT INTO Colaborador (id, nome, cpf) VALUES (212, 'Camila Maria Castro', '37047705338');
INSERT INTO Colaborador (id, nome, cpf) VALUES (213, 'Julia Castro', '57636820047');
INSERT INTO Colaborador (id, nome, cpf) VALUES (214, 'Gabriel Moreira', '46970654548');
INSERT INTO Colaborador (id, nome, cpf) VALUES (215, 'Leonardo Rodrigues', '41768576608');
INSERT INTO Colaborador (id, nome, cpf) VALUES (216, 'Isabela Barros', '12578058755');
INSERT INTO Colaborador (id, nome, cpf) VALUES (217, 'Pedro Araújo', '95253829699');
INSERT INTO Colaborador (id, nome, cpf) VALUES (218, 'Gabriel Camila Rodrigues', '09442600657');
INSERT INTO Colaborador (id, nome, cpf) VALUES (219, 'Pedro Pereira', '00909213497');
INSERT INTO Colaborador (id, nome, cpf) VALUES (220, 'Gabriel Moreira', '80075852708');
INSERT INTO Colaborador (id, nome, cpf) VALUES (221, 'Julia Gustavo Castro', '37629111568');
INSERT INTO Colaborador (id, nome, cpf) VALUES (222, 'Isabela Almeida', '28819776676');
INSERT INTO Colaborador (id, nome, cpf) VALUES (223, 'Ana Cardoso', '48742996702');
INSERT INTO Colaborador (id, nome, cpf) VALUES (224, 'Laura Pereira', '84853024008');
INSERT INTO Colaborador (id, nome, cpf) VALUES (225, 'Marcos Nascimento', '36971441064');
INSERT INTO Colaborador (id, nome, cpf) VALUES (226, 'Ana Campos', '70395645202');
INSERT INTO Colaborador (id, nome, cpf) VALUES (227, 'Maria Araújo', '80731807506');
INSERT INTO Colaborador (id, nome, cpf) VALUES (228, 'Bruna Cardoso', '32395599412');
INSERT INTO Colaborador (id, nome, cpf) VALUES (229, 'Laura Freitas', '91719264777');
INSERT INTO Colaborador (id, nome, cpf) VALUES (230, 'Rafael Moraes', '58223124641');
INSERT INTO Colaborador (id, nome, cpf) VALUES (231, 'Gabriel Pereira', '32186568383');
INSERT INTO Colaborador (id, nome, cpf) VALUES (232, 'Pedro Felipe Nascimento', '72281730371');
INSERT INTO Colaborador (id, nome, cpf) VALUES (233, 'Ana Araújo', '61485260651');
INSERT INTO Colaborador (id, nome, cpf) VALUES (234, 'Beatriz Castro', '10464103265');
INSERT INTO Colaborador (id, nome, cpf) VALUES (235, 'Leonardo Beatriz Araújo', '87722315323');
INSERT INTO Colaborador (id, nome, cpf) VALUES (236, 'João Moraes', '59729593443');
INSERT INTO Colaborador (id, nome, cpf) VALUES (237, 'Gabriel Barros', '21529210172');
INSERT INTO Colaborador (id, nome, cpf) VALUES (238, 'Sofia Cardoso', '27278674449');
INSERT INTO Colaborador (id, nome, cpf) VALUES (239, 'Lucas Rodrigues', '38184177101');
INSERT INTO Colaborador (id, nome, cpf) VALUES (240, 'Maria Ana Barros', '24242114701');
INSERT INTO Colaborador (id, nome, cpf) VALUES (241, 'Mariana Rodrigues', '99489724740');
INSERT INTO Colaborador (id, nome, cpf) VALUES (242, 'Pedro Beatriz Pereira', '56618186547');
INSERT INTO Colaborador (id, nome, cpf) VALUES (243, 'Julia Pereira', '49662791052');
INSERT INTO Colaborador (id, nome, cpf) VALUES (244, 'Lucas Nascimento', '26999102025');
INSERT INTO Colaborador (id, nome, cpf) VALUES (245, 'Maria Bruna Campos', '05718138163');
INSERT INTO Colaborador (id, nome, cpf) VALUES (246, 'Mateus Silva', '06505260008');
INSERT INTO Colaborador (id, nome, cpf) VALUES (247, 'Beatriz Cardoso', '92162101199');
INSERT INTO Colaborador (id, nome, cpf) VALUES (248, 'Beatriz Barros', '09000442419');
INSERT INTO Colaborador (id, nome, cpf) VALUES (249, 'Felipe Rodrigues', '72568702471');
INSERT INTO Colaborador (id, nome, cpf) VALUES (250, 'Isabela Ramos', '48871843772');
INSERT INTO Colaborador (id, nome, cpf) VALUES (251, 'Felipe Ramos', '96847023601');
INSERT INTO Colaborador (id, nome, cpf) VALUES (252, 'Julia Moreira', '88569032096');
INSERT INTO Colaborador (id, nome, cpf) VALUES (253, 'Gustavo Pereira', '25659275521');
INSERT INTO Colaborador (id, nome, cpf) VALUES (254, 'Mateus Nascimento', '97735966636');
INSERT INTO Colaborador (id, nome, cpf) VALUES (255, 'Laura Rodrigues', '36363513944');
INSERT INTO Colaborador (id, nome, cpf) VALUES (256, 'Lucas Araújo', '13279413439');
INSERT INTO Colaborador (id, nome, cpf) VALUES (257, 'Mariana Silva', '16677154860');
INSERT INTO Colaborador (id, nome, cpf) VALUES (258, 'Leonardo Almeida', '33497041122');
INSERT INTO Colaborador (id, nome, cpf) VALUES (259, 'Sofia Santos', '27765412491');
INSERT INTO Colaborador (id, nome, cpf) VALUES (260, 'Isabela Cardoso', '32673282153');
INSERT INTO Colaborador (id, nome, cpf) VALUES (261, 'Bruna Nascimento', '24996592768');
INSERT INTO Colaborador (id, nome, cpf) VALUES (262, 'Lucas Moraes', '86591164454');
INSERT INTO Colaborador (id, nome, cpf) VALUES (263, 'Isabela Julia Oliveira', '68993548564');
INSERT INTO Colaborador (id, nome, cpf) VALUES (264, 'Maria Rafael Ferreira', '19562578316');
INSERT INTO Colaborador (id, nome, cpf) VALUES (265, 'Gabriel Bruna Cardoso', '24521211137');
INSERT INTO Colaborador (id, nome, cpf) VALUES (266, 'Mateus Lima', '97828952955');
INSERT INTO Colaborador (id, nome, cpf) VALUES (267, 'Julia Marcos Cardoso', '11324270029');
INSERT INTO Colaborador (id, nome, cpf) VALUES (268, 'Rafael Costa', '62170017144');
INSERT INTO Colaborador (id, nome, cpf) VALUES (269, 'Mateus Souza', '90135847473');
INSERT INTO Colaborador (id, nome, cpf) VALUES (270, 'Gabriel Souza', '15654072930');
INSERT INTO Colaborador (id, nome, cpf) VALUES (271, 'Julia Felipe Moraes', '49523055488');
INSERT INTO Colaborador (id, nome, cpf) VALUES (272, 'Ana Maria Campos', '45781701224');
INSERT INTO Colaborador (id, nome, cpf) VALUES (273, 'Leonardo Pereira', '14142077197');
INSERT INTO Colaborador (id, nome, cpf) VALUES (274, 'Leonardo Mateus Lima', '08895850973');
INSERT INTO Colaborador (id, nome, cpf) VALUES (275, 'Gabriel Ana Campos', '27950943255');
INSERT INTO Colaborador (id, nome, cpf) VALUES (276, 'Laura Silva', '24568498883');
INSERT INTO Colaborador (id, nome, cpf) VALUES (277, 'Gabriel Rafael Costa', '43509394748');
INSERT INTO Colaborador (id, nome, cpf) VALUES (278, 'Lucas Costa', '25050552219');
INSERT INTO Colaborador (id, nome, cpf) VALUES (279, 'Bruna Oliveira', '05433132311');
INSERT INTO Colaborador (id, nome, cpf) VALUES (280, 'Pedro Moraes', '27721338663');
INSERT INTO Colaborador (id, nome, cpf) VALUES (281, 'Pedro Araújo', '14251057322');
INSERT INTO Colaborador (id, nome, cpf) VALUES (282, 'Bruna Ramos', '36347380819');
INSERT INTO Colaborador (id, nome, cpf) VALUES (283, 'Maria Nascimento', '36753222066');
INSERT INTO Colaborador (id, nome, cpf) VALUES (284, 'Pedro Moreira', '44293253823');
INSERT INTO Colaborador (id, nome, cpf) VALUES (285, 'Felipe Costa', '56673890897');
INSERT INTO Colaborador (id, nome, cpf) VALUES (286, 'Maria Silva', '89774909133');
INSERT INTO Colaborador (id, nome, cpf) VALUES (287, 'Mateus Rodrigues', '16143953173');
INSERT INTO Colaborador (id, nome, cpf) VALUES (288, 'João Nascimento', '88647587479');
INSERT INTO Colaborador (id, nome, cpf) VALUES (289, 'Rafael Castro', '13844140157');
INSERT INTO Colaborador (id, nome, cpf) VALUES (290, 'Laura Ferreira', '45731599814');
INSERT INTO Colaborador (id, nome, cpf) VALUES (291, 'Maria Santos', '52754037885');
INSERT INTO Colaborador (id, nome, cpf) VALUES (292, 'Rafael Moraes', '12842363505');
INSERT INTO Colaborador (id, nome, cpf) VALUES (293, 'Isabela Lima', '90838096314');
INSERT INTO Colaborador (id, nome, cpf) VALUES (294, 'Laura Barros', '15345307416');
INSERT INTO Colaborador (id, nome, cpf) VALUES (295, 'Mariana Costa', '67863979800');
INSERT INTO Colaborador (id, nome, cpf) VALUES (296, 'Maria Campos', '15042583337');
INSERT INTO Colaborador (id, nome, cpf) VALUES (297, 'Laura Moreira', '97357493568');
INSERT INTO Colaborador (id, nome, cpf) VALUES (298, 'Marcos Castro', '86904315792');
INSERT INTO Colaborador (id, nome, cpf) VALUES (299, 'Sofia Barros', '81163859198');
INSERT INTO Colaborador (id, nome, cpf) VALUES (300, 'Lucas Almeida', '40543123782');

-- Inserção Empregado
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2000-12-24', 'Maquinista', '895791452243351', 7327.36, 1);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-02-15', 'Tecnólogo em produção de bebidas', '129742893827343', 5240.68, 2);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2019-11-09', 'Médico', '481278255006914', 8013.5, 3);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2024-04-13', 'Alfaiate', '489068160915430', 7180.49, 4);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2007-08-25', 'Mecanógrafo', '009390287947038', 7869.43, 5);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2009-04-24', 'Analista de sistemas', '119458551630303', 1720.66, 6);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-01-14', 'Cantor', '415674977002956', 3289.16, 7);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2016-09-24', 'Assistente administrativo', '507338082569761', 6057.42, 8);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2005-04-07', 'Técnico de laboratório', '102478385387235', 8575.06, 9);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2016-06-05', 'Engenheiro civil', '790276687010071', 6743.18, 10);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2013-07-04', 'Odontologista', '701994833490113', 3975.36, 11);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-08-18', 'Odontologista', '438596314895037', 3220.82, 12);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2009-07-26', 'Jornalista', '523863897580410', 3391.25, 13);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-12-04', 'Técnico em óptica', '744281722175826', 7723.76, 14);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2007-09-27', 'Engenheiro civil', '817458356226577', 3430.96, 15);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2010-06-28', 'Mecanógrafo', '576952300155406', 2098.75, 16);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2000-03-23', 'Jornalista', '126516367618415', 5565.24, 17);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2005-12-10', 'Tecnólogo em produção de bebidas', '754823464341016', 5374.7, 18);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-03-21', 'Odontologista', '591183313130572', 3524.44, 19);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2002-10-25', 'Enólogo', '357237787690842', 8007.88, 20);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2009-02-12', 'Engenheiro civil', '615053321272715', 9616.97, 21);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2023-12-28', 'Professor', '396580985529056', 9274.33, 22);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2007-04-07', 'Odontologista', '506567504586296', 5059.61, 23);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-05-14', 'Assistente administrativo', '202922472139137', 3092.65, 24);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2005-11-16', 'Cantor', '343012825874185', 9306.26, 25);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2007-11-16', 'Maquinista', '449850422251520', 6746.0, 26);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2020-01-05', 'Mecanógrafo', '935341985029481', 5660.29, 27);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-08-22', 'Cantor', '651112612361586', 8999.72, 28);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2023-07-10', 'Alfaiate', '536938967301025', 7759.41, 29);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2008-06-21', 'Enólogo', '996429911776550', 9066.27, 30);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-11-26', 'Assistente administrativo', '359363825349009', 2358.9, 31);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2009-05-28', 'Jornalista', '113926422443040', 1716.57, 32);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2015-03-18', 'Recepcionista', '692420275532201', 9721.27, 33);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2019-05-12', 'Médico', '815521148231060', 4954.01, 34);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2017-01-01', 'Enólogo', '326546737287050', 5721.35, 35);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-10-22', 'Psicólogo', '572962542867656', 7024.36, 36);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2005-05-28', 'Tecnólogo em produção de bebidas', '355441669528256', 9399.09, 37);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2011-03-28', 'Assistente administrativo', '935835232216507', 2150.18, 38);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2013-11-15', 'Maquinista', '796439999137531', 2743.04, 39);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2002-02-13', 'Maquinista', '226841913130556', 1726.09, 40);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2006-07-22', 'Cantor', '983407355261032', 9979.01, 41);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2004-04-25', 'Técnico de laboratório', '507808348286466', 8317.64, 42);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-05-06', 'Psicólogo', '337811478510960', 6219.32, 43);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-03-09', 'Médico', '788936683835896', 9285.02, 44);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2003-04-16', 'Engenheiro civil', '087562048657307', 6413.87, 45);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2006-02-25', 'Psicólogo', '850260241577560', 3730.82, 46);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-12-24', 'Analista de sistemas', '181082492139444', 4819.87, 47);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2023-11-05', 'Eletricista', '034995905501808', 7945.93, 48);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2012-03-09', 'Maquinista', '878921973041391', 5717.82, 49);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2023-08-01', 'Técnico em óptica', '195936062631488', 3728.75, 50);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2011-04-22', 'Ginecologista', '197755571716292', 7418.2, 51);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2011-02-02', 'Técnico em óptica', '763322157696560', 8232.82, 52);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2012-06-16', 'Ginecologista', '976127114258711', 6787.36, 53);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2006-07-01', 'Psicólogo', '841461187051594', 7420.76, 54);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2001-10-08', 'Odontologista', '701720962247523', 3840.2, 55);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2008-06-08', 'Médico', '776733567150234', 7897.47, 56);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2020-06-05', 'Médico', '653707849353080', 5591.98, 57);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2016-03-15', 'Tecnólogo em produção de bebidas', '291877267432991', 5701.78, 58);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2005-10-08', 'Cantor', '193950863638889', 5438.24, 59);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2008-03-15', 'Tecnólogo em produção de bebidas', '135251235891133', 7299.41, 60);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2024-11-18', 'Mecanógrafo', '646852899625916', 2325.3, 61);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2009-09-18', 'Jornalista', '325567645659703', 6902.35, 62);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2011-09-10', 'Alfaiate', '817970612914767', 7591.12, 63);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2006-01-11', 'Ginecologista', '479434965084479', 4251.62, 64);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-08-01', 'Ginecologista', '145599350579181', 7889.23, 65);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2004-04-19', 'Alfaiate', '962286769611270', 1755.36, 66);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2001-10-24', 'Ginecologista', '872700546521853', 4105.87, 67);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2006-10-02', 'Tecnólogo em produção de bebidas', '569271462062665', 8559.79, 68);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2000-12-24', 'Mecanógrafo', '602242183641539', 6471.72, 69);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2000-07-13', 'Engenheiro civil', '212321230937878', 7572.61, 70);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-06-14', 'Técnico em óptica', '695588609921899', 8203.6, 71);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2013-12-04', 'Engenheiro físico', '596725971135256', 5435.81, 72);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2014-12-07', 'Assistente administrativo', '730507927106742', 3556.28, 73);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2015-02-11', 'Analista de sistemas', '651040416006450', 9545.09, 74);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2024-05-25', 'Médico', '106758522718124', 9146.02, 75);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2006-02-22', 'Tecnólogo em produção de bebidas', '870478653935275', 3124.63, 76);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-10-21', 'Analista de sistemas', '926660323252841', 3848.5, 77);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2019-09-26', 'Jornalista', '781908607402054', 4208.33, 78);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2004-12-08', 'Alfaiate', '523349500944520', 6556.68, 79);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2019-01-21', 'Alfaiate', '793426815423425', 3486.32, 80);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-09-16', 'Médico', '847127972188851', 6469.16, 81);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2001-01-10', 'Técnico de laboratório', '932575249652775', 8954.74, 82);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2003-02-13', 'Alfaiate', '506302086407610', 3079.31, 83);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2008-03-25', 'Recepcionista', '718928339463251', 2387.91, 84);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2002-12-12', 'Psicólogo', '409289087062201', 4022.85, 85);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2002-06-21', 'Enólogo', '366266562431824', 1906.99, 86);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2009-08-24', 'Eletricista', '728122776396976', 3990.03, 87);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-05-05', 'Médico', '927367063087971', 5795.42, 88);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2020-05-25', 'Analista de sistemas', '030099718821571', 3758.96, 89);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2002-08-19', 'Eletricista', '385364621079918', 3535.52, 90);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2008-05-27', 'Assistente administrativo', '281976439152066', 4341.89, 91);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2010-06-24', 'Técnico de laboratório', '594983487826405', 2433.87, 92);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-01-14', 'Técnico de laboratório', '200779020866333', 8814.49, 93);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2015-04-12', 'Analista de sistemas', '935033980379425', 8789.93, 94);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2008-07-24', 'Tecnólogo em produção de bebidas', '430116517651138', 4836.78, 95);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2001-11-05', 'Assistente administrativo', '127939887361463', 8942.7, 96);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2010-10-07', 'Recepcionista', '831128212882831', 5292.73, 97);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2016-02-13', 'Médico', '183236183163387', 3618.22, 98);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2010-12-19', 'Analista de sistemas', '749176184848554', 4519.5, 99);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2007-03-14', 'Eletricista', '873619713704894', 9788.65, 100);

-- Inserção Medico
INSERT INTO Medico (especialidade, crm, id) VALUES ('Neurologista', '89304237', 101);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Neurologista', '56296357', 102);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oftalmologista', '31147219', 103);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ortopedista', '64398239', 104);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Infectologista', '07109485', 105);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oncologista', '05103604', 106);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cirurgião', '68249761', 107);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Endocrinologista', '58948513', 108);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Neurologista', '79311829', 109);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Neurologista', '65498680', 110);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ginecologista', '51067568', 111);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Urologista', '03597821', 112);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Urologista', '84273732', 113);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '67978847', 114);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '44690608', 115);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Urologista', '47589276', 116);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cirurgião', '24763210', 117);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Radiologista', '14182778', 118);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Radiologista', '23401451', 119);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Anestesista', '39813960', 120);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Gastroenterologista', '46784202', 121);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ortopedista', '66996315', 122);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oncologista', '84577430', 123);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Hematologista', '63450178', 124);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '70878938', 125);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Endocrinologista', '09200854', 126);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cirurgião', '79454942', 127);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oftalmologista', '66025304', 128);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Pneumologista', '24302875', 129);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oncologista', '80367171', 130);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ortopedista', '88551691', 131);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cirurgião', '72863899', 132);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Reumatologista', '86678174', 133);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ortopedista', '07922592', 134);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Radiologista', '72014034', 135);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ginecologista', '89491791', 136);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oftalmologista', '10345184', 137);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '87211481', 138);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Gastroenterologista', '78258967', 139);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '12618620', 140);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Hematologista', '23941655', 141);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Oftalmologista', '32708386', 142);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Pneumologista', '22762435', 143);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ortopedista', '17081990', 144);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Hematologista', '93442350', 145);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '37037791', 146);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cardiologista', '25560481', 147);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Hematologista', '73193321', 148);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ginecologista', '01156070', 149);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Urologista', '78665381', 150);

-- Inserção Socio
INSERT INTO Socio (proLabore, id) VALUES (6179.52, 151.0);
INSERT INTO Socio (proLabore, id) VALUES (8572.15, 152.0);
INSERT INTO Socio (proLabore, id) VALUES (8890.56, 153.0);
INSERT INTO Socio (proLabore, id) VALUES (2854.37, 154.0);
INSERT INTO Socio (proLabore, id) VALUES (7028.9, 155.0);
INSERT INTO Socio (proLabore, id) VALUES (8051.01, 156.0);
INSERT INTO Socio (proLabore, id) VALUES (6436.98, 157.0);
INSERT INTO Socio (proLabore, id) VALUES (6519.48, 158.0);
INSERT INTO Socio (proLabore, id) VALUES (8244.53, 159.0);
INSERT INTO Socio (proLabore, id) VALUES (7457.1, 160.0);
INSERT INTO Socio (proLabore, id) VALUES (3300.42, 161.0);
INSERT INTO Socio (proLabore, id) VALUES (4158.74, 162.0);
INSERT INTO Socio (proLabore, id) VALUES (6085.35, 163.0);
INSERT INTO Socio (proLabore, id) VALUES (9964.99, 164.0);
INSERT INTO Socio (proLabore, id) VALUES (7294.33, 165.0);
INSERT INTO Socio (proLabore, id) VALUES (5061.27, 166.0);
INSERT INTO Socio (proLabore, id) VALUES (3730.35, 167.0);
INSERT INTO Socio (proLabore, id) VALUES (2247.35, 168.0);
INSERT INTO Socio (proLabore, id) VALUES (7757.44, 169.0);
INSERT INTO Socio (proLabore, id) VALUES (2604.32, 170.0);
INSERT INTO Socio (proLabore, id) VALUES (7424.87, 171.0);
INSERT INTO Socio (proLabore, id) VALUES (2188.78, 172.0);
INSERT INTO Socio (proLabore, id) VALUES (4986.43, 173.0);
INSERT INTO Socio (proLabore, id) VALUES (6781.4, 174.0);
INSERT INTO Socio (proLabore, id) VALUES (8299.82, 175.0);
INSERT INTO Socio (proLabore, id) VALUES (6069.62, 176.0);
INSERT INTO Socio (proLabore, id) VALUES (5795.4, 177.0);
INSERT INTO Socio (proLabore, id) VALUES (7982.66, 178.0);
INSERT INTO Socio (proLabore, id) VALUES (7779.42, 179.0);
INSERT INTO Socio (proLabore, id) VALUES (1921.85, 180.0);
INSERT INTO Socio (proLabore, id) VALUES (4035.23, 181.0);
INSERT INTO Socio (proLabore, id) VALUES (3578.92, 182.0);
INSERT INTO Socio (proLabore, id) VALUES (3326.41, 183.0);
INSERT INTO Socio (proLabore, id) VALUES (3120.93, 184.0);
INSERT INTO Socio (proLabore, id) VALUES (2999.69, 185.0);
INSERT INTO Socio (proLabore, id) VALUES (8976.45, 186.0);
INSERT INTO Socio (proLabore, id) VALUES (7098.96, 187.0);
INSERT INTO Socio (proLabore, id) VALUES (3707.63, 188.0);
INSERT INTO Socio (proLabore, id) VALUES (7459.99, 189.0);
INSERT INTO Socio (proLabore, id) VALUES (6615.91, 190.0);
INSERT INTO Socio (proLabore, id) VALUES (7721.17, 191.0);
INSERT INTO Socio (proLabore, id) VALUES (1995.78, 192.0);
INSERT INTO Socio (proLabore, id) VALUES (6993.45, 193.0);
INSERT INTO Socio (proLabore, id) VALUES (6276.99, 194.0);
INSERT INTO Socio (proLabore, id) VALUES (5580.0, 195.0);
INSERT INTO Socio (proLabore, id) VALUES (8826.53, 196.0);
INSERT INTO Socio (proLabore, id) VALUES (8914.67, 197.0);
INSERT INTO Socio (proLabore, id) VALUES (3498.24, 198.0);
INSERT INTO Socio (proLabore, id) VALUES (1574.02, 199.0);
INSERT INTO Socio (proLabore, id) VALUES (8270.06, 200.0);

-- Inserção Exame
INSERT INTO Exame (id, nome, preparo, preco) VALUES (1, 'Endoscopia Digestiva', 'Não fumar 30 minutos antes', 651.13);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (2, 'Raio-X de Tórax', 'Uso de laxante 12h antes do exame', 578.06);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (3, 'Endoscopia Digestiva', 'Evitar exercícios físicos intensos antes do exame', 208.7);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (4, 'Endoscopia Digestiva', 'Jejum de 6 horas', 599.45);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (5, 'Ressonância Magnética', 'Jejum de 6 horas', 721.73);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (6, 'Teste de Glicemia', 'Jejum de 6 horas', 831.01);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (7, 'Hemograma Completo', 'Manter-se hidratado', 412.25);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (8, 'Tomografia Computadorizada', 'Uso de laxante 12h antes do exame', 150.22);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (9, 'Tomografia Computadorizada', 'Não ingerir alimentos gordurosos 24h antes', 255.81);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (10, 'Hemograma Completo', 'Manter-se hidratado', 729.69);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (11, 'Ressonância Magnética', 'Não ingerir alimentos gordurosos 24h antes', 489.48);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (12, 'Exame de Urina', 'Não ingerir medicamentos sem orientação médica', 704.81);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (13, 'Endoscopia Digestiva', 'Jejum absoluto de 8 horas', 540.31);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (14, 'Exame de Colesterol', 'Uso de laxante 12h antes do exame', 736.11);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (15, 'Exame de Colesterol', 'Jejum de 12 horas', 126.09);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (16, 'Ressonância Magnética', 'Jejum absoluto de 8 horas', 862.1);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (17, 'Teste de Glicemia', 'Jejum de 6 horas', 297.63);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (18, 'Teste de Glicemia', 'Evitar exercícios físicos intensos antes do exame', 941.44);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (19, 'Raio-X de Tórax', 'Manter-se hidratado', 650.98);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (20, 'Hemograma Completo', 'Jejum de 8 horas', 900.7);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (21, 'Tomografia Computadorizada', 'Jejum absoluto de 8 horas', 199.51);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (22, 'Teste de Glicemia', 'Não fumar 30 minutos antes', 470.39);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (23, 'Exame de Urina', 'Não ingerir alimentos gordurosos 24h antes', 197.88);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (24, 'Exame de Colesterol', 'Não fumar 30 minutos antes', 682.42);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (25, 'Exame de Urina', 'Jejum de 6 horas', 431.71);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (26, 'Endoscopia Digestiva', 'Não fumar 30 minutos antes', 821.22);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (27, 'Tomografia Computadorizada', 'Jejum de 12 horas', 630.66);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (28, 'Teste de Glicemia', 'Jejum de 8 horas', 190.56);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (29, 'Exame de Colesterol', 'Manter-se hidratado', 374.64);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (30, 'Exame de Urina', 'Uso de laxante 12h antes do exame', 761.25);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (31, 'Hemograma Completo', 'Não fumar 30 minutos antes', 180.9);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (32, 'Hemograma Completo', 'Uso de laxante 12h antes do exame', 376.52);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (33, 'Exame de Urina', 'Jejum de 6 horas', 403.61);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (34, 'Hemograma Completo', 'Uso de laxante 12h antes do exame', 621.9);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (35, 'Tomografia Computadorizada', 'Uso de laxante 12h antes do exame', 762.79);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (36, 'Endoscopia Digestiva', 'Jejum de 12 horas', 870.85);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (37, 'Hemograma Completo', 'Jejum absoluto de 8 horas', 408.89);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (38, 'Tomografia Computadorizada', 'Evitar exercícios físicos intensos antes do exame', 642.48);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (39, 'Ultrassonografia Abdominal', 'Manter-se hidratado', 298.83);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (40, 'Hemograma Completo', 'Jejum de 6 horas', 800.56);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (41, 'Raio-X de Tórax', 'Uso de laxante 12h antes do exame', 863.2);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (42, 'Endoscopia Digestiva', 'Jejum de 6 horas', 176.91);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (43, 'Exame de Colesterol', 'Não fumar 30 minutos antes', 201.15);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (44, 'Endoscopia Digestiva', 'Jejum de 6 horas', 504.14);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (45, 'Endoscopia Digestiva', 'Não fumar 30 minutos antes', 638.99);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (46, 'Exame de Colesterol', 'Manter-se hidratado', 455.47);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (47, 'Exame de Urina', 'Jejum de 12 horas', 642.61);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (48, 'Endoscopia Digestiva', 'Não ingerir alimentos gordurosos 24h antes', 343.77);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (49, 'Raio-X de Tórax', 'Jejum de 6 horas', 776.22);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (50, 'Ressonância Magnética', 'Não fumar 30 minutos antes', 829.43);

-- Inserção Paciente
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (1, 'Felipe Cardoso', 'Rafael Castro', '37961735213', '47582475', '1980-09-17', '62807001', '5027', '', '0667165153', '1878723428', 'felipe.cardoso@email.com', 'Felipe Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (2, 'Julia Araújo', 'Leonardo Barros', '44321754762', '99361620', '1993-02-27', '61350246', '6014', 'apt 101', '8881145012', '8344117691', 'julia.araújo@email.com', 'Laura Maria Pereira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (3, 'Mariana Marcos Ramos', 'Bruna Moraes', '88022903831', '30525905', '1997-03-22', '24374977', '2665', 'casa', '6328177869', '2739334539', 'mariana.ramos@email.com', 'Isabela Oliveira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (4, 'Gabriel Ferreira', 'Isabela Rafael Barros', '70135411001', '44054820', '1940-08-15', '57727496', '2829', 'casa', '6175366153', '5249121979', 'gabriel.ferreira@email.com', 'Mateus Ramos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (5, 'Gustavo Maria Lima', 'Mateus Araújo', '92786414109', '33958098', '1968-04-06', '27026365', '1017', 'apt 101', '5449169943', '6997017741', 'gustavo.lima@email.com', 'Camila Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (6, 'Mateus Marcos Oliveira', 'Sofia Pedro Oliveira', '24551231781', '64322868', '1976-10-09', '82314614', '9778', 'casa', '4483909936', '7184680378', 'mateus.oliveira@email.com', 'Isabela Souza', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (7, 'Camila Pedro Ramos', 'Laura Ana Santos', '40690265403', '78428345', '1977-11-12', '35572699', '1769', 'fundos', '3947102997', '9456008714', 'camila.ramos@email.com', 'Rafael Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (8, 'Leonardo Lima', 'Marcos Nascimento', '59384262475', '77054874', '2009-05-18', '65339918', '7038', 'bloco B', '2294530480', '2722089830', 'leonardo.lima@email.com', 'Felipe Souza', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (9, 'Felipe Ana Rodrigues', 'Gabriel Santos', '70796776717', '32161218', '1988-08-04', '30298949', '7876', '', '7519705137', '1396421697', 'felipe.rodrigues@email.com', 'Gustavo Ana Freitas', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (10, 'Gustavo Ferreira', 'Mateus Ferreira', '81446700667', '85042987', '2005-10-11', '10123183', '1699', 'bloco B', '4348092641', '2706904320', 'gustavo.ferreira@email.com', 'Laura Souza', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (11, 'Rafael Beatriz Souza', 'Maria Cardoso', '01812658596', '89428015', '1993-01-14', '58931497', '911', 'apt 101', '6773749988', '3363443663', 'rafael.souza@email.com', 'Camila Freitas', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (12, 'Maria Castro', 'Gustavo Araújo', '04385902679', '40561798', '1997-01-13', '35656881', '4587', '', '7452216412', '2137693855', 'maria.castro@email.com', 'Pedro Ramos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (13, 'Lucas Pereira', 'Mateus Castro', '80404465198', '01480912', '1988-11-26', '38062671', '4107', '', '6632194292', '2185509431', 'lucas.pereira@email.com', 'Maria Santos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (14, 'Laura Ramos', 'João Ferreira', '27003997446', '02841254', '1958-09-24', '77993117', '105', 'bloco B', '8422733436', '1044934889', 'laura.ramos@email.com', 'Sofia Moraes', 12.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (15, 'Mateus Castro', 'Camila Ramos', '85791812196', '40708019', '1988-05-05', '34980138', '5934', 'fundos', '7414762009', '4775540543', 'mateus.castro@email.com', 'Camila Moreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (16, 'Gabriel Campos', 'Laura Araújo', '03322707335', '64506299', '1994-09-04', '23456429', '7291', 'fundos', '3479747264', '6340190429', 'gabriel.campos@email.com', 'Ana Rodrigues', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (17, 'Pedro Pereira', 'Marcos Lima', '83998606027', '69484212', '2010-06-02', '12781210', '9244', '', '7833659311', '0867265046', 'pedro.pereira@email.com', 'Beatriz Freitas', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (18, 'Mariana Leonardo Souza', 'Maria Santos', '53190663015', '44410079', '2001-11-13', '98349375', '9642', '', '2850095101', '9328520902', 'mariana.souza@email.com', 'Gustavo Moraes', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (19, 'Leonardo Silva', 'Isabela Almeida', '60625884578', '00901195', '1969-03-10', '90351292', '747', 'bloco B', '3819425569', '9380158743', 'leonardo.silva@email.com', 'Julia Moraes', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (20, 'Beatriz Freitas', 'João Souza', '38810866240', '00596404', '1981-06-06', '65613534', '3194', 'fundos', '3989030565', '1688793806', 'beatriz.freitas@email.com', 'Leonardo Moreira', 4.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (21, 'Julia João Lima', 'Gustavo Marcos Souza', '04107607604', '35284227', '1960-01-06', '19969627', '3814', 'bloco B', '8165301656', '0713860071', 'julia.lima@email.com', 'Felipe Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (22, 'Bruna Rodrigues', 'Rafael João Ramos', '65038283454', '91865601', '1985-06-21', '99176549', '8351', 'casa', '1510785373', '2114227140', 'bruna.rodrigues@email.com', 'Leonardo Oliveira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (23, 'Pedro Silva', 'João Costa', '75069914254', '12378228', '1974-07-27', '96209934', '6040', '', '3158706048', '7890351840', 'pedro.silva@email.com', 'Leonardo Freitas', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (24, 'Pedro Souza', 'João Nascimento', '67993471676', '24980390', '2001-06-10', '08411213', '9647', 'apt 101', '5234600598', '2374996728', 'pedro.souza@email.com', 'Leonardo Moraes', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (25, 'Lucas Sofia Rodrigues', 'Mateus Araújo', '44559858020', '28861529', '1971-02-06', '43790802', '2810', 'fundos', '0593575851', '4911373939', 'lucas.rodrigues@email.com', 'Gabriel Cardoso', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (26, 'Julia Santos', 'Pedro Moreira', '93507856523', '86066010', '1970-04-03', '61715839', '6938', 'casa', '3461158529', '4117479831', 'julia.santos@email.com', 'Felipe Cardoso', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (27, 'Gustavo Almeida', 'Ana Freitas', '80498724615', '43075707', '1972-09-17', '28459547', '5702', 'casa', '8399316953', '2722676413', 'gustavo.almeida@email.com', 'Mateus Costa', 23.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (28, 'Felipe Silva', 'Isabela Freitas', '21255439436', '05109560', '2007-10-15', '77682934', '9620', 'bloco B', '5225508513', '2700246372', 'felipe.silva@email.com', 'Gabriel Gabriel Santos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (29, 'Sofia Cardoso', 'Pedro Ramos', '08012504428', '04099536', '1979-03-04', '98541054', '2726', 'apt 101', '2995509373', '9246503598', 'sofia.cardoso@email.com', 'Ana Bruna Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (30, 'Sofia Moreira', 'Julia Lucas Barros', '45641316222', '04568469', '1971-03-07', '01032401', '4185', 'bloco B', '2197578558', '0127367273', 'sofia.moreira@email.com', 'Gabriel Rafael Santos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (31, 'Mateus Pereira', 'Pedro Oliveira', '57549450932', '04354135', '1941-11-01', '95677643', '6555', 'fundos', '9241035234', '9504344981', 'mateus.pereira@email.com', 'Sofia Ramos', 29.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (32, 'Camila Gabriel Araújo', 'Leonardo João Moraes', '26264170007', '14693803', '1942-02-12', '52033835', '9076', 'bloco B', '3315128946', '0976391215', 'camila.araújo@email.com', 'Leonardo Ramos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (33, 'Marcos Camila Almeida', 'Ana Nascimento', '72233279061', '69960262', '1994-02-25', '82891532', '2348', 'apt 101', '4360096032', '1113041282', 'marcos.almeida@email.com', 'Mateus Cardoso', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (34, 'Gabriel Souza', 'Julia Araújo', '08564795047', '46534221', '2005-07-05', '39603967', '4159', 'bloco B', '3859558753', '3997642055', 'gabriel.souza@email.com', 'Felipe Ana Oliveira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (35, 'João Gabriel Araújo', 'Beatriz Camila Ramos', '42429615860', '76686932', '1958-03-23', '48967352', '3714', 'fundos', '1537211607', '3225154595', 'joão.araújo@email.com', 'João Moreira', 24.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (36, 'Julia Lima', 'Bruna Costa', '92129215974', '58902419', '1990-11-14', '54753519', '1632', 'bloco B', '0702552807', '1974273572', 'julia.lima1@email.com', 'Marcos Araújo', 4.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (37, 'Pedro Barros', 'Laura Lima', '71606792265', '69547399', '1958-01-10', '78077805', '4790', 'fundos', '6252310169', '1728219686', 'pedro.barros@email.com', 'Leonardo Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (38, 'Pedro Nascimento', 'Camila Ramos', '91601120534', '83833835', '1995-04-03', '97394944', '4381', 'casa', '2554595701', '1335098640', 'pedro.nascimento@email.com', 'Bruna Silva', 36.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (39, 'Laura Barros', 'Isabela Ferreira', '88330688568', '64380389', '1954-05-06', '19629259', '9523', 'casa', '2916494163', '2451680176', 'laura.barros@email.com', 'Sofia Almeida', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (40, 'Camila Ramos', 'Pedro Ferreira', '95795014559', '74600544', '1955-09-24', '48880201', '2081', 'apt 101', '1756993358', '2812131409', 'camila.ramos1@email.com', 'João Cardoso', 8.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (41, 'Lucas Souza', 'Isabela Silva', '33763992486', '66770601', '1948-03-07', '75640600', '8526', 'fundos', '3725173841', '9018670235', 'lucas.souza@email.com', 'Beatriz Rodrigues', 31.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (42, 'Gabriel Pereira', 'Mateus Pereira', '57677973549', '12424914', '1998-06-03', '91908231', '6522', '', '0655964134', '8355487034', 'gabriel.pereira@email.com', 'Mateus Ferreira', 19.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (43, 'Sofia Rodrigues', 'Camila Barros', '85841215178', '53332175', '1961-12-18', '05153153', '2179', '', '9717023853', '4942611287', 'sofia.rodrigues@email.com', 'Gustavo Lima', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (44, 'Leonardo Ramos', 'Ana Moreira', '00028412020', '82263873', '2008-04-06', '39030819', '6808', 'bloco B', '7807302576', '4932148350', 'leonardo.ramos@email.com', 'Gustavo Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (45, 'Gustavo Costa', 'Felipe Ferreira', '55146442128', '90541772', '1969-07-24', '55917921', '4738', 'fundos', '4590993212', '6698891850', 'gustavo.costa@email.com', 'Gustavo Souza', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (46, 'Felipe Silva', 'Maria Pereira', '97287361660', '63819553', '1989-01-15', '23336850', '5835', 'apt 101', '2837638216', '7926877806', 'felipe.silva1@email.com', 'João Maria Nascimento', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (47, 'Sofia Moraes', 'Rafael Moreira', '52886098149', '50781531', '1996-04-26', '46364220', '4790', '', '2037855915', '0527343278', 'sofia.moraes@email.com', 'Ana João Almeida', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (48, 'Lucas Rodrigues', 'Laura Pedro Santos', '57164931456', '13640776', '1952-10-07', '32220826', '6553', '', '3425548253', '9187154947', 'lucas.rodrigues87x@email.com', 'Pedro Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (49, 'Beatriz Santos', 'Felipe Costa', '40307897794', '56248247', '1942-04-19', '25536308', '130', 'fundos', '4423669427', '7616396047', 'beatriz.santos34a@email.com', 'Bruna Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (50, 'João Camila Moreira', 'Mateus Sofia Lima', '31418203121', '30009382', '1942-01-13', '79451140', '6509', 'bloco B', '6052146150', '6859286215', 'joao.moreira209@email.com', 'João Barros', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (51, 'João Marcos Campos', 'Lucas Sofia Ramos', '02795174076', '58801006', '1943-03-26', '74885056', '5500', 'bloco B', '1984224144', '5545137128', 'joao.campos7k@email.com', 'Beatriz Costa', 49.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (52, 'Maria Oliveira', 'Bruna Rodrigues', '76159857349', '88719329', '1954-10-17', '08483181', '2604', '', '4955302930', '6425589752', 'maria.oliveira92w@email.com', 'Sofia Rodrigues', 14.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (53, 'Bruna Silva', 'Julia Araújo', '70783909134', '88866219', '1941-04-27', '91238320', '1423', 'fundos', '1858997761', '8439418090', 'bruna.silva28b@email.com', 'Pedro Pereira', 6.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (54, 'Mariana Pereira', 'Marcos Costa', '25549451487', '64289096', '1980-05-07', '20306915', '8834', '', '1943830434', '4995152805', 'mariana.pereira6m@email.com', 'Ana Souza', 53.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (55, 'Marcos Oliveira', 'Camila Pereira', '60039277699', '45648388', '1947-05-15', '92906071', '8108', '', '8635910058', '8967280051', 'marcos.oliveira75h@email.com', 'Pedro Silva', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (56, 'Lucas Araújo', 'Gabriel Moraes', '33434760715', '77143648', '2002-12-14', '96048892', '6441', 'fundos', '8262779410', '6549239575', 'lucas.araujo4p@email.com', 'Leonardo Gabriel Moreira', 22.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (57, 'Ana Oliveira', 'Mateus Almeida', '81525065185', '91887295', '1940-11-19', '51402450', '5580', 'bloco B', '7680118614', '3418484389', 'ana.oliveira13n@email.com', 'Ana Almeida', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (58, 'Gustavo Silva', 'Mateus Rodrigues', '15835328124', '09790518', '2000-11-20', '16094556', '2458', 'apt 101', '2620630063', '9300101748', 'gustavo.silva67x@email.com', 'Gabriel Julia Pereira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (59, 'Gustavo Araújo', 'Gustavo Mariana Ramos', '93826157025', '92245276', '1958-09-27', '66986312', '2340', 'bloco B', '2375909280', '1752768369', 'gustavo.araujo51c@email.com', 'Gustavo Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (60, 'Gabriel Araújo', 'Mariana Isabela Souza', '68134716209', '05863933', '1971-09-02', '42960694', '2750', '', '3986442703', '4036809782', 'gabriel.araujo88j@email.com', 'Marcos Ana Oliveira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (61, 'Laura Ferreira', 'Isabela Santos', '26670426573', '98874981', '1967-05-26', '17664523', '3477', 'apt 101', '7711111207', '8834533996', 'laura.ferreira90k@email.com', 'Mariana Silva', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (62, 'Maria Barros', 'João Souza', '96204888213', '17981687', '1954-06-25', '15667087', '2310', '', '4589412006', '5351415408', 'maria.barros55q@email.com', 'Maria Maria Rodrigues', 21.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (63, 'Mariana Almeida', 'Camila Lima', '40246241286', '72475284', '1959-04-23', '42455047', '1956', '', '0301426211', '4963548522', 'mariana.almeida12z@email.com', 'Ana Souza', 57.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (64, 'Sofia Ramos', 'Lucas Campos', '72312238746', '23697988', '2009-03-08', '68423093', '2237', 'casa', '5720668393', '9436317175', 'sofia.ramos70p@email.com', 'Lucas Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (65, 'Laura Cardoso', 'Maria Lima', '26306886964', '47323370', '1954-06-13', '63986222', '1636', 'fundos', '9544443808', '3933508397', 'laura.cardoso34r@email.com', 'Leonardo Costa', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (66, 'Lucas Barros', 'Lucas Ferreira', '56164722568', '95131497', '1972-08-08', '37016578', '2697', 'fundos', '5132970949', '3470486987', 'lucas.barros29s@email.com', 'Laura Lima', 52.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (67, 'Laura Castro', 'Mateus Costa', '93063551398', '97711497', '1952-11-23', '96029736', '8198', '', '9649486418', '8747857829', 'laura.castro31v@email.com', 'Beatriz Costa', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (68, 'Lucas Moraes', 'Bruna Mateus Ferreira', '03355671963', '67863466', '1951-08-23', '03043974', '8313', '', '4933336506', '8209544653', 'lucas.moraes44m@email.com', 'Gabriel Leonardo Cardoso', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (69, 'Gustavo Almeida', 'João Moreira', '54854897723', '82397353', '1988-07-08', '60396067', '2366', '', '3064397244', '0809654837', 'gustavo.almeida67b@email.com', 'Maria Oliveira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (70, 'Laura Rodrigues', 'Gabriel Rodrigues', '37818510380', '28716804', '1944-08-18', '20977889', '1657', 'fundos', '3567440628', '2814688269', 'laura.rodrigues19w@email.com', 'Gabriel Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (71, 'Bruna Santos', 'João Lima', '31192169306', '91758944', '1948-08-01', '25471840', '6343', 'casa', '7920315231', '5187061089', 'bruna.santos45q@email.com', 'Gabriel Campos', 28.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (72, 'Sofia Campos', 'Sofia Pereira', '98635868690', '16662315', '2004-01-04', '81074985', '9645', '', '9815301961', '5575826801', 'sofia.campos17k@email.com', 'Pedro Camila Costa', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (73, 'Sofia Araújo', 'Pedro Almeida', '40915250086', '67224532', '1953-03-16', '86435390', '3851', 'bloco B', '4202044950', '5276821464', 'sofia.araujo82r@email.com', 'Julia Araújo', 67.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (74, 'Beatriz Nascimento', 'Marcos Costa', '47764610769', '37397063', '1972-11-23', '36800423', '9318', 'bloco B', '9201620277', '8836957068', 'beatriz.nascimento50h@email.com', 'João Lima', 2.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (75, 'Laura Pereira', 'Rafael Ferreira', '10561552300', '62452519', '1982-03-06', '58140150', '7872', 'bloco B', '8477207806', '7773702937', 'laura.pereira30c@email.com', 'Rafael Barros', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (76, 'Rafael Moraes', 'Rafael Rodrigues', '76480113995', '12746487', '1976-05-18', '76161711', '2205', 'casa', '0317984362', '2178153279', 'rafael.moraes51x@email.com', 'Felipe Castro', 14.0);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (77, 'Camila Moreira', 'Pedro Almeida', '08717753608', '16101905', '1998-03-07', '51805062', '9844', '', '4311033684', '8815179565', 'camila.moreira84m@email.com', 'Gabriel Moreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (78, 'Sofia Pereira', 'Leonardo Moraes', '88811238259', '81243721', '1965-05-14', '98194267', '2394', 'casa', '0384480397', '9283050617', 'sofia.pereira68w@email.com', 'Ana Felipe Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (79, 'Mateus Nascimento', 'Mateus Moraes', '23777207565', '40424576', '1960-02-03', '85029700', '323', 'casa', '8166267467', '9667148059', 'mateus.nascimento19r@email.com', 'Camila Lucas Santos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (80, 'Laura Lucas Castro', 'João João Oliveira', '91612376669', '77509703', '1981-01-20', '13609128', '3264', 'casa', '3873051792', '6310068397', 'laura.castro92k@email.com', 'Beatriz Almeida', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (81, 'Marcos Nascimento', 'Beatriz Campos', '37930293939', '56318560', '2009-11-22', '71032997', '3612', '', '5478320943', '5120330996', 'marcos.nascimento74x@email.com', 'João Ferreira', NULL);

-- Inserção Fornecedor
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (1, 'Felipe Bruna Barros Ltda', '41135890618327', '8390785153', '4966040123', 'contato@felipe.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (2, 'Isabela Pedro Moreira Ltda', '57312467969379', '1102256138', '7043664808', 'contato@isabela.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (3, 'Sofia Costa Ltda', '64788571078320', '1856465688', '5125974127', 'contato@sofia.com');INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (4, 'Isabela Lima Ltda', '01445194779106', '7457700603', '8431871892', 'contato1@isabela.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (5, 'Gustavo Ferreira Ltda', '51367015111562', '9097191198', '1963188801', 'contato22@gustavo.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (6, 'Sofia Castro Ltda', '32579307683613', '4045245418', '4394938354', 'contato333@sofia.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (7, 'Isabela Souza Ltda', '55466060437607', '8070098109', '4217972599', 'contato4a@isabela.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (8, 'Mariana Julia Campos Ltda', '14028753797398', '5506905495', '6214279576', 'contato5b@mariana.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (9, 'Gustavo Moreira Ltda', '16110246839300', '1244267563', '6664749473', 'contato6c@gustavo.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (10, 'Felipe Isabela Silva Ltda', '69404351081290', '1056610089', '5598809765', 'contato7d@felipe.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (11, 'Rafael Castro Ltda', '52745018870985', '4765041538', '6192652006', 'contato8e@rafael.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (12, 'Sofia Costa Ltda', '77328034538855', '5601215461', '8659066177', 'contato9f@sofia.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (13, 'Beatriz Barros Ltda', '66022223868584', '3839337159', '5121964780', 'contato10g@beatriz.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (14, 'Laura Costa Ltda', '45944460980443', '8462993971', '0343339179', 'contato11h@laura.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (15, 'Mariana Freitas Ltda', '73740271018573', '9344817840', '1510206841', 'contato12i@mariana.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (16, 'Ana Santos Ltda', '09680652738697', '5855642046', '8543839988', 'contato13j@ana.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (17, 'Gustavo Ramos Ltda', '75412606211879', '0721579671', '4596593460', 'contato14k@gustavo.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (18, 'Marcos Araújo Ltda', '17314936362775', '0117705682', '6047629210', 'contato15l@marcos.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (19, 'Julia Bruna Ramos Ltda', '01877183539312', '8313553649', '6308047531', 'contato16m@julia.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (20, 'Ana Nascimento Ltda', '72702950031678', '9342194058', '1002802717', 'contato17n@ana.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (21, 'Felipe Rodrigues Ltda', '69105188307171', '6455445173', '4060476463', 'contato18o@felipe.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (22, 'Gabriel Pereira Ltda', '59241082254765', '9918410415', '3453122643', 'contato19p@gabriel.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (23, 'Sofia Araújo Ltda', '73991553696534', '9427704489', '3018302474', 'contato20q@sofia.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (24, 'Beatriz Araújo Ltda', '95835699753589', '7643026907', '4191962549', 'contato21r@beatriz.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (25, 'Pedro Rodrigues Ltda', '91312300135544', '3112592286', '3952463869', 'contato22s@pedro.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (26, 'Rafael Barros Ltda', '47457239391876', '2581522708', '0167958214', 'contato23t@rafael.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (27, 'Rafael Rafael Araújo Ltda', '48315838775839', '7905790386', '5346039182', 'contato24u@rafael.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (28, 'Camila Freitas Ltda', '44899564791403', '4522706046', '7954524713', 'contato25v@camila.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (29, 'Rafael Pereira Ltda', '63410712466481', '2970286993', '0978470473', 'contato26w@rafael.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (30, 'Felipe Freitas Ltda', '40517443333081', '2714741409', '9780667474', 'contato27x@felipe.com');

-- Inserção Produto
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto I', 78.39, 61, 1);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 127.85, 99, 2);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto F', 255.09, 30, 3);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto F', 60.82, 88, 4);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto J', 340.76, 81, 5);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto F', 476.47, 11, 6);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto F', 85.8, 75, 7);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto E', 236.26, 6, 8);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto H', 128.62, 34, 9);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 155.22, 42, 10);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto J', 46.6, 60, 11);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 275.1, 71, 12);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 147.0, 13, 13);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto C', 171.8, 12, 14);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto C', 29.03, 78, 15);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 429.08, 90, 16);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 259.54, 2, 17);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto F', 371.03, 4, 18);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto B', 433.5, 40, 19);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto J', 78.54, 100, 20);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto F', 329.79, 22, 21);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto I', 31.11, 30, 22);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto H', 202.28, 5, 23);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto J', 47.83, 23, 24);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 19.79, 52, 25);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto B', 367.78, 76, 26);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 201.33, 62, 27);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto I', 178.88, 62, 28);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto B', 430.95, 83, 29);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto E', 452.0, 36, 30);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto A', 37.27, 98, 31);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto I', 401.03, 4, 32);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto H', 241.44, 17, 33);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 239.57, 31, 34);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto J', 102.86, 15, 35);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto I', 339.36, 87, 36);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto H', 61.4, 56, 37);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto J', 482.15, 41, 38);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto E', 479.52, 7, 39);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 229.58, 50, 40);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 402.57, 42, 41);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto E', 405.74, 95, 42);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto C', 78.76, 20, 43);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto D', 196.62, 75, 44);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 261.09, 47, 45);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 354.65, 75, 46);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto I', 137.7, 91, 47);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 71.64, 22, 48);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto A', 219.01, 38, 49);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Produto G', 65.04, 68, 50);

-- Inserção Venda
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-01-05 02:01:54', 15, 29, 8, 155);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-09-26 18:48:11', 17, 1, 41, 181);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-19 14:06:40', 1, 10, 11, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-03-25 01:34:09', 18, 19, 26, 176);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-01-03 16:21:07', 13, 18, 20, 191);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-01-22 05:12:37', 12, 11, 40, 167);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-11-03 20:30:59', 14, 15, 3, 184);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-07-09 22:14:53', 2, 6, 21, 171);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-10-24 13:14:35', 20, 20, 34, 200);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-14 11:45:40', 7, 17, 21, 165);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-01-05 17:58:57', 16, 15, 50, 157);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-02 07:06:12', 16, 13, 35, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-09-06 00:19:51', 19, 1, 21, 160);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-20 15:13:45', 5, 12, 27, 153);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-12 18:13:29', 15, 16, 9, 154);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-05 10:13:02', 16, 21, 35, 153);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-04 06:42:29', 11, 30, 41, 176);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-10-01 23:29:28', 4, 3, 2, 183);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-12-14 04:10:55', 15, 23, 20, 192);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-16 17:46:09', 13, 21, 25, 178);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-11 05:35:48', 15, 18, 8, 168);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-03-05 10:40:24', 3, 8, 11, 176);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-03-28 04:43:07', 5, 11, 42, 162);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-06-17 17:30:34', 18, 16, 31, 178);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-06-05 12:48:47', 19, 29, 19, 160);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-09-22 06:22:03', 9, 28, 13, 185);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-15 17:42:48', 17, 16, 35, 195);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-03-25 00:44:21', 7, 19, 35, 159);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-03 20:02:52', 19, 23, 37, 171);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-23 13:27:14', 1, 17, 33, 158);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-07-14 02:18:41', 8, 26, 23, 192);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-11-12 18:35:32', 8, 13, 21, 160);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-05 20:32:53', 4, 22, 17, 187);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-08-04 06:53:47', 11, 26, 9, 173);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-06-14 19:57:32', 3, 12, 26, 186);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-06-26 22:31:28', 9, 17, 26, 171);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-09-05 18:14:24', 17, 27, 17, 187);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-25 06:09:42', 10, 3, 7, 198);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-09-24 00:11:33', 20, 16, 39, 174);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-10 23:52:55', 20, 21, 37, 196);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-07-02 03:35:36', 8, 17, 4, 182);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-06-16 12:59:54', 3, 25, 6, 190);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-05-15 17:28:15', 13, 17, 21, 192);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-09-02 19:22:04', 17, 3, 17, 195);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-12-22 01:40:19', 14, 18, 10, 186);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-02-12 10:37:10', 18, 12, 13, 185);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-04-06 14:44:14', 11, 9, 5, 157);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-22 16:02:18', 5, 14, 43, 157);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-28 20:45:28', 19, 21, 23, 183);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-07-04 16:33:33', 2, 19, 20, 194);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-03-10 23:05:19', 13, 30, 32, 164);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-11-27 02:47:07', 13, 26, 50, 193);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-19 20:03:45', 10, 2, 18, 182);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-07-13 21:37:34', 6, 29, 40, 184);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-21 11:43:55', 10, 22, 33, 188);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-05-15 19:31:15', 18, 26, 48, 169);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-06-19 07:12:14', 20, 12, 31, 182);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-06-15 18:19:32', 19, 12, 13, 193);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-25 08:07:30', 17, 26, 19, 185);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-03-14 13:32:58', 8, 5, 17, 182);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-11 01:55:09', 9, 20, 2, 171);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-28 16:59:58', 20, 8, 9, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-01 15:02:55', 9, 25, 9, 161);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-11 01:03:30', 2, 15, 16, 172);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-05-25 09:02:17', 5, 8, 23, 185);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-08-15 14:39:26', 10, 3, 37, 159);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-03 21:06:42', 4, 21, 49, 152);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-03 13:25:32', 1, 10, 34, 182);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-28 00:16:18', 4, 12, 15, 186);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-20 12:16:58', 14, 2, 44, 152);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-11-20 20:17:38', 15, 1, 50, 196);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-06-08 18:17:35', 8, 12, 9, 175);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-11-21 15:31:30', 3, 29, 18, 165);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-06-25 17:40:21', 13, 15, 18, 199);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-18 02:26:18', 3, 11, 8, 155);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-05 10:05:31', 12, 27, 45, 168);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-08-28 03:02:43', 5, 25, 46, 200);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-03-25 21:06:36', 10, 24, 3, 172);
INSERT into Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-06-05 03:36:25', 20, 18, 37, 177);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-11-07 19:52:20', 8, 12, 31, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-08-25 01:20:03', 12, 15, 18, 153);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-07-15 15:48:17', 7, 25, 17, 177);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-12-28 09:57:50', 3, 15, 10, 157);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-01-10 17:26:51', 2, 28, 32, 170);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-02-18 20:14:14', 9, 6, 12, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-12-28 21:51:06', 6, 24, 17, 196);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-21 07:13:19', 8, 13, 5, 172);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-07-17 05:36:42', 3, 6, 13, 168);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-02-02 20:43:53', 5, 11, 8, 181);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-17 20:26:54', 4, 8, 32, 193);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-10-02 11:47:27', 5, 12, 19, 196);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-11-06 17:34:23', 12, 26, 39, 163);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-08-12 18:59:39', 17, 2, 43, 179);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-09-04 13:25:04', 18, 11, 43, 171);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-07-17 14:28:35', 5, 22, 26, 181);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-07-24 16:09:20', 15, 22, 33, 177);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-09-17 09:09:07', 10, 5, 3, 177);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-11-04 11:41:31', 12, 3, 14, 192);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-08-01 04:28:07', 2, 22, 46, 153);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-06-02 20:49:16', 5, 21, 27, 186);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-06 00:52:33', 19, 29, 40, 199);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-07-16 14:49:47', 11, 24, 41, 166);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-27 06:59:16', 8, 15, 48, 196);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-12-05 15:38:57', 5, 17, 49, 165);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-11-26 23:24:24', 1, 29, 46, 186);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-07 17:02:25', 10, 20, 34, 194);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-07-06 11:23:38', 6, 6, 23, 158);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-21 11:38:27', 1, 12, 16, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-11-06 00:19:51', 10, 9, 50, 171);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-07 09:32:30', 10, 24, 11, 176);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-10-03 17:05:29', 1, 9, 49, 152);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-28 04:19:51', 8, 22, 4, 166);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-07-18 12:42:03', 16, 20, 26, 164);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-02-26 17:49:28', 10, 17, 1, 197);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-13 00:58:11', 3, 10, 21, 176);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-11-19 15:27:50', 1, 27, 13, 154);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-10-24 18:20:22', 15, 25, 1, 181);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-24 19:03:27', 3, 25, 18, 151);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-06 02:49:17', 5, 7, 8, 164);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-05-23 03:05:23', 6, 2, 49, 175);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-25 02:56:54', 9, 12, 32, 191);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-17 20:38:56', 1, 15, 48, 182);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-06-06 01:17:11', 2, 6, 28, 151);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-12 18:50:18', 14, 13, 37, 178);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-01-22 02:06:10', 19, 15, 44, 191);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-06-02 15:11:39', 17, 18, 47, 177);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-05-09 06:54:38', 15, 18, 48, 155);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-12-28 05:13:16', 7, 30, 31, 170);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-25 07:08:54', 9, 18, 50, 164);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-09-17 04:23:43', 20, 1, 21, 166);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-04-19 15:45:10', 17, 11, 42, 192);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-09-19 04:13:16', 1, 18, 26, 200);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-03-09 05:28:43', 8, 15, 26, 199);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-06-01 00:42:04', 16, 11, 44, 174);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-27 21:58:08', 12, 22, 10, 180);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-03-13 21:41:48', 9, 29, 28, 170);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-03-27 22:00:47', 3, 2, 27, 166);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-08-24 16:06:04', 3, 14, 8, 198);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-07-23 22:02:04', 16, 28, 23, 167);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-05-02 03:24:40', 5, 2, 31, 162);

-- Inserção AgendaExame

INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2025-10-13 10:37:53', 'Mariana Campos', 'Laudo médico detalhado para exame.', 'agendado', 62, 118, 42);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-12-13 22:21:02', 'Sofia Nascimento', 'Laudo médico detalhado para exame.', 'realizado', 14, 135, 45);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-06-06 16:00:34', 'Joana Costa', 'Provident dolor nostrum possimus voluptatum.', 'cancelado', 3, 101, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-10-18 12:45:02', 'Daniel Cardoso', 'Tempore ipsum assumenda placeat. Pariatur quae mollitia enim error culpa.', 'realizado', 5, 102, 2);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-17 04:23:00', 'Dra. Camila Moreira', 'Commodi dicta consequuntur ratione ad. Nemo iusto voluptatem consectetur sunt aperiam id.', 'realizado', 9, 103, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-22 21:46:00', 'Sra. Marcela Oliveira', 'Asperiores voluptas odit ipsum perspiciatis exercitationem soluta. Odit delectus vitae inventore tenetur animi commodi.', 'agendado', 1, 104, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-09-11 21:34:15', 'Davi Luiz da Cruz', 'Exercitationem velit tempora sapiente dolorum. Earum numquam nostrum atque odit nihil neque.', 'cancelado', 7, 105, 10);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-09-26 00:34:00', 'Mariane Mendes', 'Repudiandae adipisci aliquid. Eaque distinctio nemo nulla adipisci suscipit molestias.', 'cancelado', 6, 106, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-09-25 15:10:29', 'Lucca Farias', 'Iste porro culpa impedit iure. Non est quaerat quasi similique voluptate.', 'agendado', 2, 107, 5);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-08-25 14:48:48', 'Sr. Ian Duarte', 'Eaque dolorum atque enim. Sint in vitae temporibus repellendus ut.', 'cancelado', 4, 108, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-26 03:57:50', 'Sr. Vitor Hugo da Cruz', 'Iure soluta libero at hic itaque dolores. Explicabo amet libero sunt omnis iusto modi sed.', 'agendado', 8, 109, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-04-14 18:13:54', 'Francisco Moreira', 'Aliquid amet natus facere enim harum. Quisquam eius voluptatibus perspiciatis blanditiis voluptate hic.', 'realizado', 10, 110, 4);

INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2025-01-10 09:40:15', 'Lucas Ferreira', 'Dolores quisquam temporibus inventore.', 'agendado', 11, 111, 7);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2025-02-21 14:25:42', 'Marina Alves', 'Velit aspernatur voluptas veniam.', 'realizado', 12, 112, 3);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-07-05 16:05:33', 'Ricardo Nunes', 'Recusandae molestiae soluta eos.', 'cancelado', 13, 113, 1);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-12-30 08:15:22', 'Sandra Souza', 'Molestias rerum dolorem et.', 'agendado', 14, 114, 5);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-11-19 13:50:10', 'Júlio César', 'Provident laudantium eos et.', 'realizado', 15, 115, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-06-25 17:40:55', 'Marcos Lima', 'Voluptatibus repudiandae aliquid.', 'cancelado', 16, 116, 7);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-10-11 12:10:44', 'Patrícia Gomes', 'Exercitationem et optio.', 'realizado', 17, 117, 2);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-05-03 14:55:30', 'André Costa', 'Quia quasi doloremque beatae.', 'agendado', 18, 118, 8);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-08-22 09:20:18', 'Fernanda Silva', 'Nihil eaque molestiae.', 'realizado', 19, 119, 9);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2025-03-14 11:33:40', 'Eduardo Rocha', 'Explicabo molestiae est.', 'cancelado', 20, 120, 10);

INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-07-29 15:45:50', 'Ana Paula', 'Velit laborum et.', 'agendado', 21, 121, 1);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-04-19 08:55:35', 'Cláudio Mendes', 'Officiis beatae.', 'realizado', 22, 122, 2);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-12-06 16:10:45', 'Daniela Rocha', 'Facere nobis.', 'cancelado', 23, 123, 3);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-13 14:40:50', 'Marcos Moreira', 'Voluptatem rerum.', 'realizado', 24, 124, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2025-01-28 11:25:20', 'Paula Lima', 'Illum laboriosam.', 'agendado', 25, 125, 5);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-08-16 10:35:30', 'Rafael Silva', 'Voluptatibus.', 'realizado', 26, 126, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-03-02 09:15:10', 'Sérgio Alves', 'Distinctio consequatur.', 'cancelado', 27, 127, 7);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-10-08 13:50:40', 'Juliana Costa', 'Dignissimos nobis.', 'realizado', 28, 128, 8);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-09-21 15:10:55', 'Vinícius Moreira', 'Possimus dolorem.', 'agendado', 29, 129, 9);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-12-17 10:40:25', 'Renata Lima', 'Doloribus earum.', 'realizado', 30, 130, 10);

-- Inserção Pagamento
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'bVrpoiVgRVIfLBcbfnoGMbJm1', 122.51, 3, 1, '2025-02-17 09:01:35', '2024-11-22 21:46:00', 1, 104, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Cartão', 'AoCLrZaWZkSBvrjnWvgfygww8', 300.89, 6, 2, '2025-01-04 18:22:28', '2024-09-25 15:10:29', 2, 107, 5);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'ZcUDIhyfJsONxKmTecQoXsfo4', 709.03, 5, 3, '2025-04-16 19:27:11', '2024-06-06 16:00:34', 3, 101, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'yrDOxkxwnQrSRPeMOkIUpkDy1', 631.44, 1, 4, '2024-08-28 03:20:09', '2023-08-25 14:48:48', 4, 108, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'oRuXXdocZuzrenKTunPFzPDj8', 184.33, 2, 5, '2024-08-26 04:06:07', '2023-10-18 12:45:02', 5, 102, 2);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'pVJIqVLBLzxoiGFfWdhjOkYR2', 605.12, 6, 6, '2024-10-26 06:03:21', '2023-09-26 00:34:00', 6, 106, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Boleto', 'eyyMDHqJaRUhRIWrXPvhsBkD9', 298.40, 5, 7, '2024-05-16 13:29:18', '2023-09-11 21:34:15', 7, 105, 10);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Dinheiro', 'GWlGgOtOGMmjxWkIXHaMuFbh4', 828.49, 1, 8, '2025-05-11 03:04:00', '2024-11-26 03:57:50', 8, 109, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Cartão', 'ZtpdpKffUFeWIXiiQEJkqHMB5', 728.33, 3, 9, '2024-08-05 13:20:32', '2024-11-17 04:23:00', 9, 103, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Dinheiro', 'WUSmTtzQPxCHChpoevbLJoLo8', 239.93, 3, 10, '2024-05-18 02:15:48', '2024-04-14 18:13:54', 10, 110, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'FvGHeTgFRuWoOXeOWLnc', 510.00, 4, 11, '2025-01-10 08:00:00', '2025-01-10 09:40:15', 11, 111, 7);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Cartão', 'JkLmPoQeRsTuVwXyZ123', 320.00, 2, 12, '2025-02-22 11:30:00', '2025-02-21 14:25:42', 12, 112, 3);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'MnOpQrStUvWxYz012345', 450.00, 5, 13, '2024-07-06 15:00:00', '2024-07-05 16:05:33', 13, 113, 1);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'AbCdEfGhIjKlMnOpQrSt', 600.00, 1, 14, '2024-12-31 09:00:00', '2024-12-30 08:15:22', 14, 114, 5);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'UvWxYz0123456789AbCd', 750.00, 5, 15, '2023-11-20 13:00:00', '2023-11-19 13:50:10', 15, 115, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'EfGhIjKlMnOpQrStUvWx', 670.00, 2, 16, '2023-06-26 18:00:00', '2023-06-25 17:40:55', 16, 116, 7);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'Yz0123456789AbCdEfGh', 540.00, 6, 17, '2024-10-12 14:00:00', '2024-10-11 12:10:44', 17, 117, 2);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Cartão', 'IjKlMnOpQrStUvWxYz01', 480.00, 4, 18, '2024-05-04 15:00:00', '2024-05-03 14:55:30', 18, 118, 8);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', '23456789AbCdEfGhIjKl', 500.00, 3, 19, '2024-08-23 10:00:00', '2024-08-22 09:20:18', 19, 119, 9);

-- Procedure: Buscar por data

CREATE PROCEDURE BuscarPorData(
    IN tabela VARCHAR(64),
    IN colunaData VARCHAR(64),
    IN dataBusca DATE
)
BEGIN
    -- copia o parâmetro para uma user variable
    SET @data = dataBusca;

    -- monta o SQL dinâmico, escapando nomes de tabela/coluna
    SET @sql = CONCAT(
      'SELECT *',
      ' FROM `', tabela, '`',
      ' WHERE DATE(`', colunaData, '`) = ?'
    );

    PREPARE stmt FROM @sql;
    EXECUTE stmt USING @data;
    DEALLOCATE PREPARE stmt;
end

-- Chamando a procedure
CALL BuscarPorData('AgendaExame','dataHoraRealizacao','2025-01-10');

-- Trigger para mudar status de agendaExame depois que adicionou em pagamento 

CREATE TRIGGER AtualizaStatusExame
AFTER INSERT ON Pagamento
FOR EACH ROW
BEGIN
    UPDATE AgendaExame
    SET status = 'Pago'
    WHERE dataHoraRealizacao = NEW.agendaExameDataHora
      AND idPaciente = NEW.agendaExamePaciente
      AND idMedico = NEW.agendaExameMedico
      AND idExame = NEW.agendaExameExame;
END 

-- Teste trigger

INSERT INTO Pagamento (
    formaPagamento,
    notaFiscal,
    valorPago,
    parcelas,
    agendaExameDataHora,
    agendaExamePaciente,
    agendaExameMedico,
    agendaExameExame
) VALUES (
    'Pix',
    'NF20240522001',
    350.00,
    1,
    '2024-12-30 08:15:22',
    14,
    114,
    5
);

-- Conferindo se funcionou { Tem que retornar pago}
SELECT status
FROM AgendaExame
WHERE dataHoraRealizacao = '2024-12-30 08:15:22'
  AND idPaciente = 14
  AND idMedico = 114
  AND idExame = 5;

-- 1. Dashboard Geral / Visão Executiva

-- Total de exames realizados no mês/ano
SELECT 
    YEAR(dataHoraRealizacao) AS ano,
    MONTH(dataHoraRealizacao) AS mes,
    COUNT(*) AS total_exames
FROM AgendaExame
WHERE status = 'realizado'
GROUP BY ano, mes
ORDER BY ano, mes;

-- 2. Dashboard de Exames

-- Top 10 exames mais realizados
SELECT e.nome, COUNT(*) AS quantidade
FROM AgendaExame a
JOIN Exame e ON a.idExame = e.id
WHERE a.status = 'realizado'
GROUP BY e.nome
ORDER BY quantidade DESC
LIMIT 10;

-- Número de exames por médico
SELECT m.id, c.nome, COUNT(*) AS total_exames
FROM AgendaExame a
JOIN Medico m ON a.idMedico = m.id
JOIN Colaborador c ON m.id = c.id
WHERE a.status = 'realizado'
GROUP BY m.id, c.nome
ORDER BY total_exames DESC;

-- Distribuição dos exames por período do dia
SELECT
    CASE 
        WHEN HOUR(dataHoraRealizacao) BETWEEN 6 AND 11 THEN 'Manhã'
        WHEN HOUR(dataHoraRealizacao) BETWEEN 12 AND 17 THEN 'Tarde'
        WHEN HOUR(dataHoraRealizacao) BETWEEN 18 AND 23 THEN 'Noite'
        ELSE 'Madrugada'
    END AS periodo,
    COUNT(*) AS total_exames
FROM AgendaExame
WHERE status = 'realizado'
GROUP BY periodo;

-- 3. Dashboard de Médicos

-- % de exames realizados por médico
SELECT c.nome, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM AgendaExame WHERE status = 'realizado') AS percentual
FROM AgendaExame a
JOIN Medico m ON a.idMedico = m.id
JOIN Colaborador c ON m.id = c.id
WHERE a.status = 'realizado'
GROUP BY c.nome
ORDER BY percentual DESC;

-- Médicos com mais atendimentos no mês atual
SELECT c.nome, COUNT(*) AS atendimentos
FROM AgendaExame a
JOIN Medico m ON a.idMedico = m.id
JOIN Colaborador c ON m.id = c.id
WHERE a.status = 'realizado'
  AND YEAR(a.dataHoraRealizacao) = YEAR(CURDATE())
  AND MONTH(a.dataHoraRealizacao) = MONTH(CURDATE())
GROUP BY c.nome
ORDER BY atendimentos DESC
LIMIT 5;


-- 4. Dashboard de Pacientes

-- Pacientes com mais exames realizados
SELECT p.nome, COUNT(*) AS total_exames
FROM AgendaExame a
JOIN Paciente p ON a.idPaciente = p.id
WHERE a.status = 'realizado'
GROUP BY p.id, p.nome
ORDER BY total_exames DESC
LIMIT 10;

-- Exames por faixa etária dos pacientes
SELECT
    CASE
        WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) < 18 THEN '<18'
        WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 18 AND 35 THEN '18-35'
        WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 36 AND 60 THEN '36-60'
        ELSE '>60'
    END AS faixa_etaria,
    COUNT(*) AS total_exames
FROM AgendaExame a
JOIN Paciente p ON a.idPaciente = p.id
WHERE a.status = 'realizado'
GROUP BY faixa_etaria
ORDER BY faixa_etaria;

-- Pacientes que indicaram outro paciente
SELECT p1.nome AS paciente, COUNT(p2.id) AS indicados
FROM Paciente p1
LEFT JOIN Paciente p2 ON p2.pacienteIndicador = p1.id
GROUP BY p1.id, p1.nome
ORDER BY indicados DESC
LIMIT 10;

-- 5 Produtos

-- Produtos mais utilizados
SELECT
    p.nome AS produto,
    COUNT(v.dataHoraVenda) AS vezes_vendido,
    SUM(v.quantidade) AS quantidade_vendida
FROM Venda v
JOIN Produto p ON v.idProduto = p.id
GROUP BY p.id, p.nome
ORDER BY quantidade_vendida DESC
LIMIT 10;

-- Quantidade de produtos
SELECT
    nome,
    quantidade
FROM Produto
ORDER BY quantidade DESC;

-- Compras por fornecedor

SELECT
    f.nome AS fornecedor,
    SUM(v.quantidade) AS total_vendido
FROM Venda v
JOIN Fornecedor f ON v.idFornecedor = f.id
GROUP BY f.id, f.nome
ORDER BY total_vendido DESC;


-- 6 Agendamento

-- Total de exames agendados por dia 
SELECT
    DATE(dataHoraRealizacao) AS dia,
    COUNT(*) AS total_exames
FROM AgendaExame
GROUP BY dia
ORDER BY dia;

-- Número médio de exames que um paciente faz por agendamento
SELECT
    AVG(qtd_exames) AS media_exames_por_agendamento
FROM (
    SELECT
        idPaciente,
        dataHoraRealizacao,
        COUNT(*) AS qtd_exames
    FROM AgendaExame
    GROUP BY idPaciente, dataHoraRealizacao
) sub;

-- Quantos exames agendados por hora do dia 
SELECT
    HOUR(dataHoraRealizacao) AS hora,
    COUNT(*) AS total_exames
FROM AgendaExame
GROUP BY hora
ORDER BY total_exames DESC;
