const content = document.getElementById('content');

const products = [
  { "type": "livro", "name": "The Walking Dead - A ascensão do governador" },
  { "type": "livro", "name": "The Walking Dead - O caminho para woodbury" },
  { "type": "livro", "name": "Cidades de papel" },
  { "type": "livro", "name": "O teorema Katherine" },
  { "type": "livro", "name": "Quem é você Alasca" },
  { "type": "livro", "name": "A conspiração" },       
  { "type": "livro", "name": "O lado bom da vida" },
  { "type": "livro", "name": "Grandes Mestres - Toulouse Lautrec" },
  { "type": "livro", "name": "O livro do cinema" },
  { "type": "livro", "name": "Réquiem para Cézanne" },
  { "type": "filme", "name": "Trilogia Matrix - Box" },
  { "type": "filme", "name": "Trilogia O senhor dos anéis - Box" },
  { "type": "filme", "name": "Kill Bill Volume I" },
  { "type": "filme", "name": "Kill Bill Volume II" },
  { "type": "filme", "name": "Pulp Fiction" },
  { "type": "filme", "name": "A lista de Schindler" },
  { "type": "filme", "name": "Birdman" },
  { "type": "filme", "name": "Donnie Brasco" },
  { "type": "filme", "name": "O expresso da meia noite" },
  { "type": "filme", "name": "Laranja Mecânica" },
  { "type": "filme", "name": "Scarface" }
];

products.map(product => {
  let card = document.createElement('div');
  let title = document.createElement('span');
  let image = document.createElement('img');
  let button = document.createElement('button');
  let link = document.createElement('a');
  let buttonText = document.createTextNode('Eu quero!');
  let titleText = document.createTextNode(product.name);

  let message = window.encodeURIComponent(`Olá!\n\nTenho interesse no ${product.type} *${product.name}*`);

  link.setAttribute('href', `https://api.whatsapp.com/send?phone=556282067934&text=${message}`)

  button.onclick = () => {
    link.click();
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