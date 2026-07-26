export class Popup {
    popupElement;
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }
    open(name, link) {
        this.popupElement.classList.add("popup_is-opened");
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
    }
    handleEscClose(evt) {
        if (evt.key === "Escape" &&
            this.popupElement.classList.contains("popup_is-opened")) {
            this.close();
        }
    }
    setEventListeners() {
        const popupCloseBtn = this.popupElement.querySelector(".popup__close");
        document.addEventListener("keydown", (evt) => {
            console.log(evt.key);
            this.handleEscClose(evt);
        });
        popupCloseBtn?.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}
//# sourceMappingURL=Popup.js.map