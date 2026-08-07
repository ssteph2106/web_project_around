export class Card {
    cardData;
    templateSelector;
    handleCardClick;
    handleCardLike;
    handleDeleteClick;
    likeButton;
    currentUserId;
    cardElement;
    constructor(cardData, templateSelector, handleCardClick, currentUserId, handleCardLike, handleDeleteClick) {
        this.cardData = cardData;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleCardLike = handleCardLike;
        this.handleDeleteClick = handleDeleteClick;
        this.currentUserId = currentUserId;
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
            const isLiked = cardLikeBtn.classList.contains("card__like-button_is-active");
            this.handleCardLike(this, isLiked);
        });
        if (cardDeleteBtn) {
            cardDeleteBtn.addEventListener("click", () => {
                this.handleDeleteClick(this);
            });
        }
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.cardData.name, this.cardData.link);
        });
    }
    updateLikes(isLiked) {
        if (isLiked) {
            this.likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this.likeButton.classList.remove("card__like-button_is-active");
        }
    }
    getView() {
        this.cardElement = this._getTemplate();
        const deleteButton = this.cardElement.querySelector(".card__delete-button");
        if (!this.isOwner(this.currentUserId)) {
            deleteButton.remove();
        }
        const cardName = this.cardElement.querySelector(".card__title");
        const cardImage = this.cardElement.querySelector(".card__image");
        cardName.textContent = this.cardData.name;
        cardImage.src = this.cardData.link;
        cardImage.alt = this.cardData.name;
        this.likeButton = this.cardElement.querySelector(".card__like-button");
        this.updateLikes(this.cardData.isLiked);
        this._setEventListeners(this.cardElement);
        return this.cardElement;
    }
    getId() {
        return this.cardData._id;
    }
    deleteCard() {
        this.cardElement.remove();
    }
    isOwner(userId) {
        return this.cardData.owner === userId;
    }
}
//# sourceMappingURL=Card.js.map