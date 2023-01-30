document.querySelector('#giftmate-form').addEventListener('submit', function(event) {
    event.preventDefault()
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    alert(JSON.stringify(value))
  });
