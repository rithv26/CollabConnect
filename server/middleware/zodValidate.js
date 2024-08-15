const zodValidate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.errors });
  }
};

const zodValidatePut = (schema) => (req, res, next) => {
  try {
    const { auth0Id } = req.params;
    schema.parse({...req.body, auth0Id});
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.errors });
  }
};

module.exports = {zodValidate, zodValidatePut}
