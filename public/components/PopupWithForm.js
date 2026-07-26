import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        const inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        const inputValues = {
            name: "",
            about: ""
        };
        inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this.getInputValues();
            this.handleFormSubmit(inputValues);
            this.close();
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map