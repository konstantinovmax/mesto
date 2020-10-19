import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(modalSelector, handleFormSubmit, resetModal) {
        super(modalSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._resetModal = resetModal;
        this._submitButton = this._modal.querySelector('.modal__save-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._inputList = this._modal.querySelectorAll('.modal__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues()); 
        });
    }

    close() {
        super.close();
        this._resetModal();
    }

    startLoading() {
        this._submitButton.textContent = 'Сохранение...';
    }

    finishLoading() {
        this._submitButton.textContent = this._submitButtonText;
    }
}