import InventorySpace from './inventorySpace.js';
import { DEV_POPULATE_HALF_INVENTORY, ItemsRecord } from './constants.js';
import { ItemType, ItemData } from "./types"
import Item from './item.js';

export default class Inventory {
  private inventory: InventorySpace[][] = [];

  constructor(public rows: number, public columns: number, public gridContainer: HTMLElement | null) {
    this.setupGrid();
    this.populateInventory();
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

  private populateInventory() {
    for(let i=0; i < this.rows; i++) {
      for(let j=0; j < this.columns; j++) {
        if(DEV_POPULATE_HALF_INVENTORY) {
          if (Math.random() < 0.5) {
            const randomItem = this.generateItem();
            this.inventory[i][j].setItem(randomItem as Item);
          }
        } else {
          const randomItem = this.generateItem();
          this.inventory[i][j].setItem(randomItem as Item);
        }
      }
    }
  }

  private generateItem(): ItemData {
    const keys = Object.keys(ItemsRecord) as ItemType[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return ItemsRecord[keys[randomIndex]];
  }
}
