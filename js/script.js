const rainydaysAPI = "https://v2.api.noroff.dev/rainy-days";

let jackets = [];
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Hent handlekurven fra localStorage eller bruk en tom array

async function getJackets() {
  try {
    const response = await fetch(rainydaysAPI);
    const { data } = await response.json();
    jackets = data;
    console.log(data);
    renderJackets(jackets);
  } catch (error) {
    console.error("Error fetching jackets:", error);
  }
}

getJackets();

function renderJackets(product) {
  const jacketsGrid = document.getElementById("jackets"); //dette er section id'en fra html!
  jacketsGrid.className = "jacket-grid";
  jacketsGrid.innerHTML = "";

  product.forEach((jacket) => {
    const jacketContainer = document.createElement("div");
    jacketContainer.className = "jacket-container";

    const link = document.createElement("a");
    link.href = `products.html?id=${jacket.id}`;

    const img = document.createElement("img");
    img.src = jacket.image.url;
    img.alt = jacket.image.alt;

    const jacketName = document.createElement("h2");
    jacketName.textContent = jacket.title.replace(/^Rainy Days\s*/, "");

    // Kall sizeSelect-funksjonen for å lage størrelsesvalg
    const sizeSelectElement = createSizeSelect(jacket.sizes);

    const jacketPrice = document.createElement("p");
    jacketPrice.textContent = jacket.discountedPrice;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = "add-to-cart";
    addToCartButton.setAttribute("data-id", jacket.id);
    addToCartButton.addEventListener("click", (event) => {
      event.preventDefault(); // Forhindrer standard oppførsel
      addToCart(jacket);
    });

    link.appendChild(img);
    link.appendChild(jacketName);
    jacketContainer.appendChild(link);
    jacketContainer.appendChild(sizeSelectElement);
    jacketContainer.appendChild(jacketPrice);

    if (jacket.onSale) {
      const jacketDiscount = document.createElement("p");
      jacketDiscount.textContent = jacket.price;
      jacketDiscount.className = "jacket-discount";
      jacketContainer.appendChild(jacketDiscount);
    }

    jacketContainer.appendChild(addToCartButton);

    jacketsGrid.appendChild(jacketContainer);
  });
}

// Funksjon for å lage og returnere størrelsesvalg
function createSizeSelect(sizes) {
  const select = document.createElement("select");

  sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.text = size;
    select.appendChild(option);
  });

  return select;
}

// Funksjon for å legge til produkt i handlekurven
function addToCart(jacket) {
  const existingItem = cart.find((item) => item.id === jacket.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    jacket.quantity = 1;
    cart.push(jacket);
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // Lagre handlekurven i localStorage
  updateCartCount();
  renderCart();
}

// Funksjon for å vise handlekurven
function renderCart() {
  const cartContainer = document.querySelector(".listCart");
  cartContainer.innerHTML = ""; // Tømmer handlekurven før oppdatering

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "item";

    const itemImage = document.createElement("img");
    itemImage.src = item.image.url;
    itemImage.alt = item.image.alt;

    const itemName = document.createElement("p");
    itemName.textContent = item.title.replace(/^Rainy Days\s*/, "");

    const itemPrice = document.createElement("p");
    itemPrice.textContent = item.discountedPrice;

    const quantityContainer = document.createElement("div");
    quantityContainer.className = "quantity";

    const minusButton = document.createElement("span");
    minusButton.className = "minus";
    minusButton.textContent = "<";
    minusButton.addEventListener("click", () => updateQuantity(index, -1));

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity; // Vis riktig mengde

    const plusButton = document.createElement("span");
    plusButton.className = "plus";
    plusButton.textContent = ">";
    plusButton.addEventListener("click", () => updateQuantity(index, 1));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(index));

    quantityContainer.appendChild(minusButton);
    quantityContainer.appendChild(quantity);
    quantityContainer.appendChild(plusButton);

    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(quantityContainer);
    cartItem.appendChild(removeButton);

    cartContainer.appendChild(cartItem);
  });
}

// Funksjon for å oppdatere mengden av et produkt i handlekurven
function updateQuantity(index, change) {
  const item = cart[index];
  item.quantity += change;
  if (item.quantity < 1) {
    item.quantity = 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // Oppdater localStorage
  updateCartCount();
  renderCart();
}

// Funksjon for å fjerne et produkt fra handlekurven
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}
updateCartCount();
renderCart();

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

renderCart();
updateCartCount();

// bildekarusell

let currentIndex = 0;

function changeSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
document
  .querySelector(".prev")
  .addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));

document.getElementById("filter-butn").addEventListener("click", function () {
  const filterSelect = document.getElementById("filter-select");
  if (
    filterSelect.style.display === "none" ||
    filterSelect.style.display === ""
  ) {
    filterSelect.style.display = "block";
  } else {
    filterSelect.style.display = "none";
  }
});

// filter

document.querySelector("#use-filter").addEventListener("click", function () {
  const genderFilter = document.querySelector("#gender-filter").value;
  const saleFilter = document.querySelector("#sale-filter").checked;

  const filteredProducts = jackets.filter((jacket) => {
    if (genderFilter !== "all") {
      if (saleFilter) {
        return jacket.gender === genderFilter && jacket.onSale;
      } else {
        return jacket.gender === genderFilter;
      }
    }

    if (saleFilter) {
      return jacket.onSale;
    }

    return true;
  });

  renderJackets(filteredProducts);
});

// åpne lukke cart

let iconCart = document.querySelector("#cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("main");
let listProductHTML = document.querySelector("#jackets");

let listProducts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const initApp = () => {
  fetch;
};

initApp();

document.addEventListener("DOMContentLoaded", function () {
  var loader = document.getElementById("loader");
  var content = document.getElementById("content");

  setTimeout(function () {
    loader.style.display = "none";
    content.style.display = "block";
  }, 0);
});
