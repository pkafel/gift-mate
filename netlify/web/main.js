// Functions 

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
  if (window.location.href.indexOf('#lotteries') > -1) {
    showLoteryPage();
  } else if(window.location.href.indexOf('#user') > -1) {
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
}

function showUserPage() {
  // TBD
}

// Events - handler binding

document.addEventListener("DOMContentLoaded", setStateofPageOnLoad);

document.getElementById('giftmate-form').addEventListener('submit', onFormSubmit);