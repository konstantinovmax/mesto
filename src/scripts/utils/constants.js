const openModalEditAvatarButton = document.querySelector('.profile__avatar-container');
const openModalEditButton = document.querySelector('.profile__edit-button');
const openModalAddButton = document.querySelector('.profile__add-button');
const editAvatarElement = document.querySelector('.modal__container_type_edit-avatar');
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
const editAvatarSelector = '.profile__avatar';
const editAvatarElementModal = '.modal_type_edit-avatar';
const editElementModal = '.modal_type_edit-profile';
const addElementModal = '.modal_type_add-element';
const deleteElementModal = '.modal_type_delete-element';
const pictureModal = '.modal_type_picture';

const formValidation = {
    formSelector: '.modal__container',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__save-button',
    inactiveButtonClass: 'modal__save-button_disabled',
    inputErrorClass: 'modal__input_type_error',
    errorClass: 'modal__input-error_active'
}

export { openModalEditAvatarButton, openModalEditButton, openModalAddButton,
        editAvatarElement, editFormElement, addFormElement,
        nameInput, descriptionInput, pictureModalImage,
        pictureModalCaption, elementsSection, cardSelector,
        profileName, profileDescription, editAvatarSelector,
        editAvatarElementModal, editElementModal, addElementModal,
        deleteElementModal, pictureModal, formValidation
}