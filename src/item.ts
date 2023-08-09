import { ItemsRecord } from "./constants";
import { ItemType } from "./types";

export default class Item {
  name: string;
  maxStackSize: number;

  constructor(public type: ItemType, public currentStackSize: number = 1) {
      if (!ItemsRecord[type as ItemType]) {
          throw new Error("Invalid item type provided");
      }
      this.name = ItemsRecord[type].name;
      this.maxStackSize = ItemsRecord[type].maxStackSize;
  }

  canStackWith(item: Item): boolean {
      return this.type === item.type
  }

  stack(item: Item): void {
      if (this.type !== item.type) {
          throw new Error("Different item types can't be stacked");
      }

      const total = this.currentStackSize + item.currentStackSize;

      if (total <= this.maxStackSize) {
          this.currentStackSize = total;
          item.currentStackSize = 0;
      } else {
          const overflow = total - this.maxStackSize;
          this.currentStackSize = this.maxStackSize;
          item.currentStackSize = overflow;
      }
  }
}
