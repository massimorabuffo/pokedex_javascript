let pokemon = [];
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.id = "searchBar";
document.body.appendChild(searchBar);
const searchButton = document.createElement("button");
searchButton.innerText = "Search";
document.body.appendChild(searchButton);
const resetSearhButton = document.createElement("button");
resetSearhButton.innerText = "Reset search";
document.body.appendChild(resetSearhButton);
const darkModeButton = document.createElement("button");
darkModeButton.innerText = "Dark Mode";
document.body.appendChild(darkModeButton);
const pokeContainer = document.createElement("div");
pokeContainer.id = "container";
document.body.appendChild(pokeContainer);

const fetchData = async () => {
    try{
        const request = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
        const response = await request.json();
        pokemon = response.results;
    }catch(error){
        console.error(error);
    }
}

const createList = async () => {
    pokemon.map(el => {
        const pokeCard = document.createElement("div");
        pokeCard.classList.add("pokeCard");
        pokeCard.id = el.name;
        const pokeImg = document.createElement("img");
        pokeImg.classList.add("pokeImg");
        const pokeTypes = document.createElement("div");
        const pokeName = document.createElement("div");
        pokeName.classList.add("pokeName");
        const fetchDetails = async () => {
            try{
                const request = await fetch(el.url);
                const response = await request.json();
                // console.log(response);
                pokeImg.src = response.sprites.front_default;
                let types = "";
                response.types.map(el => {
                    types += el.type.name + " ";
                });
                pokeTypes.textContent = types;
                if(types.includes("fire")){
                    pokeTypes.classList.add("fireType");
                }else if(types.includes("grass")){
                    pokeTypes.classList.add("grassType");
                }else if(types.includes("water")){
                    pokeTypes.classList.add("waterType");
                }else if(types.includes("normal")){
                    pokeTypes.classList.add("normalType");
                }
            }catch(error){
                console.error(error);
            }
        }
        fetchDetails();
        pokeName.textContent = el.name;
        pokeCard.appendChild(pokeName);
        pokeCard.appendChild(pokeImg);
        pokeContainer.appendChild(pokeCard);
        let isHidden = true;
        pokeCard.addEventListener("click", e => {
            if(isHidden){
                pokeCard.appendChild(pokeTypes);
                isHidden = false;
            }else{
                pokeTypes.remove();
                isHidden = true;
            }
        })
    })
}

const toggleDarkMode = () => {
    document.querySelector("body").classList.toggle("darkModeBody");
    document.querySelectorAll(".pokeImg").forEach(el => {
        el.classList.toggle("darkModeImg");
    })
    document.querySelectorAll(".pokeName").forEach(el => {
        el.classList.toggle("darkModeName");
    })
}

darkModeButton.addEventListener("click", () => toggleDarkMode());

const showAllPokemon = () => {
    document.querySelectorAll(".pokeCard").forEach(el => {
        el.style.display = "block";
    })
}

const searchPokemon = () => {
    if(searchBar.value){
        let pokemonExist = false;
        document.querySelectorAll(".pokeCard").forEach(el => {
            if(el.id !== searchBar.value){
                el.style.display = "none";
            }else{
                pokemonExist = true;
            }
        })
        if(!pokemonExist){
            alert("Pokemon not found!");
        }
    }else{
        alert("Please, enter a Pokemon name!");
    }
}

searchButton.addEventListener("click", () => {
    showAllPokemon();
    searchPokemon();
})

searchBar.addEventListener("keypress", e => {
    if(e.key === "Enter"){
        showAllPokemon();
        searchPokemon();
    }
})

resetSearhButton.addEventListener("click", () => {
    showAllPokemon();
    searchBar.value = "";
})

const runApp = async () => {
    try{
        await fetchData();
        await createList();
    }catch(error){
        console.error(error);
    }
}

runApp();