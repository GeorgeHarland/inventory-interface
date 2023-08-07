import Item from './item';

export default class InventorySpace {
  constructor(public item: Item | null, public quantity: number = 0) {}
}