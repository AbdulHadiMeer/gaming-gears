const cartContainer = document.getElementById("cart-items");
const totalItemsEl = document.getElementById("total-items");
const totalPriceEl = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    totalItemsEl.textContent = 0;
    totalPriceEl.textContent = "Rs 0";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += Number(item.price);

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <h4>${item.name}</h4>
          <p>Rs ${item.price}</p>
        </div>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalItemsEl.textContent = cart.length;
  totalPriceEl.textContent = "Rs " + totalPrice;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Order Placed Successfully 🎉");

  localStorage.removeItem("cart");
  cart = [];
  displayCart();
}

displayCart();