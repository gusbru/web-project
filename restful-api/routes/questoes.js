import express from 'express';

import auth from '../middlewares/auth';
import isProfessor from '../middlewares/isProfessor';
import wrapAsync from '../middlewares/wrapAsync';

import validateQuestao from '../validations/questoes';

const routes = express.Router();

routes.param(['codigoQuestao'], (req, res, next, value) => {
  if(!parseInt(value, 10)) {
    res.status(404).send({ error: 'Algo falhou'})
  }
  return next();
});

routes.get('/', wrapAsync(async (req, res) => {
  const { tabela } = req.orm;
  let codigoQuestoes = [];
  let questoesFinal = [];

  let questoes = await req.orm.query(
    `SELECT ${tabela.questoes}.codigo_questao,
      enunciado, 
      codigo_alternativa, 
      alternativa, 
      descricao, 
      resposta_correta
    FROM ${tabela.alternativas} INNER JOIN ${tabela.questoes}
    ON ${tabela.alternativas}.codigo_questao = ${tabela.questoes}.codigo_questao
    ORDER BY ${tabela.questoes}.codigo_questao`,
    { type: req.orm.QueryTypes.SELECT }
  );

  questoes.forEach((questao) => {
    const {
      codigo_questao,
      enunciado,
      resposta_correta, 
      alternativa, 
      descricao
    } = questao;

    let indexQuestao = codigoQuestoes.indexOf(questao.codigo_questao);
    let newQuestao;

    if (indexQuestao === -1) {
      codigoQuestoes.push(codigo_questao);
      newQuestao = { codigo_questao, enunciado, resposta_correta };
      newQuestao[`${alternativa}`] = descricao;
      questoesFinal.push(newQuestao);
    } else {
      questoesFinal[codigoQuestoes.length - 1][`${alternativa}`] = descricao;
    }
  });

  res.send(questoesFinal);
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
  const { tabela, chavePrimaria, opcoesAlternativas } = req.orm;

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
      VALUES('${codigoQuestao}', '${opcoesAlternativas[index]}', '${alternativa}')`
    );
  });

  const questaoInserida = await req.orm.query(
    `SELECT * FROM ${tabela.questoes}
    WHERE codigo_questao = ${codigoQuestao}`,
    { type: req.orm.QueryTypes.SELECT }
  );

  res.send(questaoInserida);
}));

routes.put('/:codigoQuestao', [auth, isProfessor], wrapAsync(async (req, res) => {
  const { codigoQuestao } = req.params;
  const { enunciado, resposta_correta, alternativas } = req.body;
  const { tabela, opcoesAlternativas } = req.orm;

  const questaoAtual = await req.orm.query(
    `SELECT * FROM ${tabela.questoes}
    WHERE codigo_questao = ${codigoQuestao}`,
    { type: req.orm.QueryTypes.SELECT }
  );
  
  const novoEnunciado = (typeof enunciado === 'undefined') ? questaoAtual[0].enunciado : enunciado;
  const novaResposta = (typeof resposta_correta === 'undefined') ? questaoAtual[0].resposta_correta : resposta_correta;

  let questaoAtualizada = await req.orm.query(
    `UPDATE ${tabela.questoes}
    SET enunciado = '${novoEnunciado}',
    resposta_correta = '${novaResposta}'
    WHERE codigo_questao = ${codigoQuestao}`,
    { type: req.orm.QueryTypes.UPDATE }
  );

  questaoAtualizada = await req.orm.query(
    `SELECT * FROM ${tabela.questoes}
    WHERE codigo_questao = ${codigoQuestao}`,
    { type: req.orm.QueryTypes.SELECT }
  );

  alternativas.forEach((alternativa, index) => {
    req.orm.query(
      `UPDATE ${tabela.alternativas}
      SET descricao = '${alternativa}'
      WHERE codigo_questao=${codigoQuestao} AND alternativa=${opcoesAlternativas[index]}`,
      { type: req.orm.QueryTypes.UPDATE }
    );
  });
  

  res.send(questaoAtualizada);
}));

routes.delete('/:codigoQuestao', [auth, isProfessor], wrapAsync(async (req, res) => {
  const { codigoQuestao } = req.params;
  const { tabela } = req.orm;

  const questao = await req.orm.query(
    `SELECT * FROM ${tabela.questoes}
    WHERE codigo_questao = ${codigoQuestao}`,
    { type: req.orm.QueryTypes.SELECT }
  );
  
  const questaoDeletada = await req.orm.query(
    `DELETE FROM ${tabela.questoes}
    WHERE codigo_questao = ${codigoQuestao}`,
    { type: req.orm.QueryTypes.DELETE }
  );

  res.send(questao);
}));

export default routes;