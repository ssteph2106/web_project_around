import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    popupImage;
    popupCaption;
    constructor(popupSelector) {
        super(popupSelector);
        this.popupImage = this.popupElement.querySelector(".popup__image");
        this.popupCaption = this.popupElement.querySelector(".popup__caption");
    }
    open(name, link) {
        this.popupImage.alt = name;
        this.popupImage.src = link;
        this.popupCaption.textContent = name;
        super.open();
    }
}
//# sourceMappingURL=PopupWithImage.js.map