function onFormSubmit(event) {
  e.preventDefault();
  const form = event.currentTarget;

  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());

  const url = form.action;

  fetch(url, { method: 'POST', body: JSON.stringify(values) })
    .then((response) => response.json())
    .then((data) => {
      window.location.replace(`/Minimal-Summary.html?id=${data.id}`);
    })
    .catch((error) => alert(`We have an error ${error}`));
}

function validInput(inputs) {
  const name = inputs.name;
  const participants = inputs.participants;

  if (!name || name.trim() === "") {
    const inp = document.getElementById('name-6797');
    inp.setCustomValidity("Name of the lottery cannot be empty!");
    inp.reportValidity();
    return false;
  }

  return true;
}

// Form validation
let defaultConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'form-group',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'form-group',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-help'
};

var form = document.getElementById('giftmate-form');
var pristine = new Pristine(form, defaultConfig, false);

pristine.addValidator(document.getElementById('message-6797'), function (value) {
  const participantsArray = value.split(',');
  return participantsArray.length > 1;
}, "Lottery needs more than one participant", 2, false);

pristine.addValidator(document.getElementById('message-6797'), function (value) {
  const participantsArray = value.split(',');
  const participantsSet = new Set(participantsArray);
  return participantsArray.length === participantsSet.size;
}, "Same participant cannot be mentioned more than one time", 3, false);

// Handling form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  if (pristine.validate()) {
    onFormSubmit(e);
  }
});
