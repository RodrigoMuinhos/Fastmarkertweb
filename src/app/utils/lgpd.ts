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
 * Mantém apenas dígitos (0-9).
 */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Formata CPF conforme digitação: 000.000.000-00
 */
export function formatCpfInput(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Formata telefone conforme digitação:
 * - 10 dígitos: (00) 0000-0000
 * - 11 dígitos: (00) 00000-0000
 */
export function formatPhoneInput(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length < 3) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  // Ainda digitando o restante
  if (rest.length <= 4) {
    return `(${ddd}) ${rest}`;
  }

  // Fixo (10 dígitos no total): 8 após DDD
  if (digits.length <= 10) {
    const first = rest.slice(0, 4);
    const last = rest.slice(4, 8);
    return last ? `(${ddd}) ${first}-${last}` : `(${ddd}) ${first}`;
  }

  // Celular (11 dígitos no total): 9 após DDD
  const first = rest.slice(0, 5);
  const last = rest.slice(5, 9);
  return last ? `(${ddd}) ${first}-${last}` : `(${ddd}) ${first}`;
}

/**
 * Valida CPF (dígitos verificadores).
 */
export function validateCpf(value: string): boolean {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split('').map((c) => Number(c));
  if (digits.some((n) => Number.isNaN(n))) return false;

  const calcCheck = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += digits[i] * (length + 1 - i);
    }
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };

  const d1 = calcCheck(9);
  const d2 = calcCheck(10);

  return d1 === digits[9] && d2 === digits[10];
}

/**
 * Campo único "CPF ou Telefone": tenta aplicar uma máscara razoável.
 * Obs.: CPF (11) e telefone (10/11) podem ser ambíguos; aqui usamos uma heurística simples.
 */
export function formatCpfOrPhoneInput(value: string): string {
  const digits = onlyDigits(value);

  if (digits.length <= 9) return digits;

  // 10 dígitos: muito provavelmente telefone
  if (digits.length === 10) return formatPhoneInput(digits);

  // 11 dígitos: se o 3º dígito (após DDD) for 9, tende a ser celular
  if (digits.length === 11 && digits[2] === '9') return formatPhoneInput(digits);

  return formatCpfInput(digits);
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
