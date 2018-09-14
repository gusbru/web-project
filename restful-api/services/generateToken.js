import jwt from 'jsonwebtoken';

export default (login) => (jwt.sign({ _id: login }, 'privateKey'));