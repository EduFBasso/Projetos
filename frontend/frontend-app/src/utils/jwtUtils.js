// utils/jwtUtils.js

// Valida se o token JWT ainda está dentro do prazo de validade
export const isTokenValid = (token) => {
  if (!token || token === 'undefined') return false;

  try {
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000); // tempo atual (em segundos)
    return payload.exp > now;
  } catch (error) {
    console.error('❌ Erro ao decodificar o token JWT:', error);
    return false;
  }
};