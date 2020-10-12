import '../pages/index.css';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import { openModalEditButton, openModalAddButton, editFormElement,
    addFormElement, nameInput, descriptionInput,
    pictureModalImage, pictureModalCaption, elementsSection,
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
    elementsSection
);

cardsList.renderItems();


const modalOpenImage = new PopupWithImage(pictureModal, pictureModalImage, pictureModalCaption);
modalOpenImage.setEventListeners();


const modalEditProfile = new PopupWithForm(
    editElementModal,
    function handleFormSubmit(newUserInfo) {
        userInfo.setUserInfo(newUserInfo);
        modalEditProfile.close();
    },
    () => formValidatorEditElement.resetModal()
);

modalEditProfile.setEventListeners();
openModalEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.profileName;
    descriptionInput.value = userData.profileDescription;
    modalEditProfile.open();
});


const modalAddPlace = new PopupWithForm(
    addElementModal,
    function handleFormSubmit(cardInfo) {
        const formElement = createCard(cardInfo);
        cardsList.addItem(formElement);
        modalAddPlace.close();
    },
    () => formValidatorAddElement.resetModal()
);

modalAddPlace.setEventListeners();
openModalAddButton.addEventListener('click', () => {
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