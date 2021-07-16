const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let capsules;
let searchTerm = '';

// API REQUEST
const fetchCapsules = async() => {
  capsules = await fetch (
    'https://api.spacexdata.com/v3/capsules'
  ).then(res =>
    res.json())
};

const showCapsules = async() => {
  await fetchCapsules();

  results.innerHTML = (
    capsules
      .filter(capsule => capsule.capsule_serial.toLowerCase().includes(searchTerm.toLowerCase()
      ))
      .map(capsule => (
        `
          <li>
            <h3>${capsule.capsule_serial}</h3>
            <h4>${capsule.capsule_id}</h4>
            <h4>${capsule.status}</h4>
            <h5>${capsule.original_launch}</h5>
            <h5>${capsule.mission}</h5>
            <h5>${capsule.landings}</h5>
            <h5>${capsule.type}</h5>
            <h5>${capsule.reuse_count}</h5>
          </li>
        `
      )).join('')
  );
};

showCapsules();

searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showCapsules();
})