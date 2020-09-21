import { Card } from './Card.js';
import { formValidation, FormValidator, resetModal } from './FormValidator.js';

const modal = document.querySelector('.modal');
const editElementModal = document.querySelector('.modal_type_edit-profile');
const addElementModal = document.querySelector('.modal_type_add-element');
const pictureModal = document.querySelector('.modal_type_picture');

const editFormElement = editElementModal.querySelector('.modal__container');
const addFormElement = addElementModal.querySelector('.modal__container');

const openModalEditButton = document.querySelector('.profile__edit-button');
const openModalAddButton = document.querySelector('.profile__add-button');

const addElementCloseModalButton = addElementModal.querySelector('.modal__close-button');
const editElementCloseModalButton = editElementModal.querySelector('.modal__close-button');
const pictureCloseModal = pictureModal.querySelector('.modal__close-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const nameInput = editFormElement.querySelector('.modal__input_type_name');
const descriptionInput = editFormElement.querySelector('.modal__input_type_description');

const placeInput = addFormElement.querySelector('.modal__input_type_place');
const urlInput = addFormElement.querySelector('.modal__input_type_url');

const pictureModalCaption = pictureModal.querySelector('.modal__caption');
const pictureModalImage = pictureModal.querySelector('.modal__image');

const cardSelector = '.template-element';
const sectionElements = document.querySelector('.elements');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const formList = Array.from(document.querySelectorAll(formValidation.formSelector));
    formList.forEach((formElement) => {
    const formValidator = new FormValidator(formValidation, formElement);
    formValidator.enableValidation();
});

function openModal(modal) {
    modal.classList.add('modal_is-open');
    document.addEventListener('keydown', closeEscapeButton);
    document.addEventListener('mousedown', closeOverlayClick);
}

function closeModal(modal) {
    modal.classList.remove('modal_is-open');
    document.removeEventListener('keydown', closeEscapeButton);
    document.removeEventListener('mousedown', closeOverlayClick);
}

function closeEscapeButton(evt) {
    const modal = document.querySelector('.modal_is-open');
    if (evt.key === 'Escape') {
        closeModal(modal);
    }
}

function closeOverlayClick(evt) {
    const modal = document.querySelector('.modal_is-open');
    if (evt.target.classList.contains('modal')) {
        closeModal(modal);
    }
}

function editElementModalToggle() {
    resetModal(modal, formValidation);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editElementModal);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(event.target.closest('.modal_type_edit-profile'));
}

function addElementSubmitHandler (evt) {
    evt.preventDefault();
    const cards = {
        name: placeInput.value,
        link: urlInput.value
    }
    renderElement(cards, cardSelector);
    closeModal(addElementModal);
    resetModal(addElementModal, formValidation);
}

function renderElement(item, cardSelector) {
    const card = new Card(item, cardSelector, openModal, pictureModal, pictureModalImage, pictureModalCaption);
    const cardElement = card.generateCard();
    sectionElements.prepend(cardElement);
}

editFormElement.addEventListener('submit', formSubmitHandler);
addFormElement.addEventListener('submit', addElementSubmitHandler);

openModalEditButton.addEventListener('click', () => {
    editElementModalToggle(editElementModal);
});

editElementCloseModalButton.addEventListener('click', () => {
    closeModal(editElementModal);
});

openModalAddButton.addEventListener('click', () => {
    openModal(addElementModal);
});

addElementCloseModalButton.addEventListener('click', () => {
    closeModal(addElementModal);
});

pictureCloseModal.addEventListener('click', () => {
    closeModal(pictureModal);
});

initialCards.forEach((item) => {
    renderElement(item, cardSelector);
});