import InventorySpace from './inventorySpace.js';
import { ItemsRecord } from './constants.js';

export default class Inventory {
  private inventory: InventorySpace[][] = [];

  constructor(public rows: number, public columns: number, public gridContainer: HTMLElement | null) {
    this.setupGrid();
  }
  
  private setupGrid() {
    for(let i=0; i < this.rows; i++) {
      let row: InventorySpace[] = [];
      for(let j=0; j < this.columns; j++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `x${i}y${j}`;
        cell.style.display = 'flex';
        // cell.style.justifyContent = 'center';
        // cell.style.alignItems = 'center';
        cell.style.height = '90%';
        cell.style.width = '90%';
        let cellSpace = new InventorySpace(cell.id, cell);
        row.push(cellSpace);
        this.gridContainer?.appendChild(cell);
        const randomItem = this.generateItem();
        cellSpace.setItem(randomItem);
      }
      this.inventory.push(row);
    }
  }

  private generateItem(): ItemData {
    const keys = Object.keys(ItemsRecord) as ItemType[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return ItemsRecord[keys[randomIndex]];
  }
}