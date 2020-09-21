const formValidation = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
}

function resetModal(modal, formValidation) {
  const formElement = modal.querySelector(formValidation.formSelector);
  if (formElement !== null) {
    formElement.reset();
    const buttonElement = formElement.querySelector(formValidation.submitButtonSelector);
    const inputList = Array.from(document.querySelectorAll(formValidation.inputSelector));
    inputList.forEach(function(inputElement){
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

class FormValidator {
  constructor(formValidation, formElement) {
    this._formValidation = formValidation;
    this._formElement = formElement;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._formValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formValidation.errorClass);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formValidation.inputErrorClass);
    errorElement.classList.remove(this._formValidation.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (formElement, inputElement, formValidation) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, formValidation);
    } else {
      this._hideInputError(formElement, inputElement, formValidation);
    }
  }

  _toggleButtonState = (inputList, buttonElement, formValidation) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(formValidation.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(formValidation.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', '');
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _setEventListeners(formElement, formValidation) {
    const inputList = Array.from(formElement.querySelectorAll(formValidation.inputSelector));
    const buttonElement = formElement.querySelector(formValidation.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, formValidation);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, formValidation);
        this._toggleButtonState(inputList, buttonElement, formValidation);
        });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._formValidation);
  }
}

export { formValidation, FormValidator, resetModal }