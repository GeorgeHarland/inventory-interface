import { ItemType, ItemData } from "./types"

export const ItemsRecord: Record<ItemType, ItemData> = {
  Apple: { name: 'Apple', maxStackSize: 10 },
  Book: { name: 'Book', maxStackSize: 1 },
  Flask: { name: 'Flask', maxStackSize: 1 },
  Herbs: { name: 'Herbs', maxStackSize: 10 },
  Sword: { name: 'Sword', maxStackSize: 1 },
}
