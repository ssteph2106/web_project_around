import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    handleFormSubmit;
    submitButton;
    defaultButtonText;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.handleFormSubmit = handleFormSubmit;
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.defaultButtonText = this.submitButton.textContent ?? "";
    }
    getInputValues() {
        const inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        const inputValues = {};
        inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this.submitButton.textContent = "Guardando...";
        }
        else {
            this.submitButton.textContent = this.defaultButtonText;
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this.getInputValues();
            this.handleFormSubmit(inputValues);
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map