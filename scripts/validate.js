const formValidation = {
  formSelector: '.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidation.errorClass);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formValidation.inputErrorClass);
  errorElement.classList.remove(formValidation.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, formValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formValidation);
  } else {
    hideInputError(formElement, inputElement, formValidation);
  }
}

const setEventListeners = (formElement, formValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(formValidation.inputSelector));
  const buttonElement = formElement.querySelector(formValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formValidation);
      toggleButtonState(inputList, buttonElement, formValidation);
    })
  })
}

function enableValidation(formValidation) {
  const formList = Array.from(document.querySelectorAll(formValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formValidation);
  })
}

enableValidation(formValidation);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, formValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(formValidation.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
}

function resetModal() {
  const formElement = modal.querySelector(formValidation.formSelector);
  if (formElement !== null) {
    formElement.reset();
    const buttonElement = formElement.querySelector(formValidation.submitButtonSelector);
    const inputList = Array.from(document.querySelectorAll(formValidation.inputSelector));
    inputList.forEach(function(inputElement){
      inputElement.classList.remove(formValidation.inputErrorClass);
      const errorElement = document.querySelector(`#${inputElement.id}-error`);
      errorElement.classList.remove(formValidation.errorClass);
    })
    if (!buttonElement.classList.contains('modal__button-add')) {
      buttonElement.classList.remove(formValidation.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', '');
    } else {
      buttonElement.classList.add(formValidation.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    }
  }
}