import '../pages/index.css';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithButton from '../scripts/components/PopupWithButton.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import { openModalEditAvatarButton, openModalEditButton, openModalAddButton,
        editAvatarElement, editFormElement, addFormElement,
        nameInput, descriptionInput, pictureModalImage,
        pictureModalCaption, elementsSection, cardSelector,
        profileName, profileDescription, editAvatarSelector,
        editAvatarElementModal, editElementModal, addElementModal,
        deleteElementModal, pictureModal, formValidation
} from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
    headers: {
       authorization: '8105b806-1cac-45d8-8567-2a49d509e437',
       'content-type': 'application/JSON',
    },
});


const formValidatorEditAvatarElement = new FormValidator(formValidation, editAvatarElement);
const formValidatorEditElement = new FormValidator(formValidation, editFormElement);
const formValidatorAddElement = new FormValidator(formValidation, addFormElement);

formValidatorEditAvatarElement.enableValidation();
formValidatorEditElement.enableValidation();
formValidatorAddElement.enableValidation();


function infoAboutUser() {
    api
        .getUserInfo()
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

infoAboutUser();


function renderCards() {
    api
        .getAllCards()
        .then((res) => {
            cardsList.renderItems(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

renderCards();


const cardsList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
        },
    },
    elementsSection
);


const modalOpenImage = new PopupWithImage(pictureModal, pictureModalImage, pictureModalCaption);
modalOpenImage.setEventListeners();


const modalEditAvatar = new PopupWithForm(
    editAvatarElementModal,
    function handleFormSubmit(avatarName) {
        modalEditAvatar.startLoading();
        api
            .patchChangeAvatar(avatarName)
            .then((res) => {
                userInfo.setUserInfo(res);
                modalEditAvatar.close();
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                modalEditAvatar.finishLoading();
            });
    },
    () => formValidatorEditAvatarElement.resetModal()
);

modalEditAvatar.setEventListeners();
openModalEditAvatarButton.addEventListener('click', () => {
    modalEditAvatar.open();
});


const modalEditProfile = new PopupWithForm(
    editElementModal,
    function handleFormSubmit(newUserInfo) {
        modalEditProfile.startLoading();
        api
            .patchEditProfile(newUserInfo)
            .then((res) => {
                userInfo.setUserInfo(res);
                modalEditProfile.close();
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                modalEditProfile.finishLoading();
            });       
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
        modalAddPlace.startLoading();
        api
            .postCard(cardInfo)
            .then((res) => {
                const formElement = createCard(res);
                cardsList.addItem(formElement);
                modalAddPlace.close();
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                modalAddPlace.finishLoading();
            });        
    },
    () => formValidatorAddElement.resetModal()
);

modalAddPlace.setEventListeners();
openModalAddButton.addEventListener('click', () => {
    modalAddPlace.open();
});


const modalDeletePlace = new PopupWithButton(
    deleteElementModal,
    function handleFormSubmit(evt) {
        evt.preventDefault();
        api
            .deleteCard(this._cardId)
            .then(() => {
                this._cardItem.remove();
            })
            .catch((err) => {
                console.log(err);
            });
        modalDeletePlace.close();
    }
);

modalDeletePlace.setEventListeners();


const userInfo = new UserInfo({
    profileNameSelector: profileName,
    profileDescriptionSelector: profileDescription,
    avatarSelector: editAvatarSelector,
});


function createCard(cardInfo) {
    const card = new Card(
        cardInfo,
        cardSelector,
        function handleCardClick() {
            modalOpenImage.open(card);
        },
        function handleDeleteCard(evt) {
            const openElement = evt.target.closest('.element');
            modalDeletePlace.open(this._id, openElement);
        },
        function handleLikeClick() {
            if (!this.myLikes(this._data)) {
                api
                    .putLike(this._id)
                    .then((res) => {
                        this.elementLike(res);
                    })
                    .catch((err) => {
                        alert(err);
                    });  
            } else {
                api
                    .deleteLike(this._id)
                    .then((res) => {
                        this.elementLike(res);
                    })
                    .catch((err) => {
                        alert(err);
                    });    
            }
        },
        userInfo._myId
    );
    return card.generateCard();
}