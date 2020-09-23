const formValidation = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
}

class FormValidator {
  constructor(formValidation, formElement) {
    this._formValidation = formValidation;
    this._formSelector = formValidation.formSelector;
    this._inputSelector = formValidation.inputSelector;
    this._submitButtonSelector = formValidation.submitButtonSelector;
    this._inactiveButtonClass = formValidation.inactiveButtonClass;
    this._inputErrorClass = formValidation.inputErrorClass;
    this._errorClass = formValidation.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', '');
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  }

  resetModal = (modal, formValidation) => {
    const formElement = modal.querySelector(formValidation.formSelector);
    if (formElement !== null) {
      formElement.reset();
      const buttonElement = formElement.querySelector(formValidation.submitButtonSelector);
      const inputList = Array.from(document.querySelectorAll(formValidation.inputSelector));
      inputList.forEach(function(inputElement) {
        inputElement.classList.remove(formValidation.inputErrorClass);
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(formValidation.errorClass);
      });
      if (!buttonElement.classList.contains('modal__save-button-add')) {
        buttonElement.classList.remove(formValidation.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', '');
      } else {
        buttonElement.classList.add(formValidation.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
      }
    }
  }
}

export { formValidation, FormValidator }