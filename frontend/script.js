const API = "https://us-central1-starwars-api-486023.cloudfunctions.net/starwars-api";

function fetchData() {
  const type = document.getElementById("type").value;
  const search = document.getElementById("search").value;

  let url = `${API}?type=${type}`;

  if (search) {
    url += `&search=${search}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => renderResults(data.data.results, type))
    .catch(err => alert(err));
}

function renderResults(items, type) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    if (type === "people") {
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Altura:</strong> ${item.height} cm</p>
        <p><strong>Gênero:</strong> ${traduzGenero(item.gender)}</p>
        <p><strong>Cor dos olhos:</strong> ${item.eye_color}</p>
      `;
    }

   if (type === "planets") {
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>População:</strong> ${formatNumber(item.population)}</p>
        <p><strong>Clima:</strong> ${item.climate}</p>
        <p><strong>Terreno:</strong> ${item.terrain}</p>
      `;
    }

    container.appendChild(card);
  });
}

function traduzGenero(gender) {
  if (gender === "male") return "Masculino";
  if (gender === "female") return "Feminino";
  if (gender === "n/a") return "Não aplicável";
  return gender;
}

function formatNumber(value) {
  if (!value || value === "unknown") return "Desconhecido";
  return Number(value).toLocaleString("pt-BR");
}

