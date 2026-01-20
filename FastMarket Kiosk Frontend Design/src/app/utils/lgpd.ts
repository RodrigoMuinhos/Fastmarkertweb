/**
 * Utilitários LGPD para mascarar dados sensíveis
 * Lei Geral de Proteção de Dados Pessoais
 */

/**
 * Mascara CPF exibindo apenas os dígitos do meio
 * @param cpf - CPF completo (com ou sem formatação)
 * @returns CPF mascarado no formato ***.456.789-**
 * @example maskCpf('12345678900') // retorna '***.456.789-**'
 */
export function maskCpf(cpf: string): string {
  const numbers = cpf.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return `***.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-**`;
  }
  
  return cpf;
}

/**
 * Mascara telefone exibindo apenas DDD e últimos 4 dígitos
 * @param phone - Telefone completo (com ou sem formatação)
 * @returns Telefone mascarado no formato (85) ****-4989
 * @example maskPhone('85997254989') // retorna '(85) ****-4989'
 */
export function maskPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    // Celular: (85) ****-4989
    return `(${numbers.slice(0, 2)}) ****-${numbers.slice(7, 11)}`;
  } else if (numbers.length === 10) {
    // Fixo: (85) ****-4989
    return `(${numbers.slice(0, 2)}) ****-${numbers.slice(6, 10)}`;
  }
  
  return phone;
}

/**
 * Mascara email exibindo apenas primeira letra e domínio
 * @param email - Email completo
 * @returns Email mascarado no formato r****@email.com
 * @example maskEmail('rodrigo@email.com') // retorna 'r****@email.com'
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  
  if (!username || !domain) {
    return email;
  }
  
  const firstLetter = username.charAt(0);
  return `${firstLetter}****@${domain}`;
}
