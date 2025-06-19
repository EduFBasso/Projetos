# 🧭 Entendendo o uso de `.map()` no React

## 📌 O que é `.map()`?

O método `.map()` do JavaScript percorre um array e **retorna um novo array**, baseado nos resultados da função aplicada a cada item.

```js
const nomes = ['Ana', 'Eduardo', 'Carlos'];

const saudacoes = nomes.map(nome => `Olá, ${nome}!`);
console.log(saudacoes);
// Resultado: ['Olá, Ana!', 'Olá, Eduardo!', 'Olá, Carlos!']
```

## ⚛️ Usando `.map()` no React para renderizar elementos

React usa `.map()` o tempo todo pra gerar elementos de tela dinamicamente com base em dados da API.

```jsx
const clientes = [
  { id: 1, name: 'João', email: 'joao@email.com' },
  { id: 2, name: 'Maria', email: 'maria@email.com' }
];

function ClientList