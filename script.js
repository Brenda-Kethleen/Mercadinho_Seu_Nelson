//LOGIN
// Função para logar
function logar() {
  var login = document.getElementById("login").value;
  var senha = document.getElementById("password").value;

  if (login === "Nelson" && senha === "123456") {
    alert("Login bem-sucedido! Redirecionando para a página adm.");
    window.location.href = "trabalho_adm.html"; // Redireciona para a página adm após o login bem-sucedido
  } else {
    alert("Login ou senha incorretos. Por favor, tente novamente.");
  }
}

//CARRINHO ----------------------------------------------------------------------------------
// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(produto + " foi adicionado ao carrinho!");
}

// Lista de preços dos produtos
let precos = {
  'Alface': 2.50,
  'Banana': 1.20,
  'Tomate': 1.00,
  'Pão': 2.00
};

// Função para carregar o carrinho e calcular o total
function carregarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let contagem = {};
  let total = 0;

  // Contar a quantidade de cada produto no carrinho
  carrinho.forEach(item => {
    if (typeof item === 'string') {
      if (contagem[item]) {
        contagem[item]++;
      } else {
        contagem[item] = 1;
      }
    }
  });

  let listaCarrinho = document.getElementById('listaCarrinho');
  listaCarrinho.innerHTML = '';

  // Exibir cada produto com sua quantidade e preço
  for (let produto in contagem) {
    let tr = document.createElement('tr');

    let tdProduto = document.createElement('td');
    tdProduto.textContent = produto;
    tr.appendChild(tdProduto);

    let tdQuantidade = document.createElement('td');
    tdQuantidade.textContent = contagem[produto];
    tr.appendChild(tdQuantidade);

    let tdPreco = document.createElement('td');
    let precoProduto = contagem[produto] * precos[produto];
    tdPreco.textContent = 'R$ ' + precoProduto.toFixed(2);
    tr.appendChild(tdPreco);

    let tdAcoes = document.createElement('td');
    let btnDiminuir = document.createElement('button');
    btnDiminuir.textContent = '-';
    btnDiminuir.className = 'btn btn-warning btn-sm';
    btnDiminuir.onclick = () => diminuirQuantidade(produto);
    tdAcoes.appendChild(btnDiminuir);

    let btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'btn btn-danger btn-sm';
    btnRemover.onclick = () => removerProduto(produto);
    tdAcoes.appendChild(btnRemover);

    tr.appendChild(tdAcoes);

    listaCarrinho.appendChild(tr);

    total += precoProduto; // Adicionar o preço do produto ao total
  }

  // Atualizar o valor total do carrinho
  document.getElementById('totalCarrinho').textContent = total.toFixed(2);
}

// Função para diminuir a quantidade de um produto no carrinho
function diminuirQuantidade(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let index = carrinho.indexOf(produto);
  if (index !== -1) {
    carrinho.splice(index, 1); // Remove uma unidade do produto
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
  }
}

// Função para remover um produto do carrinho
function removerProduto(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinho.filter(item => item !== produto); // Remove todas as unidades do produto
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
  var endereco = prompt("Informe o endereço de entrega:");
  var pagamento = prompt("Para finalizar a compra, por favor, insira os detalhes do pagamento:\n\nPIX: 44999430443\n\nNúmero do Cartão:\nData de Validade (MM/AA):\nCVV:");

  if (endereco) {
    alert("Compra finalizada! O pagamento foi realizado com sucesso.\n\nDetalhes do pagamento:\n" + pagamento);
    
    // Limpar o carrinho
    localStorage.removeItem('carrinho');
    carregarCarrinho();
  } else {
    alert("Compra cancelada.");
  }
}

// Carregar o carrinho ao carregar a página
window.onload = carregarCarrinho;
