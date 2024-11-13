const rainydaysAPI = "https://v2.api.noroff.dev/rainy-days";

const urlParams = new URLSearchParams(window.location.search);
const jacketId = urlParams.get("id");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funksjon for å legge til produkt i handlekurven
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // Lagre handlekurven i localStorage
  updateCartCount();
  renderCart();
}

// Funksjon for å oppdatere antall produkter i handlekurvikonet
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Kall updateCartCount for å oppdatere antallet ved oppstart
updateCartCount();
renderCart();

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

  updateCartCount(); // Oppdater antallet i handlekurvikonet
  updateTotalPrice();
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
  localStorage.setItem("cart", JSON.stringify(cart)); // Oppdater localStorage
  updateCartCount();
  renderCart();
}

function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce(
    (sum, product) => sum + product.discountedPrice * (product.quantity || 1),
    0
  );
  const totalPriceElement = document.getElementById("total-price");
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  } else {
    console.error("Total price element not found");
  }
}

const initApp = () => {
  renderCart();
};

initApp();

// const rainydaysAPI = "https://v2.api.noroff.dev/rainy-days";

// const urlParams = new URLSearchParams(window.location.search);
// const jacketId = urlParams.get("id");
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// async function getJacketById() {
//   try {
//     const result = await fetch(`${rainydaysAPI}/${jacketId}`);
//     const { data } = await result.json();
//     console.log(data);
//     renderJacketByID(data);
//   } catch (error) {
//     console.error("Error fetching jacket:", error);
//   }
// }

// function renderJacketByID(product) {
//   const jacketContainer = document.getElementById("jacket-container");

//   const img = document.createElement("img");
//   img.src = product.image.url;
//   img.alt = product.image.alt;

//   const jacketTitle = document.createElement("h1");
//   jacketTitle.textContent = product.title.replace(/^Rainy Days\s*/, "");

//   const sizeSelectElement = createSizeSelect(product.sizes);

//   const jacketDescription = document.createElement("p");
//   jacketDescription.textContent = product.description;

//   const jacketPrice = document.createElement("p");
//   jacketPrice.textContent = product.discountedPrice;

//   const addToCartButton = document.createElement("button");
//   addToCartButton.textContent = "Add to Cart";
//   addToCartButton.className = "add-to-cart";
//   addToCartButton.setAttribute("data-id", product.id);
//   addToCartButton.addEventListener("click", (event) => {
//     event.preventDefault(); // Forhindrer standard oppførsel
//     addToCart(product);
//   });

//   jacketContainer.appendChild(img);
//   jacketContainer.appendChild(jacketTitle);
//   jacketContainer.appendChild(jacketDescription);
//   jacketContainer.appendChild(sizeSelectElement);
//   jacketContainer.appendChild(jacketPrice);

//   if (product.onSale) {
//     const jacketDiscount = document.createElement("p");
//     jacketDiscount.textContent = product.price;
//     jacketDiscount.className = "jacket-discount";
//     jacketContainer.appendChild(jacketDiscount);
//   }

//   jacketContainer.appendChild(addToCartButton);
// }

// getJacketById();

// function createSizeSelect(sizes) {
//   const select = document.createElement("select");

//   sizes.forEach((size) => {
//     const option = document.createElement("option");
//     option.value = size;
//     option.text = size;
//     select.appendChild(option);
//   });

//   return select;
// }

// // Funksjon for å legge til produkt i handlekurven
// function addToCart(product) {
//   const existingItem = cart.find((item) => item.id === product.id);
//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     product.quantity = 1;
//     cart.push(product);
//   }
//   localStorage.setItem("cart", JSON.stringify(cart)); // Lagre handlekurven i localStorage
//   updateCartCount();
//   renderCart();
// }

// // Funksjon for å oppdatere antall produkter i handlekurvikonet
// function updateCartCount() {
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
//   document.getElementById("cart-count").textContent = cartCount;
// }

// // Kall updateCartCount for å oppdatere antallet ved oppstart
// updateCartCount();
// renderCart();

// function renderCart() {
//   const cartContainer = document.querySelector(".listCart");
//   cartContainer.innerHTML = ""; // Tømmer handlekurven før oppdatering

//   cart.forEach((item, index) => {
//     const cartItem = document.createElement("div");
//     cartItem.className = "item";

//     const itemImage = document.createElement("img");
//     itemImage.src = item.image.url;
//     itemImage.alt = item.image.alt;

//     const itemName = document.createElement("p");
//     itemName.textContent = item.title.replace(/^Rainy Days\s*/, "");

//     const itemPrice = document.createElement("p");
//     itemPrice.textContent = item.discountedPrice;

//     const quantityContainer = document.createElement("div");
//     quantityContainer.className = "quantity";

//     const minusButton = document.createElement("span");
//     minusButton.className = "minus";
//     minusButton.textContent = "<";
//     minusButton.addEventListener("click", () => updateQuantity(index, -1));

//     const quantity = document.createElement("span");
//     quantity.textContent = item.quantity; // Vis riktig mengde

//     const plusButton = document.createElement("span");
//     plusButton.className = "plus";
//     plusButton.textContent = ">";
//     plusButton.addEventListener("click", () => updateQuantity(index, 1));

//     const removeButton = document.createElement("button");
//     removeButton.textContent = "Remove";
//     removeButton.addEventListener("click", () => removeFromCart(index));

//     quantityContainer.appendChild(minusButton);
//     quantityContainer.appendChild(quantity);
//     quantityContainer.appendChild(plusButton);

//     cartItem.appendChild(itemImage);
//     cartItem.appendChild(itemName);
//     cartItem.appendChild(itemPrice);
//     cartItem.appendChild(quantityContainer);
//     cartItem.appendChild(removeButton);

//     cartContainer.appendChild(cartItem);
//   });

//   function updateQuantity(index, change) {
//     const item = cart[index];
//     item.quantity += change;
//     if (item.quantity < 1) {
//       item.quantity = 1;
//     }
//     localStorage.setItem("cart", JSON.stringify(cart)); // Oppdater localStorage
//     updateCartCount();
//     renderCart();
//   }
// }

// const initApp = () => {
//   renderCart();
// };

// initApp();
