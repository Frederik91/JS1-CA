const rainydaysAPI = "https://v2.api.noroff.dev/rainy-days";

const urlParams = new URLSearchParams(window.location.search);
const jacketId = urlParams.get("id");

async function getJacketById() {
  const result = await fetch(`${rainydaysAPI}/${jacketId}`);
  const { data } = await result.json();
  console.log(data);
  renderJacketByID(data);
}

function renderJacketByID(product) {
  const jacketContainer = document.getElementById("jacket-container");

  const img = document.createElement("img");
  img.src = product.image.url;
  img.alt = product.image.alt;

  const jacketTitle = document.createElement("h1");
  jacketTitle.textContent = product.title.replace(/^Rainy Days\s*/, "");

  const jacketDescription = document.createElement("p");
  jacketDescription.textContent = product.description;

  const jacketPrice = document.createElement("p");
  jacketPrice.textContent = product.discountedPrice;

  jacketContainer.appendChild(img);
  jacketContainer.appendChild(jacketTitle);
  jacketContainer.appendChild(jacketDescription);
  jacketContainer.appendChild(jacketPrice);
}

getJacketById();
