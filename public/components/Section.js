export class Section {
    items;
    renderer;
    container;
    constructor({ items, renderer }, container) {
        this.items = items;
        this.renderer = renderer;
        this.container = document.querySelector(container);
    }
    renderItems() {
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.prepend(element);
    }
}
//# sourceMappingURL=Section.js.map