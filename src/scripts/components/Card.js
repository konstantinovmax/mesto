export default class Card {
    constructor(data, cardSelector, openModal, pictureModal, pictureModalImage, pictureModalCaption) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openModal = openModal;
        this._pictureModal = pictureModal;
        this._pictureModalImage = pictureModalImage;
        this._pictureModalCaption = pictureModalCaption;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .cloneNode(true)

        return cardElement;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.element__like').addEventListener('click', (e) => {
            this._elementLike(e);
        });
        this._cardElement.querySelector('.element__delete').addEventListener('click', (e) => {
            this._elementDelete(e);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _elementDelete(e) {
        const deleteElement = e.target;
        deleteElement.closest('.element').remove();
    }

    _elementLike(e) {
        const likeActive = e.target;
        likeActive.classList.toggle('element__like_active');
    }

    _handleImageClick() {
        this._pictureModalImage.src = this._link;
        this._pictureModalCaption.textContent = this._name;
        this._pictureModalImage.alt = this._name;
        this._openModal(this._pictureModal);
    }

    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector('.element__caption').textContent = this._name;
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;

        this._setEventListeners();

        return this._cardElement;
    }
}