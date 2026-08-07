import { Popup } from "./Popup.js";

export class PopupWithForm<T> extends Popup {
private formElement: HTMLFormElement;
private handleFormSubmit: (data: T) => void;
private submitButton: HTMLButtonElement;
private defaultButtonText: string;

constructor(

    popupSelector: string,
    handleFormSubmit: (data: T) => void,
){
super(popupSelector);
this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
this.handleFormSubmit = handleFormSubmit;
this.submitButton = this.formElement.querySelector(".popup__button") as HTMLButtonElement;
this.defaultButtonText = this.submitButton.textContent ?? "";
}

getInputValues(): T {
const inputList = Array.from(this.formElement.querySelectorAll<HTMLInputElement>(".popup__input"));
const inputValues = {} as T;

inputList.forEach((input) => {
(inputValues as Record<string, string>)[input.name] = input.value;
})
return inputValues;
}

renderLoading(isLoading: boolean): void {
    if (isLoading) {
        this.submitButton.textContent = "Guardando...";
    } else {
        this.submitButton.textContent = this.defaultButtonText;
    }
}

override setEventListeners(): void {
super.setEventListeners();

this.formElement.addEventListener("submit", (evt) => {    
evt.preventDefault();

const inputValues = this.getInputValues();
this.handleFormSubmit(inputValues);
});
}

override close(): void {
super.close();
this.formElement.reset();
}

}