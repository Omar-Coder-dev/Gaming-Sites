window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("d-none");
  }, 1000);
});
const categoryList = ["mmorpg", "shooter", "strategy", "racing", "sports", "social", "fantasy", "fighting"];

function generateNavbar() {
  const menu = document.getElementById("categoryMenu");
  menu.innerHTML = categoryList.map((cat, i) => `
    <li class="nav-item">
      <a class="nav-link ${i === 0 ? 'active' : ''}" 
         href="#" 
         onclick="setActive(this); getGames('${cat}')">
         ${cat}
      </a>
    </li>
  `).join('');
}

function setActive(link) {
  document.querySelectorAll('#categoryMenu .nav-link').forEach(el => el.classList.remove('active'));
  link.classList.add('active');
}

async function getGames(category = "MMORPG") {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '611de349c8msh7dc79dd9ddecf1bp1843b6jsn0c373e862376',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  try {
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const response = await api.json();

const cardsHTML = response.map(game => `
  <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="card text-white" style="height: 300px; overflow: hidden; cursor: pointer;" onclick="openDetails(${game.id})">
      <img src="${game.thumbnail}" class="card-img-top h-100" alt="${game.title}">
      <div class="card-body p-2">
        <h6 class="card-title mb-1" style="font-size: 14px;">${game.title}</h6>
        <p class="card-text mb-1" style="font-size: 12px;">${game.short_description.slice(0, 60)}...</p>
        <div>
          <span class="badge bg-primary">${game.genre}</span>
          <span class="badge bg-secondary">${game.platform}</span>
        </div>
      </div>
    </div>
  </div>
`).join('');


    document.getElementById("games").innerHTML = cardsHTML;

  } catch (error) {
    console.error("Error fetching games:", error);
  }
}

getGames("MMORPG");
generateNavbar();
