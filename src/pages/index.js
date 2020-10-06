import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { modal, editElementModal, addElementModal,
    pictureModal, editFormElement, addFormElement,
    openModalEditButton, openModalAddButton, addElementCloseModalButton,
    editElementCloseModalButton, pictureCloseModal, profileName,
    profileDescription, nameInput, descriptionInput,
    placeInput, urlInput, pictureModalCaption,
    pictureModalImage, cardSelector, sectionElements,
    initialCards, formValidation } from '../scripts/utils/constants.js';

const formValidatorEditElement = new FormValidator(formValidation, editFormElement);
const formValidatorAddElement = new FormValidator(formValidation, addFormElement);

formValidatorEditElement.enableValidation();
formValidatorAddElement.enableValidation();

function openModal(modal) {
    modal.classList.add('modal_is-open');
    document.addEventListener('keydown', closeEscapeButton);
    document.addEventListener('mousedown', closeOverlayClick);
}

function closeModal(modal) {
    modal.classList.remove('modal_is-open');
    document.removeEventListener('keydown', closeEscapeButton);
    document.removeEventListener('mousedown', closeOverlayClick);
    formValidatorEditElement.resetModal(modal, formValidation);
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
    formValidatorEditElement.resetModal(modal, formValidation);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editElementModal);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(evt.target.closest('.modal_type_edit-profile'));
}

function addElementSubmitHandler (evt) {
    evt.preventDefault();
    const cards = {
        name: placeInput.value,
        link: urlInput.value
    }
    renderElement(cards, cardSelector);
    closeModal(addElementModal);
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