export class Card {
    cardData;
    templateSelector;
    handleCardClick;
    constructor(cardData, templateSelector, handleCardClick) {
        this.cardData = cardData;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const template = document.querySelector(this.templateSelector);
        const cardElement = template.content.querySelector(".card")?.cloneNode(true);
        return cardElement;
    }
    _setEventListeners(cardElement) {
        const cardLikeBtn = cardElement.querySelector(".card__like-button");
        const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        cardLikeBtn.addEventListener("click", () => {
            cardLikeBtn.classList.toggle("card__like-button_is-active");
        });
        cardDeleteBtn.addEventListener("click", () => {
            cardElement.remove();
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.cardData.name, this.cardData.link);
        });
    }
    getView() {
        const cardElement = this._getTemplate();
        const cardName = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        cardName.textContent = this.cardData.name;
        cardImage.src = this.cardData.link;
        cardImage.alt = this.cardData.name;
        this._setEventListeners(cardElement);
        return cardElement;
    }
}
//# sourceMappingURL=Card.js.map