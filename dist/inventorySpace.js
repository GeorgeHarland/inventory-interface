export default class InventorySpace {
    item;
    quantity;
    constructor(item, quantity = 0) {
        this.item = item;
        this.quantity = quantity;
    }
}
