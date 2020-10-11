const openModalEditButton = document.querySelector('.profile__edit-button');
const openModalAddButton = document.querySelector('.profile__add-button');
const editFormElement = document.querySelector('.modal__container_type_edit-profile');
const addFormElement = document.querySelector('.modal__container_type_add-element');
const nameInput = document.querySelector('.modal__input_type_name');
const descriptionInput = document.querySelector('.modal__input_type_description');
const pictureModalImage = document.querySelector('.modal__image');
const pictureModalCaption = document.querySelector('.modal__caption');

const elementsSection = '.elements';
const cardSelector = '.template-element';
const profileName = '.profile__name';
const profileDescription = '.profile__description';
const editElementModal = '.modal_type_edit-profile';
const addElementModal = '.modal_type_add-element';
const pictureModal = '.modal_type_picture';

const formValidation = {
    formSelector: '.modal__container',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__input-error_active'
}

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

export { openModalEditButton, openModalAddButton, editFormElement,
    addFormElement, nameInput, descriptionInput,
    pictureModalImage, pictureModalCaption, elementsSection,
    cardSelector, profileName, profileDescription,
    editElementModal, addElementModal, pictureModal,
    formValidation, initialCards
}