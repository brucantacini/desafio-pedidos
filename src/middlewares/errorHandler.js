/**
 * Middleware global de tratamento de erros
 */
function errorHandler(err, req, res, next) {
  console.error('Erro:', err);

  // Erros de validação do Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: messages,
    });
  }

  // Duplicata (unique index)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Já existe um registro com esse identificador',
    });
  }

  // JSON inválido no body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido no corpo da requisição',
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
}

module.exports = errorHandler;
