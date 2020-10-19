export default class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteCard, handleLikeClick, myId) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
        this._myId = myId;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .cloneNode(true)

        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });
        if (this._ownerId === this._myId) {
            this._deleteButton.addEventListener('click', (evt) => {
                this._handleDeleteCard(evt);
            });
        }
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
        this.elementLike(this._data);
    }

    myLikes(data) {
        return data.likes.some(item => {
          return item._id === this._myId
        });
    }

    elementLike(newData) {
        if (this.myLikes(newData) || this._likeButton.classList.contains('element__like-button_active')) {
            this._likeButton.classList.toggle('element__like-button_active');
        }
        this._likeNumbers.textContent = newData.likes.length;
        this._data = newData;
    }

    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector('.element__caption').textContent = this._name;
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._likeNumbers = this._cardElement.querySelector('.element__like-numbers');
        this._deleteButton = this._cardElement.querySelector('.element__delete');
        if (this._ownerId === this._myId) {
            this._deleteButton.classList.add('element__delete_active');
        }
        
        this._setEventListeners();

        return this._cardElement;
    }
}