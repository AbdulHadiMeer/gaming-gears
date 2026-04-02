// ===== NAVBAR =====
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// ===== ADMIN LOGIN =====
const adminPassword = "12345";

function openAdminLogin() {
  document.getElementById("admin-login-modal").style.display = "block";
}

function closeAdminLogin() {
  document.getElementById("admin-login-modal").style.display = "none";
  document.getElementById("login-error").innerText = "";
}

function checkAdminPassword() {
  const pass = document.getElementById("admin-password").value;
  if (pass === adminPassword) {
    closeAdminLogin();
    openAdminPanel();
  } else {
    document.getElementById("login-error").innerText = "Wrong password!";
  }
}

// ===== ADMIN PANEL =====
function openAdminPanel() {
  document.getElementById("admin-panel-modal").style.display = "block";
  renderAdminProducts();
}

function closeAdminPanel() {
  document.getElementById("admin-panel-modal").style.display = "none";
}

// ===== DATA =====
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// ===== LOAD PRODUCTS =====
function loadProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  // Always get latest data
  products = JSON.parse(localStorage.getItem("products")) || [];

  grid.innerHTML = "";

  products.forEach((p, index) => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.detail}</p>
        <p>$${p.price}</p>

        <div class="card-buttons">
          <button onclick="addToCart(${index})">Add to Cart</button>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });
}

// ===== ADD PRODUCT =====
function addProduct() {
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const img = document.getElementById("product-img").value;
  const detail = document.getElementById("product-detail").value;

  if (name && price && img && detail) {
    const newProduct = { name, price, img, detail };
    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    // LIVE update
    loadProducts();
    renderAdminProducts();

    // Clear fields
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-img").value = "";
    document.getElementById("product-detail").value = "";

  } else {
    alert("Please fill all fields!");
  }
}

// ===== ADMIN PANEL PRODUCTS =====
function renderAdminProducts() {
  const list = document.getElementById("admin-products-list");
  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div style="margin-bottom:10px;padding:10px;background:#020617;border-radius:10px;">
        <strong>${p.name}</strong> - $${p.price}<br>

        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

// ===== EDIT / DELETE =====
function editProduct(index) {
  const p = products[index];

  const newName = prompt("Enter new name", p.name);
  const newPrice = prompt("Enter new price", p.price);
  const newImg = prompt("Enter new image URL", p.img);
  const newDetail = prompt("Enter new detail", p.detail);

  if (newName && newPrice && newImg && newDetail) {
    products[index] = { name: newName, price: newPrice, img: newImg, detail: newDetail };
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
    renderAdminProducts();
  }
}

function deleteProduct(index) {
  if (confirm("Are you sure to delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
    renderAdminProducts();
  }
}

// ===== CART =====
function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.innerText = cart.length;
}

// ===== ON LOAD =====
window.onload = function () {
  products = JSON.parse(localStorage.getItem("products")) || [];
  cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  loadProducts();
  updateCart();
  renderAdminProducts();
}


function sendWhatsApp(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let phone = "923702472637"; // 👈 apna number (without +)

  let text = `New Message from Ultra Play Website:%0A
Name: ${name}%0A
Email: ${email}%0A
Message: ${message}`;

  let url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank");
}