// src/middleware/auth.js (NOVO ARQUIVO)

const jwt = require('jsonwebtoken');

// A função de middleware que verifica o Token JWT
const verifyToken = (req, res, next) => {
  // 1. Obter o cabeçalho de autorização (ex: 'Bearer TOKEN_AQUI')
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    // Se não houver cabeçalho, nega o acesso
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  // 2. Extrair o token (ignorar 'Bearer ')
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verificar e decodificar o token
    const decoded = jwt.verify(token, 'SEGREDO_MUITO_SEGURO'); 
    
    // Anexa o payload (ID do utilizador, role) ao objeto de requisição
    req.user = decoded; 
    
    // Continua para a próxima função (o controller)
    next(); 
  } catch (err) {
    // Se a verificação falhar (token expirado, inválido)
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

// Exportar a função para ser usada como middleware
module.exports = { verifyToken };
// Note: o seu ficheiro auth.js não precisa de mudar