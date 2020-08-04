const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// ========================== Fetch random user and add money
const getRandomUser = async () => {
  const resp = await fetch('https://randomuser.me/api');
  const data = await resp.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
};

// ========================== Double everyones money
const doubleMoney = () => {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// ========================== Filter only millionaires
const showMillionaires = () => {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
};

// ========================== Sort users by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

// ========================== Calculate the total wealth
const calculateWealth = () => {
  const totalWealth = data.reduce((acc, user) => acc + user.money, 0);
  
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  
  if (!main.lastChild.innerHTML.startsWith('<h3>')) {
    main.appendChild(wealthEl);
  }
};

// ========================== Add new obj to data array
const addData = obj => {
  data.push(obj);

  updateDOM();
};

// ========================== Update DOM
const updateDOM = (providedData = data) => {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    const { name, money } = item;
    element.classList.add('person');
    element.innerHTML = `<strong>${name}</strong> ${formatMoney(money)}`;
    main.appendChild(element);
  });
};

// ========================== Format number as money
const formatMoney = number => {
  /*
    --- solution 1
    (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
  */

  // --- solution 2
  // Create our number formatter.
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(number); /* $2,500.00 */
};

getRandomUser();
getRandomUser();
getRandomUser();

// ========================== Event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
