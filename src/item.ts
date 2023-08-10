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

//   canStackWith(item: Item): boolean {
//       return this.type === item.type
//   }

//   stack(item: Item): void {
//       if (this.type !== item.type) {
//           throw new Error("Different item types can't be stacked");
//       }

//       const total = this.currentStackSize + item.currentStackSize;

//       if (total <= this.maxStackSize) {
//           this.currentStackSize = total;
//           item.currentStackSize = 0;
//       } else {
//           const overflow = total - this.maxStackSize;
//           this.currentStackSize = this.maxStackSize;
//           item.currentStackSize = overflow;
//       }
//   }
}
