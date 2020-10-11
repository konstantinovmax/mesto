import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(modalSelector, pictureModalImage, pictureModalCaption) {
        super(modalSelector);
        this._pictureModalImage = pictureModalImage;
        this._pictureModalCaption = pictureModalCaption;
    }

    open(data) {
        this._pictureModalImage.src = data._link;
        this._pictureModalCaption.textContent = data._name;
        this._pictureModalImage.alt = data._name;
        super.open();
    }
}