export default class Modal {
    constructor(modalSelector) {
        this._modalSelector = modalSelector;
        this._formElement = document.querySelector(this._modalSelector);
        this._closeButton = this._formElement.querySelector('.modal__close-button');
    }

    open() {
        this._formElement.classList.add('modal_is-open');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._formElement.addEventListener('mousedown', (evt) => this._closeOverlay(evt));
    }

    close() {
        this._formElement.classList.remove('modal_is-open');
        document.removeEventListener('keydown', () => this._handleEscClose());
        this._formElement.removeEventListener('mousedown', () => this._closeOverlay());
    }

    _handleEscClose(evt) {
        const modal = document.querySelector('.modal_is-open');
        if (evt.key === 'Escape') {
            this.close(modal);
        }
    }

    _closeOverlay(evt) {
        const modal = document.querySelector('.modal_is-open');
        if (evt.target.classList.contains('modal')) {
            this.close(modal);
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
    }
}