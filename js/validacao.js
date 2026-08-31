//idenifica as cariáveis que serão usadas no projeto
const paginaFormulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoCpf = document.querySelector("#cpf");
const campoEmail = document.querySelector("#email");
const botaoAdiciona = document.querySelector("#btn-adiciona");

//variável para dados persistentes no navegador
let clientes = buscarClientesLS();

//captura o evento do botão - inicia tudo
paginaFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (validaNome()) {
        const clienteFormulario = {
            id: crypto.randomUUID(),
            nome: campoNome.value.trim(),
            cpf: campoCpf.value.trim(),
            email: campoEmail.value.trim()
        };
        salvaClienteLS(clienteFormulario);
        atualizaTabela();
    };
});

function salvaClienteLS(clienteFormulario) {
    const clientesLS = buscarClientesLS(); //busca lista atual
    clientesLS.push(clienteFormulario); //adiciona novo cliente
    localStorage.setItem(
        "CLIENTES",
        JSON.stringify(clientesLS)
    );
};

function buscarClientesLS() {
    return JSON.parse(localStorage.getItem("CLIENTES") || "[]");
};

//procedimenos para validar o nome
const validaNome = () => {
    const nome = campoNome.value.trim();
    if (nome.length < 3) {
        console.log("nome 3 caracteres");
        return false;
    }
    return true;
};

function atualizaTabela() {
    const tabela = document.querySelector("#tabela-clientes");
    tabela.innerHTML = ""; // limpa antes

    const clientes = buscarClientesLS();
    clientes.forEach((cliente) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.email}</td>
        `;
        tabela.appendChild(tr);
    });
}
