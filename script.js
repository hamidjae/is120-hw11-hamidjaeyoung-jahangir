const API_URL = "https://dragonball-api.com/api/characters?limit=58";
// Making a nice constant so I don't have to paste the API everywhere

const favoritesSection = document.querySelector("#favorites-section");
const favoritesContainer = document.querySelector("#favorites-container");
const charactersContainer = document.querySelector("#characters-container");
const characterCount = document.querySelector("#character-count");

let characters = [];
let favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

async function fetchCharacters() {
  const response = await fetch(API_URL);
  const data = await response.json();
  characters = data.items || [];
  characterCount.textContent = characters.length + " loaded";
  renderAllSections();
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favoriteIds));
}

function toggleFavorite(id) {
  if (favoriteIds.includes(id)) {
    favoriteIds = favoriteIds.filter(function (favoriteId) {
      return favoriteId !== id;
    });
  } else {
    favoriteIds.push(id);
  }
  saveFavorites();
  renderAllSections();
}

function createCard(character) {
  const isFavorite = favoriteIds.includes(character.id);

  const card = document.createElement("article");
  card.className = "card";
  let buttonText = "Favorite";
  let buttonClass = "not-saved";

  if (isFavorite) {
    buttonText = "Saved";
    buttonClass = "saved";
  } else {
    buttonText = "Favorite";
    buttonClass = "not-saved";
  }

  card.innerHTML = `
    <div class="card-image">
      <img src="${character.image}" alt="${character.name}">
    </div>

    <div class="card-content">
      <div class="card-header">
        <div>
          <h3>${character.name}</h3>
          <p class="card-subtext">${character.race || "Unknown race"}</p>
        </div>

        <button class="favorite-button ${buttonClass}">
          ${buttonText}
        </button>
      </div>

      <div class="card-details">
        <p><strong>Ki:</strong> ${character.ki || "Unknown"}</p>
        <p><strong>Gender:</strong> ${character.gender || "Unknown"}</p>
        <p><strong>Affiliation:</strong> ${character.affiliation || "Unknown"}</p>
      </div>

      <p class="card-description">
        ${character.description || "No description available."}
      </p>
    </div>
  `;

  const button = card.querySelector(".favorite-button");

  button.addEventListener("click", function () {
    toggleFavorite(character.id);
  });

  return card;
}

function renderCharacters(container, list) {
  container.innerHTML = "";

  list.forEach(function (character) {
    const card = createCard(character);
    container.appendChild(card);
  });
}

function renderFavorites() {
  const favoriteCharacters = characters.filter(function (character) {
    return favoriteIds.includes(character.id);
  });

  if (favoriteCharacters.length === 0) {
    favoritesSection.classList.add("hidden");
    favoritesContainer.innerHTML = "";
  } else {
    favoritesSection.classList.remove("hidden");
    renderCharacters(favoritesContainer, favoriteCharacters);
  }
}

function renderAllCharacters() {
  renderCharacters(charactersContainer, characters);
}

function renderAllSections() {
  renderFavorites();
  renderAllCharacters();
}

fetchCharacters();
