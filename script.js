
const URL_LISTA = "https://pokeapi.co/api/v2/pokemon?limit=20";

const listaPokemons = document.getElementById("lista-pokemons");
const mensagemErro = document.getElementById("mensagem-erro");

const modal = document.getElementById("modal");
const modalNome = document.getElementById("modal-nome");
const modalImagem = document.getElementById("modal-imagem");
const btnFechar = document.getElementById("btn-fechar");

buscarListaPokemons();

async function buscarListaPokemons() {
  try {
    const resposta = await fetch(URL_LISTA);

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

function mostrarListaNaTela(pokemons) {
  listaPokemons.innerHTML = ""; // limpa a lista antes de preencher

  pokemons.forEach(function (pokemon) {
    const item = document.createElement("li");
    item.textContent = pokemon.name;

    item.addEventListener("click", function () {
      buscarDetalhesPokemon(pokemon.url);
    });

    listaPokemons.appendChild(item);
  });
}

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

function abrirModal(pokemon) {
  modalNome.textContent = pokemon.name;
  modalImagem.src = pokemon.sprites.other["official-artwork"].front_default;

  modal.classList.remove("escondido");
}

btnFechar.addEventListener("click", function () {
  modal.classList.add("escondido");
});

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.classList.remove("escondido");
}
