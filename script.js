document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const filters = document.querySelectorAll('.check');
    const productsWrapper = document.getElementById('products-wrapper');
    const cartCount = document.getElementById('cart-count');
    
    // Función para cargar productos
    function loadProducts() {
      // Aquí puedes realizar una llamada a tu API o cargar productos estáticos
      const products = [
        { id: 1, name: 'Producto 1', price: '100', img: 'path/to/image1.jpg' },
        { id: 2, name: 'Producto 2', price: '200', img: 'path/to/image2.jpg' }
      ];
  
      productsWrapper.innerHTML = products.map(product => `
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price} €</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Añadir al carrito</button>
          </div>
        </div>
      `).join('');
    }
  
    // Función para manejar la búsqueda
    function handleSearch() {
      const query = searchInput.value.toLowerCase();
      const cards = productsWrapper.querySelectorAll('.card');
      cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = title.includes(query) ? '' : 'none';
      });
    }
  
    // Función para manejar los filtros
    function handleFilters() {
      // Aquí puedes añadir la lógica para filtrar productos según los filtros seleccionados
    }
  
    // Función para manejar el carrito
    function handleCart() {
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          let count = parseInt(cartCount.textContent) || 0;
          cartCount.textContent = count + 1;
        });
      });
    }
  
    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    filters.forEach(filter => filter.addEventListener('change', handleFilters));
  
    // Inicialización
    loadProducts();
    handleCart();
  });
  
  const products = [
  {
    name: 'Sony Playstation 5',
    url: 'https://i.ibb.co/zHmZnWx/playstation-5.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'https://i.ibb.co/rFFMDH7/samsung-galaxy.png',
    category: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'https://i.ibb.co/mhm1hLq/cannon-eos-camera.png',
    category: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'https://i.ibb.co/LS9TDLN/sony-a7-camera.png',
    category: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'https://i.ibb.co/QHgFnHk/lg-tv.png',
    category: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'https://i.ibb.co/L0L9SdG/nintendo-switch.png',
    category: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'https://i.ibb.co/C8rBVdT/xbox-series-x.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'https://i.ibb.co/Pj1nm4B/samsung-tv.png',
    category: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'https://i.ibb.co/5F58zmH/google-pixel.png',
    category: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'https://i.ibb.co/5Wy3RZ9/sony-zv1f-camera.png',
    category: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'https://i.ibb.co/FxM6rXq/toshiba-tv.png',
    category: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'https://i.ibb.co/5vc7J6s/iphone-14.png',
    category: 'smartphones',
    price: 999.99,
  },
];

// Get DOM elements
const productsWrapper = document.getElementById('products-wrapper');
const checkboxes = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');

// Initialize cart item count
let cartItemCount = 0;

// Initialize products
const productElements = [];

// Loop over the products and create the product elements
products.forEach((product) => {
  const productElement = createProductElement(product);
  productElements.push(productElement);
  productsWrapper.appendChild(productElement);
});

// Add filter event listeners
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product element
function createProductElement(product) {
  const productElement = document.createElement('div');

  productElement.className = 'item space-y-2';

  productElement.innerHTML = `<div
  class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl"
>
  <img
    src="${product.url}"
    alt="${product.name}"
    class="w-full h-full object-cover"
  />
  <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
    >Add To Cart</button
  >
</div>
<p class="text-xl">${product.name}</p>
<strong>$${product.price.toLocaleString()}</strong>`;

  productElement
    .querySelector('.status')
    .addEventListener('click', updateCart);

  return productElement;
}

// Toggle add/remove from cart
function updateCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains('added')) {
    // Remove from cart
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add To Cart';
    statusEl.classList.remove('bg-red-600');
    statusEl.classList.add('bg-gray-800');

    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove From Cart';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-600');

    cartItemCount++;
  }

  // Update cart item count
  cartCount.innerText = cartItemCount.toString();
}

