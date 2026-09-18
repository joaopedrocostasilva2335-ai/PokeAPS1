// Endereço da API que vamos usar
const URL_LISTA = "https://pokeapi.co/api/v2/pokemon?limit=20";

// Pegando os elementos da página que vamos usar várias vezes
const listaPokemons = document.getElementById("lista-pokemons");
const mensagemErro = document.getElementById("mensagem-erro");

const modal = document.getElementById("modal");
const modalNome = document.getElementById("modal-nome");
const modalImagem = document.getElementById("modal-imagem");
const btnFechar = document.getElementById("btn-fechar");

// Assim que a página carregar, já buscamos a lista de pokémons
buscarListaPokemons();

// 1) Função que busca a lista de pokémons na API
async function buscarListaPokemons() {
  try {
    const resposta = await fetch(URL_LISTA);

    // Se a resposta não for "ok" (ex: erro 404, 500...), avisamos o erro
    if (!resposta.ok) {
      throw new Error("Não foi possível carregar a lista de pokémons.");
    }

    const dados = await resposta.json();
    mostrarListaNaTela(dados.results);

  } catch (erro) {
    mostrarErro("Ocorreu um erro ao buscar os pokémons. Tente novamente mais tarde.");
    console.error(erro);
  }
}

// 2) Função que mostra a lista de nomes na tela
function mostrarListaNaTela(pokemons) {
  listaPokemons.innerHTML = ""; // limpa a lista antes de preencher

  pokemons.forEach(function (pokemon) {
    const item = document.createElement("li");
    item.textContent = pokemon.name;

    // Quando o usuário clicar no nome, buscamos os detalhes desse pokémon
    item.addEventListener("click", function () {
      buscarDetalhesPokemon(pokemon.url);
    });

    listaPokemons.appendChild(item);
  });
}

// 3) Função que busca os detalhes de um pokémon específico
async function buscarDetalhesPokemon(urlDoPokemon) {
  try {
    const resposta = await fetch(urlDoPokemon);

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os detalhes do pokémon.");
    }

    const dados = await resposta.json();
    abrirModal(dados);

  } catch (erro) {
    mostrarErro("Não foi possível carregar os detalhes deste pokémon.");
    console.error(erro);
  }
}

// 4) Função que abre o modal com o nome e a imagem do pokémon
function abrirModal(pokemon) {
  modalNome.textContent = pokemon.name;
  modalImagem.src = pokemon.sprites.other["official-artwork"].front_default;

  modal.classList.remove("escondido");
}

// 5) Função que fecha o modal ao clicar no botão "Fechar"
btnFechar.addEventListener("click", function () {
  modal.classList.add("escondido");
});

// 6) Função que exibe uma mensagem de erro amigável na tela
function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.classList.remove("escondido");
}
