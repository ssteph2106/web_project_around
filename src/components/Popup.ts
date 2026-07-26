export class Popup {
protected popupElement: HTMLElement;

constructor(popupSelector: string){
this.popupElement = document.querySelector(popupSelector) as HTMLElement;        
    }

open(name?:string, link?:string):void {
this.popupElement.classList.add("popup_is-opened");
}   

close(): void {
this.popupElement.classList.remove("popup_is-opened")
}

private handleEscClose(evt: KeyboardEvent): void {
if (evt.key === "Escape" &&
    this.popupElement.classList.contains("popup_is-opened")
) {
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
    this.close()
});

this.popupElement.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
        this.close();
    }
})
}

}