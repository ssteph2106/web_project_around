export type DefaultFormConfig = {
    inputSelector: string;
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
 } 
 
 export const defaultFormConfig: DefaultFormConfig = {
inputSelector: ".popup__input",
submitButtonSelector: ".popup__button",
inactiveButtonClass: "popup__button_disabled",
inputErrorClass: "form__input_type_error",
errorClass: "popup__input-error_active",
}

/**
 * El selector de los campos de entrada (inputs) ".popup__input"
 * El selector del botón de envío (submit) ".popup__button"
 * La clase CSS que desactiva el botón "popup__button_disabled"
 * La clase CSS que añade el estilo de error al input "form__input_type_error"
 * La clase CSS que hace visible el mensaje de error de texto "popup__input-error_active"
 */