// Filter products by search or checkbox
function filterProducts() {
  // Get search term
  const searchTerm = searchInput.value.trim().toLowerCase();
  // Get checked categories
  const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  // Loop over products and check for matches
  productElements.forEach((productElement, index) => {
    const product = products[index];

    // Check to see if product matches the search or checked items
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    // Show or hide product based on matches
    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove('hidden');
    } else {
      productElement.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const filters = document.querySelectorAll('.check');
  const productsWrapper = document.getElementById('products-wrapper');
  const cartCount = document.getElementById('cart-count');
  let cart = [];

  // Datos de productos (ejemplo)
  const products = [
      { id: 1, name: 'Nintendo NES', price: 100, img: 'img/nintendo.jpg', category: 'consolas' },
      { id: 2, name: 'Game Boy', price: 80, img: 'img/gameboy.jpg', category: 'consolas' },
      { id: 3, name: 'Play Station 1', price: 150, img: 'img/ps1.jpg', category: 'consolas' },
      { id: 4, name: 'Super Mario Bros', price: 50, img: 'img/mario.jpg', category: 'videojuegos' },
      { id: 5, name: 'The Legend of Zelda', price: 60, img: 'img/zelda.jpg', category: 'videojuegos' }
  ];

  // Cargar productos en el HTML
  function loadProducts(productsToShow) {
      productsWrapper.innerHTML = productsToShow.map(product => `
          <div class="card">
              <img src="${product.img}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.price} €</p>
                  <button class="btn btn-primary add-to-cart" data-id="${product.id}">Añadir al carrito</button>
              </div>
          </div>
      `).join('');
  }

  // Filtrar productos según categorías seleccionadas
  function handleFilters() {
      const selectedCategories = Array.from(filters)
          .filter(filter => filter.checked)
          .map(filter => filter.value);

      const filteredProducts = products.filter(product => 
          selectedCategories.length === 0 || selectedCategories.includes(product.category)
      );

      loadProducts(filteredProducts);
  }

  // Manejar la búsqueda de productos
  function handleSearch() {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(query)
      );
      loadProducts(filteredProducts);
  }

  // Añadir producto al carrito
  function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
          cart.push(product);
          cartCount.textContent = cart.length;
          alert(`Añadido "${product.name}" al carrito.`);
      }
  }

  // Eventos
  searchInput.addEventListener('input', handleSearch);
  filters.forEach(filter => filter.addEventListener('change', handleFilters));
  productsWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
          const productId = parseInt(e.target.dataset.id);
          addToCart(productId);
      }
  });

  // Cargar todos los productos al iniciar
  loadProducts(products);
});

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
      cart = savedCart;
      cartCount.textContent = cart.length;
  }
}

// Al inicio
loadCart();
addToCart(productId); // Llamada dentro de addToCart

var flkty = new Flickity('.carousel', {
  prevNextButtons: false,  // Deshabilitamos las flechas predeterminadas de Flickity
  pageDots: false  // Deshabilitamos los puntos de página
});

// Conectamos las flechas personalizadas
document.querySelector('.flickity-prev-next-button.previous').addEventListener('click', function() {
  flkty.previous();
});

document.querySelector('.flickity-prev-next-button.next').addEventListener('click', function() {
  flkty.next();
});

// Form Validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        alert('Formulario enviado con éxito!');
        this.submit();
    }
});

function validateForm() {
    const inputs = ['nombre', 'direccion', 'area', 'mensaje'];
    for (const inputId of inputs) {
        const value = document.getElementById(inputId).value.trim();
        if (value === '') {
            alert('Por favor, complete todos los campos obligatorios.');
            return false;
        }
    }
    // Obtiene el valor del campo de email
    const email = document.getElementById('email').value.trim();

    // Verifica que el email sea válido utilizando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un email válido.');
        return false;
    }

    // Validar el teléfono
    const telefono = document.getElementById('telefono').value.trim();

    // Verifica que el teléfono tenga al menos 9 dígitos
    if (telefono.length < 9 || isNaN(telefono)) {
        alert('Por favor, ingrese un teléfono válido con el código de área (al menos 9 dígitos).');
        return false;
    }

    // Si todo es válido, permite el envío del formulario
    return true;
}

// Enable/Disable Submit Button
const termsCheckbox = document.getElementById('politica_privacidad');
const submitBtn = document.getElementById('submitBtn');

termsCheckbox.addEventListener('change', () => {
    if (termsCheckbox.checked) {
        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('enabled');
    }
});