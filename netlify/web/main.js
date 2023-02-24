// Functions 

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;

async function onFormSubmit(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  const form = event.currentTarget;

  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());

  const url = form.action;

  fetch(url, { method: 'POST', body: JSON.stringify(value) })
    .then((response) => response.json())
    .then((data) => {
      // alert(JSON.stringify(data));
      window.location.replace(`/Minimal-Summary.html?id=${data.id}`);
    })
    .catch((error) => alert(`We have an error ${error}`));
}

function setStateofPageOnLoad(event) {
  if (window.location.pathname == '/Minimal-Summary.html') {
    showLoteryPage();
  } else if(window.location.pathname == '/Minimal-User.html') {
    showUserPage();
  } else if(window.location.pathname != '/Minimal-About.html'){
    showFormPage();
  }
}

function showFormPage() {
  document.getElementById('giftmate-form').addEventListener('submit', onFormSubmit);
}

function showLoteryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get('id');

  fetch(`/.netlify/functions/lotteries/${uuid}`, { method: 'GET'})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Im here!');
      console.log({data});

      var tbodyRef = document.getElementsByTagName('tbody')[0];
      data.participants.forEach(participant => {
        console.log({participant});
        const newRow = tbodyRef.insertRow();

        const nameCell = newRow.insertCell();
        var newText = document.createTextNode(participant.name);
        nameCell.appendChild(newText);

        const linkCell = newRow.insertCell();
        var newText = document.createTextNode(`${window.location.origin}/Minimal-User.html?id=${participant.nonce}`);
        linkCell.appendChild(newText);

        const viewedCell = newRow.insertCell();
        var newText = document.createTextNode(participant.viewed);
        viewedCell.appendChild(newText);
      });
    })
    .catch((error) => alert(`We have an error ${error}`));
}

function showUserPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const nonce = urlParams.get('id');

  fetch(`/.netlify/functions/users/${nonce}`, { method: 'GET'})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById('gifter').textContent = data.gifter_name;
      document.getElementById('giftee').textContent = data.giftee_name;
    })
    .catch((error) => alert(`We have an error ${error}`));
}

// Events - handler binding

document.addEventListener("DOMContentLoaded", setStateofPageOnLoad);
