export interface CardData {
name:string
link: string   
}

export class Card {   
private cardData: CardData;    
private templateSelector: string;
private handleCardClick: (name:string, link:string) => void;


    constructor(
    cardData: CardData, 
    templateSelector: string, 
    handleCardClick: (name:string, link:string) => void,
    ) 
    {
this.cardData = cardData;       
this.templateSelector = templateSelector;
this.handleCardClick = handleCardClick;
    }

private _getTemplate(): HTMLElement {
const template = document.querySelector(this.templateSelector) as HTMLTemplateElement;
const cardElement = template.content.querySelector(".card")?.cloneNode(true) as HTMLElement;   

return cardElement
}    


private _setEventListeners (cardElement: HTMLElement) {
const cardLikeBtn = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
const cardDeleteBtn = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;
const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;


cardLikeBtn.addEventListener("click", () => {  
cardLikeBtn.classList.toggle("card__like-button_is-active");
})


cardDeleteBtn.addEventListener("click", () => {
cardElement.remove();
})


cardImage.addEventListener("click", () => {
this.handleCardClick(
    this.cardData.name,
    this.cardData.link,
);
})
}  

getView(): HTMLElement {
const cardElement = this._getTemplate();
const cardName = cardElement.querySelector(".card__title") as HTMLElement;
const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;

cardName.textContent = this.cardData.name;
cardImage.src = this.cardData.link;
cardImage.alt = this.cardData.name;

this._setEventListeners(cardElement);

return cardElement;

}
}
