document.querySelector('#giftmate-form').addEventListener('submit', function() {
    event.preventDefault()
    alert(this.elements.name.value)
  });