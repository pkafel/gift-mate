// Functions 

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const lotteryPath = /^#lotteries\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const userPath = /^#users\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;

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
      alert(JSON.stringify(data));
      window.location.replace(`#lotteries/${data.id}`);
      showLoteryPage();
    })
    .catch((error) => alert(`We have an error ${error}`));
}

function setStateofPageOnLoad(event) {
  if (lotteryPath.test(window.location.href)) {
    showLoteryPage();
  } else if(userPath.test(window.location.href)) {
    showUserPage();
  } else {
    showFormPage();
  }
}

function showFormPage() {
  $('#giftmate-summary-table-div').hide();
  $('#giftmate-form-div').show();
}

function showLoteryPage() {
  $('#giftmate-form-div').hide();
  $('#giftmate-summary-table-div').show();
  const uuid = window.location.href.split("/").slice(-1);

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
        var newText = document.createTextNode(participant.nonce);
        linkCell.appendChild(newText);

        const viewedCell = newRow.insertCell();
        var newText = document.createTextNode(participant.viewed);
        viewedCell.appendChild(newText);
      });
    })
    .catch((error) => alert(`We have an error ${error}`));
}

function showUserPage() {
  // TBD
}

// Events - handler binding

document.addEventListener("DOMContentLoaded", setStateofPageOnLoad);

document.getElementById('giftmate-form').addEventListener('submit', onFormSubmit);