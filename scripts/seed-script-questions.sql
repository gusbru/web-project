use webproject;

INSERT INTO questoes(enunciado, resposta_correta) VALUES ('Quanto é 1+1?', 'A');
INSERT INTO questoes(enunciado, resposta_correta) VALUES ('Quanto é 1-1?', 'D');


INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (1, 'A', '2');
INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (1, 'B', '1');
INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (1, 'C', '0');
INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (1, 'D', '6');

INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (2, 'A', '-1');
INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (2, 'B', '1');
INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (2, 'C', '-2');
INSERT INTO alternativas(codigo_questao, alternativa, descricao)  VALUES (2, 'D', '0');
