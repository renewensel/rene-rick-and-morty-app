console.clear();
import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";
let nothingFound = "";
// let { name, status, type, episodes } = characters;

// Fetch
const baseURL = "https://rickandmortyapi.com/api/character";
let data = null; // Define a variable to store the data

export async function fetchData() {
  try {
    const response = await fetch(baseURL);
    if (response.ok) {
      // Success (Good Response)
      data = await response.json(); // Assign data to the external variable
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
        // need to pass the arguments
        // append new Card to cardContainer
      });
    } else {
      // Failure (Bad Response)
      console.error("Bad Response");
    }
  } catch (error) {
    // Failure (Network error, etc)
    console.error("An Error occurred");
  }
}

// Call the function to fetch data
await fetchData();
console.log(data.results);
