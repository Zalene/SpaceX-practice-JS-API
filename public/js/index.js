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
        <div class="card">
          <a href="${dragon.wikipedia}">
            <div class="card-image"><img src="${dragon.flickr_images[2]}" alt="${dragon.name}" /></div>

            <div class="card-body">
              <div class="card-date">
                <time>${dragon.first_flight}</time>
              </div>

              <div class="card-title">
                <h3>${dragon.name}</h3>
              </div>

              <div class="card-excerpt">
                <p>${dragon.description}</p>
              </div>
            </div>
          </a>
        </div>
        `
      )).join('')
  );
};

showDragons();

searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showDragons();
})