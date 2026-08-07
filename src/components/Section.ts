import type { CardData } from "./Card.js"

export class Section {
private items: CardData[];
private renderer: (item:CardData) => void
private container: HTMLElement;

constructor(
{ items, renderer }: 
{ items: CardData[]; 
  renderer:(item: CardData) => void; 
},
container: string
){

this.items = items;
this.renderer = renderer; 
this.container = document.querySelector(container) as HTMLElement;       
}

renderItems(): void {
this.items.forEach((item) => {
this.renderer(item)    
})
}   
   
addItem(element: HTMLElement): void {
this.container.prepend(element)
}

setItems(items: CardData[]): void {
    this.items = items;
}

}