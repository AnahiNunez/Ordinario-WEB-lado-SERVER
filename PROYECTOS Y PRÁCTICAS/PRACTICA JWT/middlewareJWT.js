// middlewareJWT.js
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ mensaje: 'Token no proporcionado' });

  jwt.verify(token, 'secreto_jwt', (err, decoded) => {
    if (err)
      return res.status(401).json({ mensaje: 'Token inválido' });

    req.usuario = decoded;
    next();
  });
};

module.exports = verificarToken;
