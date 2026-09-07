// API.JS
// Manipulação de dados - API

const API_URL = "http://localhost:3000";

async function listarClientes() {
  const resposta = await fetch(`${API_URL}/clientes`);
  return resposta.json();
}

async function buscarClientes() {
  try {
    return await listarClientes();
  } catch (error) {
    alert("Houve um erro. Por favor, tente novamente.");
  }
}

async function obterClientePeloId(id) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`);
  return resposta.json();
}

async function criarCliente(cliente) {
  const resposta = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  return resposta.json();
}

async function salvarCliente(cliente) {
  try {
    await criarCliente(cliente);
  } catch (error) {
    alert("Erro ao cadastrar o cliente");
  }
}

async function atualizarCliente(id, cliente) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  return resposta.json();
}

async function excluirCliente(id) {
  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE",
  });
  return resposta.json();
}
