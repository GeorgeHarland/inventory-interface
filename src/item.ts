import { ItemData } from "./types";

export default class Item {
  title: string;
  icon: string;
  description: string;
  sellPrice: number;
  maxStackSize: number;

  constructor(itemData: ItemData, public currentStackSize: number = 1) {
    console.log(currentStackSize);
    this.title = itemData.title;
    this.icon = itemData.icon;
    this.description = itemData.description;
    this.sellPrice = itemData.sellPrice;
    this.maxStackSize = itemData.maxStackSize;
  }

  canStack(item: Item): boolean {
    if(item.title != this.title) return false;
    if(item.currentStackSize + this.currentStackSize > this.maxStackSize) return false;
    return true;
  }
}
