export class FormValidator {
    config;
    formElement;
    inputList;
    buttonElement;
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    showInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.buttonElement.classList.add(this.config.inactiveButtonClass);
            this.buttonElement.setAttribute("disabled", "");
        }
        else {
            this.buttonElement.classList.remove(this.config.inactiveButtonClass);
            this.buttonElement.removeAttribute("disabled");
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    }
    resetValidation() {
        this.formElement.reset();
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
//# sourceMappingURL=FormValidator.js.map