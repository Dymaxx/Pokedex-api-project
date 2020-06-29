const pokedex = document.getElementById("pokedex");
const pokeman = document.getElementsByClassName("pokeman")
console.log(pokedex);

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 800; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            img: data.sprites["front_default"],
            type: data.types.map((type) => type.type.name).join(", "),
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
  <li class="pokeman ${pokeman.type}">
    <img src="${pokeman.img}"/>
    <h2>${pokeman.name}</h2>
    <p>${pokeman.type}</p>
  </li>`
        )
        .join(" ");
    pokedex.innerHTML = pokemonHTMLString;
    pokeman.style.backgroundColor = HexMixer('#ccc', '#aaa', 50);
};

fetchPokemon();