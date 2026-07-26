import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
private formElement: HTMLFormElement;
private handleFormSubmit: (data: Record<string, string>) => void;

constructor(

    popupSelector: string,
    handleFormSubmit: (data: Record<string, string>) => void,
){
super(popupSelector);
this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
this.handleFormSubmit = handleFormSubmit;

}

getInputValues () {
const inputList = Array.from(this.formElement.querySelectorAll<HTMLInputElement>(".popup__input"));
const inputValues: Record<string, string> = {
    name: "",
    about: ""
};
inputList.forEach((input) => {
inputValues[input.name] = input.value;
})
return inputValues;
}

override setEventListeners(): void {
super.setEventListeners();

this.formElement.addEventListener("submit", (evt) => {    
evt.preventDefault();

const inputValues = this.getInputValues();
this.handleFormSubmit(inputValues);
this.close();
});
}

override close(): void {
super.close();
this.formElement.reset();
}

}