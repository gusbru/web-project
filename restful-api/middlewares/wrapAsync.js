export default handler =>
  async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };