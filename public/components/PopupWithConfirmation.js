import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    formElement;
    handleConfirmation;
    constructor(popupSelector) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
    }
    setSubmitAction(action) {
        this.handleConfirmation = action;
    }
    async _handleSubmit(evt) {
        evt.preventDefault();
        await this.handleConfirmation();
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", this._handleSubmit.bind(this));
    }
    close() {
        super.close();
        this.handleConfirmation = async () => { };
    }
}
//# sourceMappingURL=PopupWithConfirmation.js.map