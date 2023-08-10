export default class Item {
    currentStackSize;
    title;
    icon;
    description;
    sellPrice;
    maxStackSize;
    constructor(itemData, currentStackSize = 1) {
        this.currentStackSize = currentStackSize;
        console.log(currentStackSize);
        this.title = itemData.title;
        this.icon = itemData.icon;
        this.description = itemData.description;
        this.sellPrice = itemData.sellPrice;
        this.maxStackSize = itemData.maxStackSize;
    }
    canStack(item) {
        if (item.title != this.title)
            return false;
        if (item.currentStackSize + this.currentStackSize > this.maxStackSize)
            return false;
        return true;
    }
}
