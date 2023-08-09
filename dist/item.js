import { ItemsRecord } from "./constants";
export default class Item {
    type;
    currentStackSize;
    name;
    maxStackSize;
    constructor(type, currentStackSize = 1) {
        this.type = type;
        this.currentStackSize = currentStackSize;
        if (!ItemsRecord[type]) {
            throw new Error("Invalid item type provided");
        }
        this.name = ItemsRecord[type].name;
        this.maxStackSize = ItemsRecord[type].maxStackSize;
    }
    canStackWith(item) {
        return this.type === item.type;
    }
    stack(item) {
        if (this.type !== item.type) {
            throw new Error("Different item types can't be stacked");
        }
        const total = this.currentStackSize + item.currentStackSize;
        if (total <= this.maxStackSize) {
            this.currentStackSize = total;
            item.currentStackSize = 0;
        }
        else {
            const overflow = total - this.maxStackSize;
            this.currentStackSize = this.maxStackSize;
            item.currentStackSize = overflow;
        }
    }
}
