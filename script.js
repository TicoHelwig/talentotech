document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const filters = document.querySelectorAll('.check');
  const productsWrapper = document.getElementById('products-wrapper');
  const cartCount = document.getElementById('cart-count');
  const filtersContainer = document.getElementById('filters-container');
  const cartButton = document.getElementById('cart-button');
  let cart = [];

  // Datos de productos (ejemplo)
  const products = [
      { id: 1, name: 'Nintendo NES', price: 100, img: 'img/nintendo.jpg', category: 'consolas' },
      { id: 2, name: 'Game Boy', price: 80, img: 'img/gameboy.jpg', category: 'consolas' },
      { id: 3, name: 'Play Station 1', price: 150, img: 'img/ps1.jpg', category: 'consolas' },
      { id: 4, name: 'Super Mario Bros', price: 50, img: 'img/mario.jpg', category: 'videojuegos' },
      { id: 5, name: 'The Legend of Zelda', price: 60, img: 'img/zelda.jpg', category: 'videojuegos' }
  ];

  // Función para cargar productos en el HTML
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

  // Función para manejar la búsqueda de productos
  function handleSearch() {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(query)
      );
      loadProducts(filteredProducts);
  }

  // Función para manejar los filtros de categorías
  function handleFilters() {
      const selectedCategories = Array.from(filters)
          .filter(filter => filter.checked)
          .map(filter => filter.value);

      const filteredProducts = products.filter(product => 
          selectedCategories.length === 0 || selectedCategories.includes(product.category)
      );
      loadProducts(filteredProducts);
  }

  // Función para agregar un producto al carrito
  function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
          cart.push(product);
          cartCount.textContent = cart.length;
          alert(`Añadido "${product.name}" al carrito.`);
      }
  }

  // Actualización del carrito
  function updateCart(e) {
      const statusEl = e.target;

      if (statusEl.classList.contains('added')) {
          // Eliminar del carrito
          statusEl.classList.remove('added');
          statusEl.innerText = 'Añadir al carrito';
          statusEl.classList.remove('bg-red-600');
          statusEl.classList.add('bg-gray-800');
          cartItemCount--;
      } else {
          // Agregar al carrito
          statusEl.classList.add('added');
          statusEl.innerText = 'Eliminar del carrito';
          statusEl.classList.remove('bg-gray-800');
          statusEl.classList.add('bg-red-600');
          cartItemCount++;
      }

      // Actualizar el número de elementos en el carrito
      cartCount.innerText = cartItemCount.toString();
  }

  // Evento de búsqueda
  searchInput.addEventListener('input', handleSearch);

  // Evento de filtros
  filters.forEach(filter => filter.addEventListener('change', handleFilters));

  // Evento de añadir al carrito
  productsWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
          const productId = parseInt(e.target.dataset.id);
          addToCart(productId);
      }
  });

  // Cargar productos al inicio
  loadProducts(products);

  // Guardar carrito en el almacenamiento local
  function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Cargar carrito desde el almacenamiento local
  function loadCart() {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      if (savedCart) {
          cart = savedCart;
          cartCount.textContent = cart.length;
      }
  }

  // Cargar el carrito al iniciar
  loadCart();

  // Inicializar el contador de elementos del carrito
  let cartItemCount = 0;

  // Función para inicializar la funcionalidad de carrusel
  var flkty = new Flickity('.carousel', {
      prevNextButtons: false,
      pageDots: false
  });

  // Conectamos las flechas personalizadas del carrusel
  document.querySelector('.flickity-prev-next-button.previous').addEventListener('click', function() {
      flkty.previous();
  });

  document.querySelector('.flickity-prev-next-button.next').addEventListener('click', function() {
      flkty.next();
  });

  // Validación de formulario
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

      const email = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert('Por favor, ingrese un email válido.');
          return false;
      }

      const telefono = document.getElementById('telefono').value.trim();
      if (telefono.length < 9 || isNaN(telefono)) {
          alert('Por favor, ingrese un teléfono válido con el código de área (al menos 9 dígitos).');
          return false;
      }

      return true;
  }

  // Habilitar/deshabilitar botón de envío en base a términos
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
});

document.getElementById('finalizar-compra').addEventListener('click', function() {
  // Mostrar el mensaje de compra exitosa
  alert('Compra procesada con éxito');
  
  // Redirigir al inicio de la página
  window.location.href = 'index.html'; // Cambia 'index.html' por la URL que desees
  
  // Opcionalmente, puedes cerrar la ventana (si está permitida por el navegador)
  // window.close();
});

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
      cart.push(product);
      cartCount.textContent = cart.length;
      Swal.fire({
          icon: 'success',
          title: '¡Producto agregado al carrito!',
          text: `Has añadido "${product.name}" al carrito.`,
          showConfirmButton: false,
          timer: 1500
      });
  }

  function showCartModal() {
    $('#cartModal').modal('show');
 }
 
 cartButton.addEventListener('click', showCartModal);
}