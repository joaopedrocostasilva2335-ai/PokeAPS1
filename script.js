const URL_LISTA = "https://pokeapi.co/api/v2/pokemon?limit=20";

const listaPokemons = document.getElementById("lista-pokemons");
const mensagemErro = document.getElementById("mensagem-erro");
const campoPesquisa = document.getElementById("campo-pesquisa");

const modal = document.getElementById("modal");
const modalNome = document.getElementById("modal-nome");
const modalImagem = document.getElementById("modal-imagem");
const modalAltura = document.getElementById("modal-altura");
const modalPeso = document.getElementById("modal-peso");
const modalTipos = document.getElementById("modal-tipos");
const btnFechar = document.getElementById("btn-fechar");

let todosOsPokemons = [];

buscarListaPokemons();

async function buscarListaPokemons() {
  try {
    const resposta = await fetch(URL_LISTA);

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar a lista de pokémons.");
    }

    const dados = await resposta.json();
    todosOsPokemons = dados.results; // guarda a lista completa para pesquisa
    mostrarListaNaTela(todosOsPokemons);

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

campoPesquisa.addEventListener("input", function () {
  const textoDigitado = campoPesquisa.value.toLowerCase();

  const pokemonsFiltrados = todosOsPokemons.filter(function (pokemon) {
    return pokemon.name.toLowerCase().includes(textoDigitado);
  });

  mostrarListaNaTela(pokemonsFiltrados);
});

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

  modalAltura.textContent = (pokemon.height / 10).toFixed(1);
  modalPeso.textContent = (pokemon.weight / 10).toFixed(1);

  const nomesDosTipos = pokemon.types.map(function (item) {
    return item.type.name;
  });
  modalTipos.textContent = nomesDosTipos.join(", ");

  modal.classList.remove("escondido");
}

btnFechar.addEventListener("click", function () {
  modal.classList.add("escondido");
});

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.classList.remove("escondido");
}
