CREATE DATABASE webproject;

use webproject;

CREATE TABLE usuarios (
  login VARCHAR(255) NOT NULL,  
  senha VARCHAR(255) NOT NULL, 
  nome VARCHAR(255), 
  PRIMARY KEY (login)
);

CREATE TABLE alunos (
  codigo INT AUTO_INCREMENT,
  login VARCHAR(255),
  coeficiente_rendimento int,
  PRIMARY KEY(codigo),
  FOREIGN KEY (login) REFERENCES usuarios(login)
);

CREATE TABLE professores (
  codigo INT AUTO_INCREMENT,
  login VARCHAR(255),
  area_de_formacao VARCHAR(255),
  PRIMARY KEY(codigo),
  FOREIGN KEY (login) REFERENCES usuarios(login) 
);

CREATE TABLE questoes (
	codigo_questao INT AUTO_INCREMENT,
  enunciado VARCHAR(255),
  resposta_correta ENUM('A', 'B', 'C', 'D'),
  PRIMARY KEY (codigo_questao)
);

CREATE TABLE alternativas (
  codigo_alternativa INT AUTO_INCREMENT,
  codigo_questao INT,
  alternativa ENUM('A', 'B', 'C', 'D'),
  descricao VARCHAR(255),
  PRIMARY KEY (codigo_alternativa),
  FOREIGN KEY (codigo_questao) REFERENCES questoes(codigo_questao)
);

CREATE TABLE alunos_questoes (
  codigo_alunos_questoes INT AUTO_INCREMENT,
	login  VARCHAR(255),
	codigo_questao INT,
  resposta ENUM('A', 'B', 'C', 'D'),
  PRIMARY KEY (codigo_alunos_questoes),
  FOREIGN KEY (login) REFERENCES usuarios(login),
  FOREIGN KEY (codigo_questao) REFERENCES questoes(codigo_questao)
);
