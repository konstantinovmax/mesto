export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick();
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