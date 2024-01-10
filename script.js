let pokemon = [];
const selectGenContainer = document.createElement("div");
selectGenContainer.id = "selectGenContainer";
document.body.appendChild(selectGenContainer);
const selectText = document.createElement("div");
selectText.textContent = "Select the pokemon generation you want to view:";
selectGenContainer.appendChild(selectText);
const selectGen = document.createElement("select");
const option1 = document.createElement("option");
option1.value = "first";
option1.innerText = "First";
selectGen.appendChild(option1);
const option2 = document.createElement("option");
option2.value = "second";
option2.innerText = "Second";
selectGen.appendChild(option2);
const option3 = document.createElement("option");
option3.value = "third";
option3.innerText = "Third";
selectGen.appendChild(option3);
const option4 = document.createElement("option");
option4.value = "fourth";
option4.innerText = "Fourth";
const optionAll = document.createElement("option");
selectGen.appendChild(option4);
optionAll.value = "all";
optionAll.innerText = "All!";
selectGen.appendChild(optionAll);
selectGenContainer.appendChild(selectGen);
const searchContainer = document.createElement("div");
searchContainer.id = "searchContainer";
document.body.appendChild(searchContainer);
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.id = "searchBar";
searchBar.placeholder = 'Es."charizard"...';
searchContainer.appendChild(searchBar);
const searchButton = document.createElement("button");
searchButton.innerText = "Search";
searchButton.classList.add("buttons");
searchContainer.appendChild(searchButton);
const resetSearhButton = document.createElement("button");
resetSearhButton.innerText = "Reset search";
resetSearhButton.classList.add("buttons");
searchContainer.appendChild(resetSearhButton);
const darkModeButton = document.createElement("button");
darkModeButton.innerText = "Dark Mode";
darkModeButton.classList.add("buttons");
searchContainer.appendChild(darkModeButton);
const pokeContainer = document.createElement("div");
pokeContainer.id = "container";
document.body.appendChild(pokeContainer);

const fetchData = async (genNum) => {
    try{
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${genNum}&offset=0`);
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
                }else if(types.includes("electric")){
                    pokeTypes.classList.add("electricType");
                }else if(types.includes("psychic")){
                    pokeTypes.classList.add("psychicType");
                }else if(types.includes("dragon")){
                    pokeTypes.classList.add("dragonType");
                }else if(types.includes("bug")){
                    pokeTypes.classList.add("bugType");
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
    darkModeButton.innerText === "Light mode" ? darkModeButton.innerText = "Dark mode" : darkModeButton.innerText = "Light mode";
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

const runApp = async (gen) => {
    try{
        await fetchData(gen);
        await createList();
    }catch(error){
        console.error(error);
    }
}

runApp(151);

selectGen.addEventListener("change", e => {
    if(e.target.value === "first"){
        pokeContainer.innerHTML = ""
        runApp(151);
    }else if(e.target.value === "second"){
        pokeContainer.innerHTML = "";
        runApp(251);
    }else if(e.target.value === "third"){
        pokeContainer.innerHTML = "";
        runApp(386);
    }else if(e.target.value === "fourth"){
        pokeContainer.innerHTML = "";
        runApp(493);
    }else if(e.target.value === "all"){
        pokeContainer.innerHTML = "";
        runApp(898);
    }
    
})
