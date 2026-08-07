import type { DefaultFormConfig } from "../utils/constants.js";

export class FormValidator {
private config: DefaultFormConfig;
private formElement: HTMLFormElement;
protected inputList: HTMLInputElement[];
private buttonElement: HTMLButtonElement;

    constructor(
        config: DefaultFormConfig,
        formElement: HTMLFormElement)

       {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector)) as HTMLInputElement[];
    this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector) as HTMLButtonElement;
    }

    private showInputError(inputElement: HTMLInputElement):void {      
    const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`) as HTMLElement;
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.config.errorClass);
    }

    private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector(`.${inputElement.name}-input-error`) as HTMLElement;
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "" ;
    errorElement.classList.remove(this.config.errorClass);
    }

    private checkInputValidity(inputElement: HTMLInputElement): void {
        if (!inputElement.validity.valid) {
        this.showInputError(inputElement);    
        } else {
        this.hideInputError(inputElement);    
        }
    }

    private hasInvalidInput(): boolean {
       return this.inputList.some(
        (inputElement) => !inputElement.validity.valid
       )
    }

    private toggleButtonState(): void {
        if (this.hasInvalidInput()) {
        this.buttonElement.classList.add(this.config.inactiveButtonClass);
        this.buttonElement.setAttribute("disabled", "");
        } else {
        this.buttonElement.classList.remove(this.config.inactiveButtonClass);
        this.buttonElement.removeAttribute("disabled");  
    }
    }

    private setEventListeners(): void {
    this.toggleButtonState();
    this.inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
    this.checkInputValidity(inputElement);
    this.toggleButtonState();   
    })
    })
    }

    enableValidation(): void {
    this.setEventListeners();   
    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
    evt.preventDefault();   
    })
    }

    resetValidation(): void {
    this.formElement.reset();
    this.inputList.forEach((inputElement: HTMLInputElement) => {
    this.hideInputError(inputElement);
    });
    this.toggleButtonState();    
    }
}
