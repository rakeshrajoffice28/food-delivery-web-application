const products = [
  { id: 1, name: "Chicken Biryani", category: "Biriyani", price: 250, distance: 2, type: "Lunch", label: "Spicy classic" },
  { id: 2, name: "Veg Biryani", category: "Biriyani", price: 220, distance: 3, type: "Lunch", label: "Aromatic veg" },
  { id: 3, name: "Cheese Burger", category: "Fast Food", price: 180, distance: 1.5, type: "Fast Food", label: "Juicy and cheesy" },
  { id: 4, name: "Crispy Fries", category: "Fast Food", price: 100, distance: 1, type: "Fast Food", label: "Golden crisp" },
  { id: 5, name: "Chicken Shawarma", category: "Quick Bite", price: 200, distance: 0.8, type: "Quick Bite", label: "Wrap delight" },
  { id: 6, name: "Mango Juice", category: "Juice", price: 120, distance: 2.4, type: "Juice", label: "Fresh and fruity" },
  { id: 7, name: "Paneer Sandwich", category: "Quick Bite", price: 150, distance: 1.7, type: "Quick Bite", label: "Warm crunchy" },
  { id: 8, name: "Pasta Alfredo", category: "Lunch", price: 210, distance: 2.5, type: "Lunch", label: "Creamy pasta" },
  { id: 9, name: "Chocolate Cake", category: "Desserts", price: 140, distance: 4, type: "Desserts", label: "Sweet treat" },
  { id: 10, name: "Berry Smoothie", category: "Juice", price: 110, distance: 2.1, type: "Juice", label: "Cool refresh" }
];

const storageKeys = {
  cart: "qdCart",
  user: "qdUser",
  users: "qdUsers",
  order: "qdOrder"
};

function loadStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Unable to parse localStorage key ${key}:`, error);
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  return loadStorage(storageKeys.user, null);
}

function setCurrentUser(user) {
  saveStorage(storageKeys.user, user);
}

function getUsers() {
  return loadStorage(storageKeys.users, []);
}

function setUsers(users) {
  saveStorage(storageKeys.users, users);
}

function logoutUser() {
  localStorage.removeItem(storageKeys.user);
  window.location.href = "login.html";
}

function getCart() {
  return loadStorage(storageKeys.cart, []);
}

function setCart(cart) {
  saveStorage(storageKeys.cart, cart);
}

function getOrder() {
  return loadStorage(storageKeys.order, null);
}

function setOrder(order) {
  saveStorage(storageKeys.order, order);
}

function updateCartBadge() {
  const count = getCart().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  document.querySelectorAll("#cart-badge").forEach(el => {
    el.textContent = count;
  });
  const summary = document.getElementById("cart-summary");
  if (summary) {
    summary.textContent = `₹${getCart().reduce((sum, item) => sum + item.price * item.quantity, 0)}`;
  }
}

function renderNavUser() {
  const navAccount = document.getElementById("nav-account");
  const navLogout = document.getElementById("nav-logout");
  const current = getCurrentUser();

  if (navAccount) {
    if (current) {
      const firstName = current.name ? current.name.split(" ")[0] : "Customer";
      navAccount.textContent = `Hi, ${firstName}`;
      navAccount.href = "index.html";
      navAccount.classList.remove("active");
    } else {
      navAccount.textContent = "👤 Login";
      navAccount.href = "login.html";
    }
  }

  if (navLogout) {
    if (current) {
      navLogout.classList.remove("hidden");
      navLogout.addEventListener("click", logoutUser);
    } else {
      navLogout.classList.add("hidden");
    }
  }
}

function initLoginPage() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const tabs = document.querySelectorAll(".tab-button");

  if (!loginForm || !signupForm) return;

  tabs.forEach(button => {
    button.addEventListener("click", () => {
      tabs.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const targetId = button.dataset.target;
      document.querySelectorAll(".auth-form").forEach(form => {
        form.classList.toggle("active", form.id === targetId);
      });
    });
  });

  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser({ name: user.name, email: user.email });
      window.location.href = "index.html";
    } else {
      alert("Invalid login details. Please check your email and password.");
    }
  });

  signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const users = getUsers();
    if (users.some(user => user.email === email)) {
      alert("This email is already registered. Please login or use another email.");
      return;
    }

    users.push({ name, email, password });
    setUsers(users);
    setCurrentUser({ name, email });
    window.location.href = "index.html";
  });
}

function buildTypeFilter() {
  const select = document.getElementById("filter-type");
  if (!select) return;
  const types = ["all", ...new Set(products.map(item => item.type))];
  select.innerHTML = types.map(type => `<option value="${type}">${type === "all" ? "All" : type}</option>`).join("");
}

function buildCategoryFilter() {
  const select = document.getElementById("filter-category");
  if (!select) return;
  const categories = ["all", ...new Set(products.map(item => item.category))];
  select.innerHTML = categories.map(category => `<option value="${category}">${category === "all" ? "All" : category}</option>`).join("");
}

function renderCategories() {
  const categoryList = document.getElementById("category-list");
  if (!categoryList) return;

  const categories = ["All", ...new Set(products.map(item => item.type)), ...new Set(products.map(item => item.category))]
    .filter((value, index, self) => self.indexOf(value) === index);

  categoryList.innerHTML = categories.map(name => `
    <button class="category-tile ${name === "All" ? "active" : ""}" data-category="${name}">
      <h3>${name}</h3>
      <p>Explore ${name.toLowerCase()} options.</p>
    </button>
  `).join("");

  categoryList.querySelectorAll(".category-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      categoryList.querySelectorAll(".category-tile").forEach(item => item.classList.remove("active"));
      tile.classList.add("active");
      renderProducts();
    });
  });
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  const searchText = document.getElementById("search-input")?.value.toLowerCase() || "";
  const selectedType = document.getElementById("filter-type")?.value || "all";
  const selectedCategory = document.getElementById("filter-category")?.value || "all";
  const selectedDistance = document.getElementById("filter-distance")?.value || "all";
  const maxPrice = Number(document.getElementById("filter-price")?.value || 400);
  const activeCategory = document.querySelector(".category-tile.active")?.dataset.category || "All";

  const visibleProducts = products.filter(product => {
    const matchesSearch = [product.name, product.category, product.type].some(value => value.toLowerCase().includes(searchText));
    const matchesType = selectedType === "all" || product.type === selectedType;
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesTileCategory = activeCategory === "All" || product.category === activeCategory || product.type === activeCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesDistance = selectedDistance === "all" || product.distance <= Number(selectedDistance);
    return matchesSearch && matchesType && matchesCategory && matchesTileCategory && matchesPrice && matchesDistance;
  });

  if (!visibleProducts.length) {
    productList.innerHTML = `<div class="food-card"><div class="food-card__content"><h3>No items found</h3><p>Try changing your filters or search term.</p></div></div>`;
    return;
  }

  productList.innerHTML = visibleProducts.map(product => `
    <article class="food-card">
      <div class="food-card__image">Image placeholder<br /><strong>${product.name}</strong></div>
      <div class="food-card__content">
        <p class="food-card__meta">${product.category} • ${product.type}</p>
        <h3 class="food-card__title">${product.name}</h3>
        <p>${product.label}</p>
        <div class="food-card__meta">Distance ${product.distance} km</div>
        <div class="food-card__actions">
          <div class="food-card__price">₹${product.price}</div>
          <button class="btn btn-primary" type="button" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  setCart(cart);
  updateCartBadge();
  alert(`${product.name} added to cart.`);
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  const totalField = document.getElementById("cart-total");
  if (!container || !totalField) return;

  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `<p>Your cart is empty. Add tasty food from the home page.</p>`;
    totalField.textContent = "₹0";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item__image">${item.name}</div>
      <div class="cart-item__info">
        <h3>${item.name}</h3>
        <p>${item.category} • ₹${item.price} each</p>
      </div>
      <div class="cart-item__qty">
        <div class="qty-control">
          <button type="button" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <strong>₹${item.quantity * item.price}</strong>
      </div>
    </div>
  `).join("");

  totalField.textContent = `₹${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}`;
}

function changeQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    const index = cart.findIndex(entry => entry.id === productId);
    cart.splice(index, 1);
  }

  setCart(cart);
  renderCartItems();
  updateCartBadge();
}

function handleCheckout() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert("Please log in or sign up before placing an order.");
      window.location.href = "login.html";
      return;
    }

    const cart = getCart();
    if (!cart.length) {
      alert("Your cart is empty. Add some meals before placing your order.");
      return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const payment = form.payment.value;

    if (!name || !phone || !address) {
      alert("Please add your name, phone number, and delivery address.");
      return;
    }

    const order = {
      id: Date.now(),
      customer: { name, phone, address },
      payment,
      cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      placedAt: new Date().toLocaleString()
    };

    setOrder(order);
    setCart([]);
    updateCartBadge();
    window.location.href = "order.html";
  });
}

function renderOrderPage() {
  const details = document.getElementById("order-details");
  const message = document.getElementById("order-message");
  if (!details) return;

  const order = getOrder();
  if (!order) {
    details.innerHTML = `<p>No order found. Please return to home and place your first order.</p>`;
    if (message) message.textContent = "No order to display.";
    return;
  }

  details.innerHTML = `
    <p><strong>Order #</strong> ${order.id}</p>
    <p><strong>Customer</strong> ${order.customer.name}</p>
    <p><strong>Phone</strong> ${order.customer.phone}</p>
    <p><strong>Address</strong> ${order.customer.address}</p>
    <p><strong>Payment</strong> ${order.payment}</p>
    <p><strong>Placed</strong> ${order.placedAt}</p>
    <div style="margin-top:18px;">
      <strong>Items</strong>
      <ul>
        ${order.cart.map(item => `<li>${item.quantity} × ${item.name} - ₹${item.price * item.quantity}</li>`).join("")}
      </ul>
    </div>
    <p><strong>Total</strong> ₹${order.total}</p>
  `;

  if (message) {
    message.textContent = `Thank you, ${order.customer.name}! Your order is confirmed and will be delivered soon.`;
  }
}

function attachFilters() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-run");
  const clearBtn = document.getElementById("search-clear");
  const distanceInput = document.getElementById("filter-distance");
  const priceInput = document.getElementById("filter-price");
  const priceValue = document.getElementById("filter-price-value");
  const typeInput = document.getElementById("filter-type");
  const categoryInput = document.getElementById("filter-category");

  [searchInput, distanceInput, priceInput, typeInput, categoryInput].forEach(input => {
    if (input) input.addEventListener("input", renderProducts);
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", renderProducts);
  }

  if (priceInput) {
    priceInput.addEventListener("input", () => {
      if (priceValue) priceValue.textContent = `Up to ₹${priceInput.value}`;
      renderProducts();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (distanceInput) distanceInput.value = "all";
      if (priceInput) priceInput.value = 400;
      if (priceValue) priceValue.textContent = `Up to ₹400`;
      if (typeInput) typeInput.value = "all";
      if (categoryInput) categoryInput.value = "all";
      document.querySelectorAll(".category-tile").forEach(item => {
        item.classList.toggle("active", item.dataset.category === "All");
      });
      renderProducts();
    });
  }
}

function animateOrderCard() {
  const orderBox = document.getElementById("order-animation");
  if (!orderBox) return;
  orderBox.classList.add("animate");
}

function pageReady() {
  updateCartBadge();
  renderNavUser();

  const page = document.body.dataset.page;
  if (page === "login") {
    initLoginPage();
  }

  if (page === "home") {
    buildTypeFilter();
    buildCategoryFilter();
    renderCategories();
    attachFilters();
    renderProducts();
  }

  if (page === "cart") {
    renderCartItems();
    handleCheckout();
  }

  if (page === "order") {
    renderOrderPage();
    animateOrderCard();
  }
}

window.addEventListener("DOMContentLoaded", pageReady);
