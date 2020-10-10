import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
    constructor(modalSelector, pictureModalImageSelector, pictureModalCaptionSelector) {
        super(modalSelector);
        this._pictureModalImage = pictureModalImageSelector;
        this._pictureModalCaption = pictureModalCaptionSelector;
    }

    open(data) {
        this._pictureModalImage.src = data._link;
        this._pictureModalCaption.textContent = data._name;
        this._pictureModalImage.alt = data._name;
        super.open();
    }
}