
const products = [
  {
    id: 1,
    name: "Gaming Mouse RGB",
    category: "mouse",
    price: 2500,
    image: "img1.png"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "keyboard",
    price: 8500,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 3,
    name: "Gaming Headset",
    category: "headset",
    price: 5500,
    image: "https://images.unsplash.com/photo-1580894908361-967195033215"
  },
  {
    id: 4,
    name: "Pro Gaming Mouse",
    category: "mouse",
    price: 3200,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
  }
];

// ===== ELEMENTS =====
const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("searchInput");
const filter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cart-count");
const productCount = document.getElementById("productCount");

// ===== CART (LOCAL STORAGE) =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== UPDATE CART COUNT =====
function updateCartUI() {
  cartCount.textContent = cart.length;
}

// ===== TOAST MESSAGE =====
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// ===== DISPLAY PRODUCTS =====
function displayProducts(items) {
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p style="color:#aaa;">No products found 😢</p>`;
    productCount.textContent = "0 Items";
    return;
  }

  productCount.textContent = `${items.length} Items`;

  items.forEach(product => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="card-bottom">
          <span class="price">Rs ${product.price}</span>
          <button class="add-btn" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

// ===== FILTER =====
function filterProducts() {
  let search = searchInput.value.toLowerCase();
  let category = filter.value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (category === "all" || p.category === category)
  );

  displayProducts(filtered);
}

// ===== ADD TO CART =====
function addToCart(id) {
  let product = products.find(p => p.id === id);

  if (!product) return;

  // IMPORTANT: same structure bhejo
  let item = {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    img: product.img
  };

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart ✅");
}

// ===== MENU TOGGLE =====
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

// ===== EVENTS =====
searchInput.addEventListener("input", filterProducts);
filter.addEventListener("change", filterProducts);

// ===== INIT =====
updateCartUI();
displayProducts(products);


window.onload = function () {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let container = document.getElementById("products-container");

  products.forEach(p => {
    container.innerHTML += `
      <div>
        <img src="${p.img}" width="150">
        <h3>${p.name}</h3>
        <p>${p.detail}</p>
        <h4>${p.price}</h4>
      </div>
    `;
  });
};


function loadProducts(){
  const grid = document.getElementById("product-grid");
  if(!grid) return;

  // 🔥 always get latest data
  products = JSON.parse(localStorage.getItem("products")) || [];

  grid.innerHTML = "";

  products.forEach((p,index)=>{
    grid.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.detail}</p>
        <p>$${p.price}</p>

        <div class="card-buttons">
        <button onclick="addToCart(${p.id})">Add to Cart</button>
          
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });
}