import InventorySpace from './inventorySpace.js';
import { ItemsRecord } from './constants.js';
import { ItemType, ItemData } from "./types"
import Item from './item.js';

export default class Inventory {
  private inventory: InventorySpace[][] = [];

  constructor(public rows: number, public columns: number, public gridContainer: HTMLElement | null) {
    this.setupGrid();
    // this.populateAll();
    this.populateHalf();
  }
  
  private setupGrid() {
    for(let i=0; i < this.rows; i++) {
      let row: InventorySpace[] = [];
      for(let j=0; j < this.columns; j++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `x${i}y${j}`;
        
        let cellSpace = new InventorySpace(cell.id, cell);
        row.push(cellSpace);
        this.gridContainer?.appendChild(cell);
      }
      this.inventory.push(row);
    }
  }

  private populateAll() {
    for(let i=0; i < this.rows; i++) {
      for(let j=0; j < this.columns; j++) {
        const randomItem = this.generateItem();
        this.inventory[i][j].setItem(randomItem as Item);
      }
    }
  }

  private generateItem(): ItemData {
    const keys = Object.keys(ItemsRecord) as ItemType[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return ItemsRecord[keys[randomIndex]];
  }

  private shuffleArray(array: InventorySpace[]): InventorySpace[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  public populateHalf() {
    const mixedInventory = this.inventory.reduce((acc, curr) => acc.concat(curr), []);
    for (let i = mixedInventory.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixedInventory[i], mixedInventory[j]] = [mixedInventory[j], mixedInventory[i]];
    }
    const halfLength = Math.floor(mixedInventory.length / 2);
    for (let i = 0; i < halfLength; i++) {
      const randomItem = this.generateItem();
      mixedInventory[i].setItem(randomItem as Item);
    }
  }
}
