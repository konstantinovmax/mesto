import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(modalSelector, pictureModalImage, pictureModalCaption) {
        super(modalSelector);
        this._pictureModalImage = pictureModalImage;
        this._pictureModalCaption = pictureModalCaption;
    }

    open(card) {
        this._pictureModalImage.src = card._link;
        this._pictureModalCaption.textContent = card._name;
        this._pictureModalImage.alt = card._name;
        super.open();
    }
}