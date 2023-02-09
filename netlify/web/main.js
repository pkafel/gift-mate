document.getElementById('giftmate-form').addEventListener('submit', async function(event) {
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
      })
      .catch((error) => alert(`We have an error ${error}`));
});
