/* The default password is: 'senha' */

INSERT INTO usuarios VALUES ('erick', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Erick');
INSERT INTO usuarios VALUES ('thiago', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Thiago');
INSERT INTO usuarios VALUES ('carlos', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Carlos');
INSERT INTO usuarios VALUES ('pedro', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Pedro');
INSERT INTO usuarios VALUES ('gustavo', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Gustavo');
INSERT INTO usuarios VALUES ('maligno', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Maligno');
INSERT INTO usuarios VALUES ('silvia', '$2b$10$Cx769UtSqXzLnQ0tK/q.du8WL.SxsClFj4C7wJqb9OgSmIxDcG9lO', 'Silvia');

INSERT INTO professores (login, area_de_formacao) VALUES ('erick', 'API');

INSERT INTO alunos(login, coeficiente_rendimento) VALUES ('maligno', 10);
INSERT INTO alunos(login, coeficiente_rendimento) VALUES ('silvia', 10);

INSERT INTO alunos_questoes(login, codigo_questao) VALUES ('maligno', 1);
INSERT INTO alunos_questoes(login, codigo_questao) VALUES ('silvia', 1);
INSERT INTO alunos_questoes(login, codigo_questao) VALUES ('maligno', 2);