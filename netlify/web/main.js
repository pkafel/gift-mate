document.getElementById('giftmate-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const form = event.currentTarget;

    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    const url = form.action;

    fetch(url, { method: 'POST', body: JSON.stringify(value) })
      .then((response) => window.location.replace("http://www.google.com"))
      .catch((error) => alert(`We have an error ${error}`));
});
