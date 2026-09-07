// VALIDACAO.JS
// Procedimentos de validação

const validaNome = () => {
  const nome = campoNome.value.trim();
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (nome.length < 3 || !regex.test(nome)) {
    alert("Nome deve ter pelo menos 3 letras e não conter números.");
    return false;
  }
  return true;
};

const validaCpf = () => {
  const cpf = campoCpf.value.trim();
  const regex = /^\d{11}$/;
  if (!regex.test(cpf)) {
    alert("CPF deve conter exatamente 11 números.");
    return false;
  }
  return true;
};

const validaEmail = () => {
  const email = campoEmail.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    alert("Digite um e-mail válido.");
    return false;
  }
  return true;
};
