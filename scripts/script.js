let openModalButton = document.querySelector('.profile__edit-button');
let closeModalButton = document.querySelector('.modal__close-button');
let modal = document.querySelector('.modal');

let formElement = modal.querySelector('.modal__container');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let nameInput = document.querySelector('.modal__input_type_name');
let descriptionInput = document.querySelector('.modal__input_type_description');

function openModal() {
    modal.classList.add('modal_is-open');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function closeModal() {
    modal.classList.remove('modal_is-open');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal();
}

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
formElement.addEventListener('submit', formSubmitHandler);