var produtos = [
    { nome: "Alface (100g)", preco: 2.50, imagem: "ALFACE.jpg" },
    { nome: "Banana (100g)", preco: 1.20, imagem: "BANANA.jpg" },
    { nome: "Pão (100g)", preco: 2.00, imagem: "PÃO.jpg" },
    { nome: "Tomate (100g)", preco: 1.00, imagem: "TOMATE.jpg" }
];

var produtoAtual = null;

function exibirProdutos() {
    var listaProdutosHTML = '';
    for (var i = 0; i < produtos.length; i++) {
        listaProdutosHTML += '<div class="card mb-3">';
        listaProdutosHTML += '<div class="row no-gutters">';
        listaProdutosHTML += '<div class="col-md-4">';
        listaProdutosHTML += '<img src="' + produtos[i].imagem + '" class="card-img" alt="' + produtos[i].nome + '">';
        listaProdutosHTML += '</div>';
        listaProdutosHTML += '<div class="col-md-8">';
        listaProdutosHTML += '<div class="card-body">';
        listaProdutosHTML += '<h5 class="card-title">' + produtos[i].nome + '</h5>';
        listaProdutosHTML += '<p class="card-text">Preço: R$ ' + produtos[i].preco.toFixed(2) + '</p>';
        listaProdutosHTML += '<button class="btn btn-warning" onclick="mostrarEditarProduto(' + i + ')">Editar</button>';
        listaProdutosHTML += '<button class="btn btn-danger" onclick="excluirProduto(' + i + ')">Excluir</button>';
        listaProdutosHTML += '</div>';
        listaProdutosHTML += '</div>';
        listaProdutosHTML += '</div>';
        listaProdutosHTML += '</div>';
    }
    document.getElementById("listaProdutos").innerHTML = listaProdutosHTML;
    document.getElementById("listaProdutos").style.display = "block";
    document.getElementById("formEditarProduto").style.display = "none";
    document.getElementById("formAdicionarProduto").style.display = "none";
}

function mostrarEditarProduto(index) {
    produtoAtual = index;
    document.getElementById("editarNome").value = produtos[index].nome;
    document.getElementById("editarPreco").value = produtos[index].preco;
    document.getElementById("editarImagem").value = produtos[index].imagem;
    document.getElementById("listaProdutos").style.display = "none";
    document.getElementById("formEditarProduto").style.display = "block";
}

document.getElementById("editarProdutoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    produtos[produtoAtual].nome = document.getElementById("editarNome").value;
    produtos[produtoAtual].preco = parseFloat(document.getElementById("editarPreco").value);
    produtos[produtoAtual].imagem = document.getElementById("editarImagem").value;
    exibirProdutos();
});

function adicionarNovoProduto() {
    document.getElementById("listaProdutos").style.display = "none";
    document.getElementById("formEditarProduto").style.display = "none";
    document.getElementById("formAdicionarProduto").style.display = "block";
}

document.getElementById("adicionarProdutoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var novoProduto = {
        nome: document.getElementById("novoNome").value,
        preco: parseFloat(document.getElementById("novoPreco").value),
        imagem: document.getElementById("novoImagem").value
    };
    produtos.push(novoProduto);
    exibirProdutos();
});

// Função para excluir um produto
function excluirProduto(index) {
    produtos.splice(index, 1); // Remove o produto da lista de produtos
    exibirProdutos(); // Atualiza a exibição dos produtos na página
}

exibirProdutos();
