function showUserPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const nonce = urlParams.get('id');

    fetch(`/.netlify/functions/users/${nonce}`, { method: 'GET' })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById('gifter').textContent = data.gifter_name;
            document.getElementById('giftee').textContent = data.giftee_name;
        })
        .catch((error) => alert(`We have an error ${error}`));
}

document.addEventListener("DOMContentLoaded", showUserPage);
