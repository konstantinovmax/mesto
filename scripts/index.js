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

const elementTemplate = document.querySelector('.template-element').content.querySelector('.element');
const elements = document.querySelector('.elements');

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
    resetModal();
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editElementModal);
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(event.target.closest('.modal'));
}

function addElementSubmitHandler(evt) {
    evt.preventDefault();
    resetModal();
    console.log(placeInput.value, urlInput.value);
    renderElement({name: placeInput.value, link: urlInput.value});
    closeModal(addElementModal);
}

function createElement(data) {
    const elementItem = elementTemplate.cloneNode(true);
    const elementImage = elementItem.querySelector('.element__image');
    const elementCaption = elementItem.querySelector('.element__caption');
    const elementLike = elementItem.querySelector('.element__like');
    const elementDelete = elementItem.querySelector('.element__delete');

    elementLike.addEventListener('click', function (e) {
        const likeActive = e.target;
        likeActive.classList.toggle('element__like_active'); 
    });

    elementDelete.addEventListener('click', function (e) {
        const deleteElement = e.target;
        deleteElement.closest('.element').remove();
    })

    elementImage.addEventListener('click', () => {
        handleImageClick(data.name, data.link);
    });

    elementCaption.textContent = data.name;
    elementImage.src = data.link;
    elementImage.alt = data.name;

    return elementItem;
}

function handleImageClick(name, link) {
    pictureModalImage.src = link; 
    pictureModalCaption.textContent = name;
    openModal(pictureModal);
}

function renderElement(data) {
    elements.prepend(createElement(data));
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
})

initialCards.forEach((data) => {
    renderElement(data);
})