export function rulesEmail(value) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Email inválido.";
}

export function rulesRequired(value, adminCanPass) {
  if (adminCanPass) return true;
  return !!value || "Obrigatório.";
}

export function rulesZeroValidation(value) {
  return Number(value) !== 0 || "A quantidade de itens não pode ser 0";
}

export function rulesOnlyNumbers(value) {
  const pattern = /^[0-9]*$/;
  return pattern.test(value) || "Insira apenas números positivos.";
}

export function validatePassword(value) {
  if (value.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }
  if (!/[A-Z]/.test(value)) {
    return "A senha deve ter pelo menos uma letra maiúscula.";
  }
  if (!/[a-z]/.test(value)) {
    return "A senha deve ter pelo menos uma letra minúscula.";
  }
  return true;
}

export function matchPasswords(password, confirmPassword) {
  return password === confirmPassword || "As senhas não coincidem.";
}

export function maxCharLength(maxChart) {
  return (value) => {
    return (
      value.length <= maxChart || `O número máximo de caracteres é ${maxChart}.`
    );
  };
}

export function noNumbersOrSymbols(value) {
  if (!value) return true;
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(value) || "O nome não pode conter números ou símbolos";
}
