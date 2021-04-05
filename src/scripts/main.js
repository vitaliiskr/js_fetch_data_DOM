'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/:';

// write your code here
function getPhones() {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => resolve(response.json()));

    setTimeout(() => {
      reject(new Error('something wrong'));
    }, 5000);
  });
};

function getPhoneDetails(ids) {
  return ids.map(id => fetch(`${detailsUrl}${id}.json`));
}

function renderPhones(phones) {
  const phonesList = document.createElement('ul');

  document.body.append(phonesList);

  const ids = phones.map(phone => {
    const phoneElement = document.createElement('li');

    phoneElement.textContent = phone.name;
    phonesList.append(phoneElement);

    return phone.id;
  });

  return ids;
}

getPhones()
  .then(renderPhones)
  .then(getPhoneDetails)
  .catch(() => new Error());
