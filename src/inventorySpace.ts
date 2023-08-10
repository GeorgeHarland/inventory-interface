import Item from "./item";

export default class InventorySpace {
  item: Item | null = null;
  imgContainer: HTMLElement;
  highlight: HTMLImageElement;
  img: HTMLImageElement;
  stackCount: HTMLSpanElement;
  private static sourceSpace: InventorySpace | null = null;

  constructor(public id: string, public gridElement: HTMLElement) {
    this.imgContainer = document.createElement('div');
    this.highlight = document.createElement('img');
    this.img = document.createElement('img');
    this.stackCount = document.createElement('span');

    this.img.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.imgContainer.addEventListener('dragover', this.handleDragOver.bind(this));
    this.imgContainer.addEventListener('drop', this.handleDrop.bind(this));
    
    this.setupHighlight();
    this.setupImgContainer();
    this.setupStackCount();

    this.gridElement.appendChild(this.imgContainer);
    this.gridElement.appendChild(this.highlight);
  }
  
  private setupHighlight() {
    this.highlight.src = './assets/Images/InventoryMain/IMG_SlotHighlight.png';
    this.highlight.style.position = 'absolute';
    this.highlight.style.width = '12%';
    this.highlight.style.height = '19%';
    this.highlight.style.zIndex = '3';
    this.highlight.style.visibility = 'hidden';
    this.imgContainer.appendChild(this.highlight);
  }

  private setupImgContainer() {
    this.imgContainer.style.display = 'flex';
    this.imgContainer.style.height = '100%';
    this.imgContainer.style.width = '100%';
    this.imgContainer.style.justifyContent = 'center';
    this.imgContainer.style.alignItems = 'center';
    this.imgContainer.style.position = 'relative';
    this.imgContainer.style.setProperty('z-index', '8', 'important');
    this.imgContainer.appendChild(this.img);

    this.imgContainer.addEventListener('mouseover', () => {
      this.highlight.style.visibility = 'visible';
    });
    
    this.imgContainer.addEventListener('mouseout', () => {
      this.highlight.style.visibility = 'hidden';
    });
  }

  private setupStackCount() {
    this.stackCount.style.position = 'absolute';
    this.stackCount.style.top = '9%';
    this.stackCount.style.left = '10%';
    this.stackCount.style.zIndex = '5';
    this.stackCount.style.color = 'brown';
    this.stackCount.style.fontSize = '12px';
    this.stackCount.style.fontFamily = 'NumericsFont';
    this.imgContainer.appendChild(this.stackCount);
  }

  setItem(item: Item | null): void {
    this.item = item;
    if(item) {
      this.img.src = `./assets/Images/Icons/${item.icon}.png`;
      this.img.alt = item.icon;
      this.img.style.width = '50%';
      this.img.style.height = '50%';
      this.img.style.zIndex = '4';
      if(item.currentStackSize > 1) {
        this.stackCount.textContent = item.currentStackSize.toString();
      } else {
        this.stackCount.textContent = ''
      }
    }
  }

  clearItem(): void {
    this.item = null;
    this.img.src = '';
    this.img.alt = '';
    this.img.style.width = '0%';
    this.img.style.height = '0%';
    this.stackCount.textContent = '';
  }
  
  private handleDragStart(e: DragEvent) {
      InventorySpace.sourceSpace = this;
      e.dataTransfer!.setData('text/plain', this.id);
  }

  private handleDragOver(e: DragEvent) {
      e.preventDefault();
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    if (InventorySpace.sourceSpace && InventorySpace.sourceSpace.item) {
        if (this.item) {
            // stack if can
            if (this.item.canStack(InventorySpace.sourceSpace.item)) {
                this.item.currentStackSize += InventorySpace.sourceSpace.item.currentStackSize;
                if(this.item.currentStackSize > 1) {
                    this.stackCount.textContent = this.item.currentStackSize.toString();
                } else {
                    this.stackCount.textContent = ''
                }
                InventorySpace.sourceSpace.clearItem();
            // swap the items
            } else {
                const tempItem = this.item;
                this.setItem(InventorySpace.sourceSpace.item);
                InventorySpace.sourceSpace.setItem(tempItem);
            }
        // move item to empty space
        } else {
            this.setItem(InventorySpace.sourceSpace.item);
            InventorySpace.sourceSpace.clearItem();
        }
        InventorySpace.sourceSpace = null;
    }
}

}
