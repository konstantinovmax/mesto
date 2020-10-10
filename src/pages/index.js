import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import ModalWithImage from '../scripts/components/ModalWithImage.js';
import ModalWithForm from '../scripts/components/ModalWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import { openModalEditButton, openModalAddButton, editFormElement,
    addFormElement, nameInput, descriptionInput,
    pictureModalImage, pictureModalCaption, sectionElements,
    cardSelector, profileName, profileDescription,
    editElementModal, addElementModal, pictureModal,
    formValidation, initialCards
} from '../scripts/utils/constants.js';

const formValidatorEditElement = new FormValidator(formValidation, editFormElement);
const formValidatorAddElement = new FormValidator(formValidation, addFormElement);

formValidatorEditElement.enableValidation();
formValidatorAddElement.enableValidation();


const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
        },
    },
    sectionElements
);

cardsList.renderItems();


const modalOpenImage = new ModalWithImage(pictureModal, pictureModalImage, pictureModalCaption);
modalOpenImage.setEventListeners();


const modalEditProfile = new ModalWithForm(
    editElementModal,
    function handleFormSubmit(newUserInfo) {
        userInfo.setUserInfo(newUserInfo);
        modalEditProfile.close();
    },
);

modalEditProfile.setEventListeners();
openModalEditButton.addEventListener('click', () => {
    formValidatorEditElement.resetModal();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.profileName;
    descriptionInput.value = userData.profileDescription;
    modalEditProfile.open();
});


const modalAddPlace = new ModalWithForm(
    addElementModal,
    function handleFormSubmit(cardInfo) {
        const formElement = createCard(cardInfo);
        cardsList.addItem(formElement);
        modalAddPlace.close();
    },
);

modalAddPlace.setEventListeners();
openModalAddButton.addEventListener('click', () => {
    formValidatorAddElement.resetModal();
    modalAddPlace.open();
});


const userInfo = new UserInfo({
    profileNameSelector: profileName,
    profileDescriptionSelector: profileDescription,
});


function createCard(cardInfo) {
    const card = new Card(
        cardInfo,
        cardSelector,
        function handleCardClick() {
            modalOpenImage.open(card);
        },
    );
    return card.generateCard();
}