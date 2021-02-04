const content           = document.getElementById('content');
const wppButton         = document.getElementById('wpp-button');
const goTopButton       = document.getElementById('go-top-button');
const cartItems         = document.getElementById('cart-items');
const modal             = document.getElementById('modal');
const opacityBackground = document.getElementById('opacity-background');
const cart              = document.getElementById('cart');
const cartContent       = document.getElementById('cart-content');
const closeModalButton  = document.getElementById('close-modal');
const sendButton        = document.getElementById('send');

const products = [
  { "price": 10.00, "type": "livro", "name": "O teorema Katherine" },
  { "price": 15.00, "type": "livro", "name": "A conspiração" },       
  { "price": 10.00, "type": "livro", "name": "O lado bom da vida" },
  { "price": 15.00, "type": "livro", "name": "Grandes Mestres - Toulouse Lautrec" },
  { "price": 10.00, "type": "livro", "name": "Réquiem para Cézanne" },
  { "price": 30.00, "type": "filme", "name": "Trilogia Matrix - Box" },
  { "price": 30.00, "type": "filme", "name": "Trilogia O senhor dos anéis - Box" },
  { "price": 10.00, "type": "filme", "name": "Kill Bill Volume I" },
  { "price": 10.00, "type": "filme", "name": "Kill Bill Volume II" },
  { "price": 10.00, "type": "filme", "name": "Pulp Fiction" },
  { "price": 10.00, "type": "filme", "name": "A lista de Schindler" },
  { "price": 10.00, "type": "filme", "name": "Birdman" },
  { "price": 10.00, "type": "filme", "name": "Donnie Brasco" },
  { "price": 10.00, "type": "filme", "name": "O expresso da meia noite" },
  { "price": 10.00, "type": "filme", "name": "Laranja Mecânica" },
  { "price": 10.00, "type": "filme", "name": "Scarface" }
];

const addToCart = (product) => {
  let items = JSON.parse(localStorage.getItem('cart')) || [];

  items.push(product);
  localStorage.setItem('cart', JSON.stringify(items));

  refreshCart();
}

const removeOfCart = (product) => {
  let items = JSON.parse(localStorage.getItem('cart')) || [];

  items = items.filter(item => {
    return item.name !== product.name;
  })

  localStorage.setItem('cart', JSON.stringify(items));

  refreshCart();
}

const refreshCart = () => {
  const items = getCartItems();

  if (items.length == 0) {
    cartContent.innerHTML = 'Carrinho vazio!';
    sendButton.setAttribute('disabled', 'true');
    sendButton.style.pointerEvents = 'none';
  } else {
    cartContent.innerHTML = '';
    sendButton.style.pointerEvents = 'all';
    sendButton.removeAttribute('disabled', 'false');

    items.map(item => {
      let card = document.createElement('div');
  
      card.setAttribute('class', 'cart-card');
      card.innerHTML = item.name;
  
      cartContent.appendChild(card);
    })
  }

  cartItems.innerHTML = getTotal().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

const getTotal = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (cart == null) {
    return 0;
  }

  const total = cart.reduce((total, numero) => {
    return total + numero.price;
  }, 0);

  return total;
}

const getCartItems = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (cart == null) {
    return [];
  }

  return cart;
}

const pageScroll = () => {
  window.scrollBy( 0, window.pageYOffset * -1 );
}

window.onload = () => {
  sendButton.onclick = () => {
    let message = 'Olá!\n\nTenho interesse nos seguintes itens da lojinha:\n\n';
    let link = document.createElement('a');
  
    getCartItems().map(item => {
      message += `${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} - ${item.type} ${item.name}\n`;
    })
  
    message += `\n*Total: ${getTotal().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}*`;
  
    message = window.encodeURIComponent(message);
    
    link.setAttribute('href', `https://api.whatsapp.com/send?phone=556282067934&text=${message}`)
    link.click();
  }
  
  cart.onclick = () => {
    modal.style.display = 'flex';
    opacityBackground.style.display = 'flex';
  }
  
  closeModalButton.onclick = () => {
    modal.style.display = 'none';
    opacityBackground.style.display = 'none';
  }
  
  refreshCart();
  
  wppButton.onclick = () => {
    let message = window.encodeURIComponent(`Olá!\n\nVim pela Lojinha`);
    let link = document.createElement('a');
  
    link.setAttribute('href', `https://api.whatsapp.com/send?phone=556282067934&text=${message}`)
    link.click();
  }
  
  products.map(product => {
    let card = document.createElement('div');
    let title = document.createElement('span');
    let image = document.createElement('img');
    let button = document.createElement('button');
    let link = document.createElement('a');
    let titleText = document.createTextNode(product.name);
    let price = document.createElement('div');
  
    let message = window.encodeURIComponent(`Olá!\n\nTenho interesse no ${product.type} *${product.name}*`);
  
    link.setAttribute('href', `https://api.whatsapp.com/send?phone=556282067934&text=${message}`)
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if ( cart.find(item => item.name == product.name) !== undefined ) {
      button.innerHTML = '&#10006;';
      button.style.fontSize = '25px';
    } else {
      button.innerHTML = '+';
      button.style.fontSize = '40px';
    }
  
    button.onclick = () => {
      if (button.innerHTML == '+') {
        addToCart(product);
        button.innerHTML = '&#10006;';
        button.style.fontSize = '25px';
      } else {
        removeOfCart(product);
        button.innerHTML = '+';
        button.style.fontSize = '40px';
      }
    }
  
    card.setAttribute('class', 'default-display card');
    title.setAttribute('class', 'default-display');
    button.setAttribute('class', 'default-display');
    price.setAttribute('class', 'price-card');
  
  
    price.innerHTML = product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    title.appendChild(titleText);
  
    image.setAttribute('src', `./images/${product.name}.jpg`);
    image.setAttribute('alt', product.name);
  
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(price);
    card.appendChild(button);
  
    content.appendChild(card);
  })

  goTopButton.onclick = () => {
    pageScroll();
  };

  document.body.onscroll = (e) => {
    goTopButton.style.opacity = window.pageYOffset > 1000 ? 1 : 0;
    goTopButton.disabled = !(window.pageYOffset > 1000);
  };
};
