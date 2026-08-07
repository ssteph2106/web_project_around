export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  isLiked: boolean;
}  

export class Card {   
private cardData: CardData;    
private templateSelector: string;
private handleCardClick: (name:string, link:string) => void;
private handleCardLike: (card: Card, isLiked:boolean) => Promise<void>;
private handleDeleteClick: (card: Card) => void;
private likeButton!: HTMLButtonElement;
private currentUserId: string;
private cardElement!: HTMLElement;

constructor(
    cardData: CardData, 
    templateSelector: string, 
    handleCardClick: (name:string, link:string) => void,
    currentUserId: string,
    handleCardLike: (card: Card, isLiked:boolean) => Promise<void>,
    handleDeleteClick: (card: Card) => void,
)
    {
this.cardData = cardData;       
this.templateSelector = templateSelector;
this.handleCardClick = handleCardClick;
this.handleCardLike = handleCardLike;
this.handleDeleteClick = handleDeleteClick;
this.currentUserId = currentUserId
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
    const isLiked = cardLikeBtn.classList.contains("card__like-button_is-active");
    this.handleCardLike(this, isLiked);
})

if (cardDeleteBtn) {
    cardDeleteBtn.addEventListener("click", () => {
        this.handleDeleteClick(this);
    });
}

cardImage.addEventListener("click", () => {
this.handleCardClick(
    this.cardData.name,
    this.cardData.link,
);
})
}  

public updateLikes(isLiked: boolean): void {
    if (isLiked) {
        this.likeButton.classList.add("card__like-button_is-active");
    } else {
        this.likeButton.classList.remove("card__like-button_is-active");
    }
}

getView(): HTMLElement {
this.cardElement = this._getTemplate();
const deleteButton = this.cardElement.querySelector(".card__delete-button") as HTMLButtonElement;

if (!this.isOwner(this.currentUserId)) {
    deleteButton.remove();
}
const cardName = this.cardElement.querySelector(".card__title") as HTMLElement;
const cardImage = this.cardElement.querySelector(".card__image") as HTMLImageElement;
cardName.textContent = this.cardData.name;
cardImage.src = this.cardData.link;
cardImage.alt = this.cardData.name;
this.likeButton = this.cardElement.querySelector(".card__like-button") as HTMLButtonElement;
this.updateLikes(this.cardData.isLiked);
this._setEventListeners(this.cardElement);

return this.cardElement;

}

public getId(): string {
    return this.cardData._id
}

public deleteCard(): void {
    this.cardElement.remove();
}

public isOwner(userId: string): boolean {
    return this.cardData.owner === userId;
}

}
