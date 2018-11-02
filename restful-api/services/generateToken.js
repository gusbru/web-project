import jwt from 'jsonwebtoken';

export default (login, isProfessor = false) => (jwt.sign({ _id: login, isProfessor: isProfessor }, 'privateKey'));