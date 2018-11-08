import express from 'express';

import auth from '../middlewares/auth';
import isProfessor from '../middlewares/isProfessor';
import wrapAsync from '../middlewares/wrapAsync';

import validateQuestao from '../validations/questoes';

const routes = express.Router();

routes.get('/', auth, wrapAsync(async (req, res) => {
  const { tabela } = req.orm;

  const questoes = await req.orm.query(
    `SELECT * 
    FROM ${tabela.questoes}`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(questoes);
}));

routes.get('/:login', [auth, isProfessor], wrapAsync(async (req, res) => {
  const { login } = req.params;
  const { tabela, chavePrimaria } = req.orm;

  const questoes = await req.orm.query(
    `SELECT q.enunciado, a.resposta
    FROM ${tabela.alunosQuestoes} a, ${tabela.questoes} q
    WHERE a.login = '${login}'
      AND a.codigo_questao = q.codigo_questao`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(questoes);
}));

routes.post('/', [auth, isProfessor], wrapAsync(async (req, res) => {
  const { enunciado, resposta_correta, alternativas } = req.body;
  const { tabela, chavePrimaria } = req.orm;

  const opcoes = ['A', 'B', 'C', 'D'];

  const { error } = validateQuestao(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const questao = await req.orm.query(
    `INSERT INTO ${tabela.questoes}(enunciado, resposta_correta)
    VALUES('${enunciado}', '${resposta_correta}')`,
    { type: req.orm.QueryTypes.INSERT }
  );

  const codigoQuestao = questao[0];

  alternativas.forEach((alternativa, index) => {
    req.orm.query(
      `INSERT INTO ${tabela.alternativas}(codigo_questao, alternativa, descricao)
      VALUES('${codigoQuestao}', '${opcoes[index]}', '${alternativa}')`
    );
  });

  res.send({ enunciado, alternativas });
}));

export default routes;