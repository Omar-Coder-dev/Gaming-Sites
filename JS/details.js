const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '611de349c8msh7dc79dd9ddecf1bp1843b6jsn0c373e862376',
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

async function openDetails(id) {
  try {
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const game = await response.json();

    // Fill the details section
    document.getElementById("detailsThumbnail").src = game.thumbnail;
    document.getElementById("detailsTitle").textContent = game.title;
    document.getElementById("detailsGenre").textContent = game.genre;
    document.getElementById("detailsPlatform").textContent = game.platform;
    document.getElementById("detailsStatus").textContent = game.status;
    document.getElementById("detailsDescription").textContent = game.description;
    document.getElementById("playLink").href = game.game_url;
    
document.getElementById("gameDetailsContainer").classList.remove("d-none");
document.getElementById("games").classList.add("d-none");
document.querySelector("nav").classList.add("d-none");

  } catch (error) {
    console.error("Failed to load game details", error);
  }
}

document.getElementById("closeDetailsBtn").addEventListener("click", () => {
  document.getElementById("gameDetailsContainer").classList.add("d-none");
  document.getElementById("games").classList.remove("d-none");
  document.querySelector("nav").classList.remove("d-none");
});

