import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {

private formElement: HTMLFormElement;    
private handleConfirmation!: () => Promise<void>;

    constructor(popupSelector: string) {
        super (popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
    }

   public setSubmitAction(action: () => Promise<void>): void {
    this.handleConfirmation = action;
    }

    private async _handleSubmit(evt:SubmitEvent): Promise<void> {
        evt.preventDefault();
        await this.handleConfirmation();
    }

    public override setEventListeners(): void {
        super.setEventListeners();

        this.formElement.addEventListener("submit", this._handleSubmit.bind(this));
    }

    public override close(): void {
    super.close();
    this.handleConfirmation = async () => {};
}
}
