class Cart {
    constructor() {
      this.products = [];
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    removeProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId);
    }
  
    getProducts() {
      return this.products;
    }
  
    getTotal() {
      return this.products.reduce((total, product) => total + product.price, 0);
    }
  }
  
  const cart = new Cart();
  
  document.addEventListener('DOMContentLoaded', () => {
    const addProductButtons = document.querySelectorAll('.add-to-cart');
  
    addProductButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const productId = button.dataset.id;
        const product = {
          id: productId,
          name: button.closest('.card').querySelector('.card-title').textContent,
          price: parseFloat(button.closest('.card').querySelector('.card-text').textContent.replace('$', ''))
        };
        cart.addProduct(product);
        updateCartCount();
      });
    });
  
    function updateCartCount() {
      const cartCount = cart.getProducts().length;
      document.getElementById('cart-count').textContent = cartCount;
    }
  });