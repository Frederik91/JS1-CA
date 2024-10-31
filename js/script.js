const rainydaysAPI = "https://v2.api.noroff.dev/rainy-days";

let jackets = [];

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
    const jacketContainer = document.createElement("a");
    jacketContainer.href = `./products.html?id=${jacket.id}`;

    const img = document.createElement("img");
    img.src = jacket.image.url;
    img.alt = jacket.image.alt;

    const jacketName = document.createElement("h2");
    jacketName.textContent = jacket.title.replace(/^Rainy Days\s*/, "");

    jacketContainer.appendChild(img);
    jacketContainer.appendChild(jacketName);

    const jacketPrice = document.createElement("p");
    jacketPrice.textContent = jacket.discountedPrice;

    if (jacket.onSale) {
      const jacketDiscount = document.createElement("p");
      jacketDiscount.textContent = jacket.price;
      jacketDiscount.className = "jacket-discount";
      jacketContainer.appendChild(jacketPrice);
      jacketContainer.appendChild(jacketDiscount);
    } else {
      jacketContainer.appendChild(jacketPrice);
    }

    jacketsGrid.appendChild(jacketContainer);
  });
}

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

// const apiUrl = "https://v2.api.noroff.dev/rainy-days";

// fetch("https://v2.api.noroff.dev/rainy-days")
//   .then((response) => response.json()) // Parse JSON from the response
//   .then((reponse_json) => {
//     displayProducts(reponse_json.data); // Access the "data" property to get products array
//   })
//   .catch((error) => console.error("Error fetching products:", error));

// function displayProducts(products) {
//   const productList = document.getElementById("product-list");
//   productList.innerHTML = ""; // Clear previous content

//   products.forEach((product) => {
//     const productItem = document.createElement("div");
//     productItem.innerHTML = `
//             <h2>${product.title}</h2>
//             <p>${product.gender}</p>
//             <p>${product.sizes}</p>
//             <p>${product.description}</p>
//             <p>Price: ${product.price}</p>
//             <img src="${product.image.url}" alt="${product.image.alt}">
//         `;
//     productList.appendChild(productItem);
//   });
// }

// // const viewAll = document.querySelector('.view-all')

// // const paragraf = document.createElement('p')
// // paragraf.className = 'text';

// // viewAll.appendChild(paragraf);

// // viewAll.innerHTML = 'hei';

// const buttonWomen = document.getElementById("button-women");
// buttonWomen.addEventListener(
//   "click",
//   function () {
//     getFilteredProducts("Female");
//   },
//   false
// );

// // buttonAll.addEventListener('click', function(){filteredProducts = getFilteredProducts("Male") });
// // buttonAll.addEventListener('click', function(){filteredProducts += getFilteredProducts("Female") });
// //     displayProducts(filteredeProducts)
// // buttonAll.addEventListener('click', function(){ getFilteredProducts("Male") }, false);
// // buttonAll.addEventListener('click', function(){ getFilteredProducts("Female") }, false);

// const buttonMen = document.getElementById("button-men");
// buttonMen.addEventListener(
//   "click",
//   function () {
//     getFilteredProducts("Male");
//   },
//   false
// );

// const buttonAll = document.getElementById("button-all"); // DON'T WORK...!
// buttonAll.addEventListener(
//   "click",
//   function () {
//     getFilteredProducts("Female", "Male");
//   },
//   false
// );

// function getFilteredProducts(filter) {
//   fetch("https://v2.api.noroff.dev/rainy-days")
//     .then((response) => response.json()) // Parse JSON from the response
//     .then((reponse_json) => {
//       filteredProducts = reponse_json.data.filter((dataElement) => {
//         if (dataElement.gender === filter) return dataElement;
//       });
//       console.log(filteredProducts);
//       displayProducts(filteredProducts); // Access the "data" property to get products array
//     })
//     .catch((error) => console.error("Error fetching products:", error));
// }

// function getAllProducts() {
//     fetch('https://v2.api.noroff.dev/rainy-days')
//     .then(response => {
//     if (!response.ok) {
//     throw new Error('Network response was not ok');  }
//     return response.json();         })
//         .then(response_json => {
//              const allProducts = response_json;
//                 console.log(allProducts); // Output all products to the consoledisplayProducts(allProducts); // Display all products }) .catch(error => console.error('Error fetching all products:', error)); }

// function filterGender() {
//     if(gender === "Female" ) {
//     console.log('true');
//    }
// }

// function filterSelection(gender) {
//     var items = document.getElementsByClassName('womens');
//     for (var i = 0; i < items.length; i++) {
//       items[i].classList.remove('show');
//       if (gender === 'Female' || items[i].classList.contains(category)) {
//         items[i].classList.add('show');
//       }
//     }
//   }

//   // Initially show all items
//   filterSelection('all');

// document.getElementById("button-filter").addEventListener("click", function() {
//     const gender = document.getElementById("gender").value;

//     filterProducts(gender);
// });

// function filterProducts(gender) {
//     // Use the global allProducts array to filter
//     const filteredProducts = allProducts.filter(function(product) {
//         const genderMatch = !gender || gender === 'all' || product.genre.toLowerCase() === gender.toLowerCase();

//         return genderMatch;
//     });

//     // Display filtered products
//     displayProducts(filteredProducts);
// }
