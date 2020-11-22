const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


export function registerSearchListener(listener) {
    searchButton.addEventListener('click', () => listener(searchInput.value));
}


