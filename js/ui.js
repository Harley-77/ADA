//UI.JS
//Traz as ações de manipulação promovidas pelo usuário

// Captura o evento do formulário
paginaFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (validaNome() && validaCpf() && validaEmail()) {
    const clienteFormulario = {
      nome: campoNome.value.trim(),
      cpf: campoCpf.value.trim(),
      email: campoEmail.value.trim()
    };

    if (paginaFormulario.dataset.id) {
      // edição
      await atualizarCliente(paginaFormulario.dataset.id, clienteFormulario);
      paginaFormulario.dataset.id = "";
    } else {
      // inclusão
      await salvarCliente(clienteFormulario);
    }

    resetarFormulario();
    carregaTabela();
  }
});

// Carrega a tabela
async function carregaTabela() {
  const clientes = await buscarClientes();
  tbody.innerHTML = "";
  clientes.forEach((cliente) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.innerText = cliente.nome;

    const tdCpf = document.createElement("td");
    tdCpf.innerText = cliente.cpf;

    const tdEmail = document.createElement("td");
    tdEmail.innerText = cliente.email;

    const tdAcoes = document.createElement("td");

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.innerText = "Editar";
    botaoEditar.dataset.acao = "editar";
    botaoEditar.dataset.id = cliente.id;
    botaoEditar.className = "btn btn-outline-primary me-2";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.innerText = "Excluir";
    botaoExcluir.dataset.acao = "excluir";
    botaoExcluir.dataset.id = cliente.id;
    botaoExcluir.className = "btn btn-outline-danger";

    tdAcoes.append(botaoEditar, botaoExcluir);
    tr.append(tdNome, tdCpf, tdEmail, tdAcoes);
    tbody.appendChild(tr);
  });
}

// Limpa o formulário
function resetarFormulario() {
  campoNome.value = "";
  campoCpf.value = "";
  campoEmail.value = "";
}

// Captura cliques nos botões da tabela
tbody.addEventListener("click", async (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const { acao, id } = botao.dataset;

  if (acao === "editar") {
    const cliente = await obterClientePeloId(id);
    campoNome.value = cliente.nome;
    campoEmail.value = cliente.email;
    campoCpf.value = cliente.cpf;
    paginaFormulario.dataset.id = cliente.id;
    return;
  }

  const resposta = confirm("Deseja mesmo excluir o cliente?");
  if (!resposta) return;

  try {
    await excluirCliente(id);
    await carregaTabela();
  } catch (error) {
    alert("Erro ao excluir o cliente");
  }
});

// Carrega a tabela ao abrir a página
carregaTabela();
