function onFormSubmit(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  const form = event.currentTarget;

  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());

  const url = form.action;

  fetch(url, { method: 'POST', body: JSON.stringify(value) })
    .then((response) => response.json())
    .then((data) => {
      window.location.replace(`/Minimal-Summary.html?id=${data.id}`);
    })
    .catch((error) => alert(`We have an error ${error}`));
}

document.getElementById('giftmate-form').addEventListener('submit', onFormSubmit);
