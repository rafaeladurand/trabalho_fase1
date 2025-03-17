const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;