import jwt from 'jsonwebtoken';
// import config from 'config';

export default (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) res.status(401).send('Acesso negado. Sem token.');
  
	try {
		const decoded = jwt.verify(token, 'privateKey');
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send('Token invalido');
	}
};