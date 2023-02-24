function showLoteryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('id');

    fetch(`/.netlify/functions/lotteries/${uuid}`, { method: 'GET' })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var tbodyRef = document.getElementsByTagName('tbody')[0];
            data.participants.forEach(participant => {
                console.log({ participant });
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

document.addEventListener("DOMContentLoaded", showLoteryPage);
