const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let dragons;
let searchTerm = '';

// API REQUEST
const fetchDragons = async() => {
  dragons = await fetch (
    'https://api.spacexdata.com/v3/Dragons'
  ).then(res =>
    res.json())
};

const showDragons = async() => {
  await fetchDragons();

  results.innerHTML = (
    dragons
      .filter(dragon => dragon.name.toLowerCase().includes(searchTerm.toLowerCase()
      ))
      .map(dragon => (
        `
          <li>
            <p>${dragon.name}</p>
            <p>${dragon.dry_mass_kg}</p>
            <p>${dragon.first_flight}</p>
            <img src="${dragon.flickr_images[2]}" alt="${dragon.name}">
            <p>${dragon.wikipedia}</p>
            <p>${dragon.description}</p>
          </li>
        `
      )).join('')
  );
};

showDragons();

searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showDragons();
})