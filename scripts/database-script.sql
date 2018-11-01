CREATE DATABASE project;

use project;

CREATE TABLE usuarios (
  login VARCHAR(255) NOT NULL,
  nome VARCHAR(255), 
  email VARCHAR(255) NOT NULL, 
  senha VARCHAR(255) NOT NULL, 
  PRIMARY KEY (login),
);


CREATE TABLE alunos (
  login VARCHAR(255),
  coeficiente_rendimento int,
  PRIMARY KEY(login),
  FOREIGN KEY (login) REFERENCES usuarios(cod)
);


CREATE TABLE professores (
  login VARCHAR(255),
  area_de_formacao VARCHAR(255),
  PRIMARY KEY(login),
  FOREIGN KEY (login) REFERENCES usuario(cod) 
);

CREATE TABLE questoes (
	codigo_questao INT,
  enunciado VARCHAR(255),
  respota_correta VARCHAR(255),
  alternativa VARCHAR(255),
  PRIMARY KEY (codigo_questao)
);

CREATE TABLE alunos_questoes (
  codigo INT,
	login  VARCHAR(255),
	cod_questao INT,
  PRIMARY KEY (codigo),
  FOREIGN KEY (login) REFERENCES ALUNO(login),
  FOREIGN KEY (login) REFERENCES QUESTAO(cod_questao)
);
