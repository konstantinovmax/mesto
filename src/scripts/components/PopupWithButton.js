import Popup from './Popup.js';

export default class PopupWithButton extends Popup {
    constructor(modalSelector, handleFormSubmit) {
        super(modalSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', (evt) => {
            this._handleFormSubmit(evt);
        });
    }

    open(elementId, element) {
        this._cardId = elementId;
        this._cardItem = element;
        super.open();
    }
}
