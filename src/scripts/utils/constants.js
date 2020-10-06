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

const formValidation = {
    formSelector: '.modal__container',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__input-error_active'
}

export { modal, editElementModal, addElementModal,
         pictureModal, editFormElement, addFormElement,
         openModalEditButton, openModalAddButton, addElementCloseModalButton,
         editElementCloseModalButton, pictureCloseModal, profileName,
         profileDescription, nameInput, descriptionInput,
         placeInput, urlInput, pictureModalCaption,
         pictureModalImage, cardSelector, sectionElements,
         initialCards, formValidation }