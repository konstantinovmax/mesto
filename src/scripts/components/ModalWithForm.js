import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
    constructor(modalSelector, handleFormSubmit) {
        super(modalSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll('.modal__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues()); 
        });
    }

    close() {
        super.close();
    }
}