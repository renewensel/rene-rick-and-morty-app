console.clear();
import { createCharacterCard } from "./components/card/card.js";
import { prevNextPagination } from "./components/nav-pagination/nav-pagination.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const card = document.querySelector('[data-js="card"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
const searchQuery = "";
let nothingFound = "";
// let { name, status, type, episodes } = characters;

// Fetch
const baseURL = "https://rickandmortyapi.com/api/character/";
let customURL = baseURL;
let data = null; // Define a variable to store the data

export async function fetchData() {
  try {
    const response = await fetch(baseURL);
    if (response.ok) {
      // Success (Good Response)
      data = await response.json(); // Assign data to the external variable
      console.log(data.results);
      console.log(maxPage);
      createSomeCard();
      if (page <= 1) {
        prevButton.classList.add("hidden");
        console.log("hide");
      }
      pagination.textContent = `${page} / ${maxPage}`;
    } else {
      // Failure (Bad Response)
      console.error("Bad Response");
    }
  } catch (error) {
    // Failure (Network error, etc)
    console.error("An Error occurred", error);
  }
}

// Call the function to fetch data
await fetchData();
// console.log(data.results);

// function pagination

// function create a card
function createSomeCard() {
  console.log("Hello from createSomeCard Function!!!");
  data.results.forEach((character) => {
    cardContainer.insertAdjacentHTML(
      "beforeend",
      createCharacterCard(
        character.image,
        character.name,
        character.type,
        character.status,
        character.episode.length
      )
    );
  });
}

// pagination eventlisteners
nextButton.addEventListener("click", (customURL) => {
  console.log("clicked next");
  if (page === 42) {
    prevButton.classList.add("hidden");
    console.log("hide");
    page++;
    pagination.textContent = `${page} / ${maxPage}`;
  } else {
    prevButton.classList.remove("hidden");
    page++;
    pagination.textContent = `${page} / ${maxPage}`;
  }

  customURL = customURL + `?page=${page}`;
  createSomeCard(customURL);
  console.log(customURL);

  customURL = baseURL + `?page=${page}`;
  console.log(page);
  cardContainer.innerHTML = "";
  prevNextPagination(customURL);
  // fetch new data from nth site
  // run forEach for the new Data
});

prevButton.addEventListener("click", (customURL) => {
  console.log("clicked next");
  if (page <= 1) {
    prevButton.classList.add("hidden");
    console.log("hide");
    page--;
    pagination.textContent = `${page} / ${maxPage}`;
  } else {
    prevButton.classList.remove("hidden");
    page--;
    pagination.textContent = `${page} / ${maxPage}`;
  }

  // if page is less than 0 do nothing or grey out button completly
  customURL = baseURL + `?page=${page}`;
  console.log(page);
  prevNextPagination(customURL);
});
