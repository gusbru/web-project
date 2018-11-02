export default (req, res, next) => {
	// 401 Unauthorized
	// 403 Forbidden 
	
	if (!req.user.isProfessor) return res.status(403).send('Acesso negado');
	next();
};