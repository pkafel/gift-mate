function showUserPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const nonce = urlParams.get('id');

    fetch(`/.netlify/functions/users/${nonce}`, { method: 'GET' })
        .then((response) => {
            if(response.status == 410) {
                document.getElementById('url-not-used-message').style.display = 'none';
            } else {
                document.getElementById('url-used-message').style.display = 'none';
                data = response.json();
                document.getElementById('gifter').textContent = data.gifter_name;
                document.getElementById('giftee').textContent = data.giftee_name;
            }
        })
        .catch((error) => {
            alert(`We have an error ${error}`)
        });
}

document.addEventListener("DOMContentLoaded", showUserPage);
