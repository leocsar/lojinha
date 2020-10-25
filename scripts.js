const content = document.getElementById('content');
const wppButton = document.getElementById('wpp-button');
const cartItems = document.getElementById('cart-items');

const products = [
  { "price": 10.00, "type": "livro", "name": "The Walking Dead - A ascensão do governador" },
  { "price": 10.00, "type": "livro", "name": "The Walking Dead - O caminho para woodbury" },
  { "price": 10.00, "type": "livro", "name": "Cidades de papel" },
  { "price": 10.00, "type": "livro", "name": "O teorema Katherine" },
  { "price": 10.00, "type": "livro", "name": "Quem é você Alasca" },
  { "price": 10.00, "type": "livro", "name": "A conspiração" },       
  { "price": 10.00, "type": "livro", "name": "O lado bom da vida" },
  { "price": 10.00, "type": "livro", "name": "Grandes Mestres - Toulouse Lautrec" },
  { "price": 10.00, "type": "livro", "name": "O livro do cinema" },
  { "price": 10.00, "type": "livro", "name": "Réquiem para Cézanne" },
  { "price": 10.00, "type": "filme", "name": "Trilogia Matrix - Box" },
  { "price": 10.00, "type": "filme", "name": "Trilogia O senhor dos anéis - Box" },
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

const refreshCart = () => {
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
  let buttonText = document.createTextNode('+');
  let titleText = document.createTextNode(product.name);

  let message = window.encodeURIComponent(`Olá!\n\nTenho interesse no ${product.type} *${product.name}*`);

  link.setAttribute('href', `https://api.whatsapp.com/send?phone=556282067934&text=${message}`)

  button.onclick = () => {
    addToCart(product);
  }

  card.setAttribute('class', 'default-display card');
  title.setAttribute('class', 'default-display');
  button.setAttribute('class', 'default-display');

  button.appendChild(buttonText);
  title.appendChild(titleText);

  image.setAttribute('src', `./images/${product.name}.jpg`);
  image.setAttribute('alt', product.name);

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(button);

  content.appendChild(card);
})