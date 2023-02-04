document.getElementById('giftmate-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const form = event.currentTarget;

    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    const url = form.action;

    const response = await fetch(url, { method: 'POST', body: JSON.stringify(value) })
      .then(response => alert(JSON.stringify(response.json())));

    alert(JSON.stringify(value));
  });
