// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';

import { PREP_TIME } from './js/menu';

const form = document.querySelector('.form');
const list = document.querySelector('.order-log');

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

function addOrderRow(drink) {
  const fragment = document.createDocumentFragment();
  const li = document.createElement('li');
  li.classList.add('row-pending');
  const p = document.createElement('p');
  p.textContent = `⏳ ${drink} · у роботі…`;
  li.append(p);
  fragment.append(li);
  list.append(fragment);
  return li;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const drink = formData.get('drink');
  const state = formData.get('state');
  const delay = PREP_TIME[drink];

  let row = addOrderRow(drink);
  makeOrder(delay, state)
    .then(value => {
      row.className = 'row-ok';
      row.textContent = `✅ ${drink} · готове · ${value} ms`;
    })
    .catch(value => {
      row.className = 'row-err';
      row.textContent = `❌ ${drink} · скасовано · ${value} ms`;
    })
    .finally(() => {
      row.textContent += ` · ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
