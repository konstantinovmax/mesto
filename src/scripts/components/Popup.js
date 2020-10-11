export default class Popup {
    constructor(modalSelector) {
        this._modalSelector = modalSelector;
        this._modal = document.querySelector(this._modalSelector);
        this._closeButton = this._modal.querySelector('.modal__close-button');
    }

    open() {
        this._modal.classList.add('modal_is-open');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._modal.addEventListener('mousedown', (evt) => this._closeOverlay(evt));
    }

    close() {
        this._modal.classList.remove('modal_is-open');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._modal.removeEventListener('mousedown', (evt) => this._closeOverlay(evt));
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