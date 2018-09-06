export default app => (
	(req, res, next) => {
		req.orm = app.orm;
		next();
	}
);