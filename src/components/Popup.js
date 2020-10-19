export default class Popup {
    constructor(modalSelector) {
        this._modalSelector = modalSelector;
        this._modal = document.querySelector(this._modalSelector);
        this._closeButton = this._modal.querySelector('.modal__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeOverlay = this._closeOverlay.bind(this);
    }

    open() {
        this._modal.classList.add('modal_is-open');
        document.addEventListener('keydown', this._handleEscClose);
        this._modal.addEventListener('mousedown', this._closeOverlay);
    }

    close() {
        this._modal.classList.remove('modal_is-open');
        document.removeEventListener('keydown', this._handleEscClose);
        this._modal.removeEventListener('mousedown', this._closeOverlay);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeOverlay(evt) {
        if (evt.target.classList.contains('modal')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
    }
}