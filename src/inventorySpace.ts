export default class InventorySpace {
  item: ItemData | null = null;

  constructor(public id: string, public gridElement: HTMLElement) {}

  setItem(item: ItemData): void {
    this.item = item;
    let imgContainer = document.createElement('div');
    
    let highlight = document.createElement('img');
    highlight.src = './assets/Images/InventoryMain/IMG_SlotHighlight.png';
    highlight.style.position = 'absolute';
    highlight.style.width = '12%';
    highlight.style.height = '19%';
    highlight.style.zIndex = '3';
    highlight.style.visibility = 'hidden';
    // highlight.style.outline = '#4CAF50 solid 10px';
    imgContainer.appendChild(highlight);
    
    const img = document.createElement('img');
    img.src = `./assets/Images/Icons/${item.name}.png`;
    img.alt = item.name;
    img.style.width = '50%';
    img.style.height = '50%';
    img.style.zIndex = '4';
    
    imgContainer.style.display = 'flex';
    imgContainer.style.height = '100%';
    imgContainer.style.width = '100%';
    imgContainer.style.marginBottom = '10%';
    imgContainer.style.marginLeft = '5%';
    imgContainer.style.justifyContent = 'center';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.position = 'relative';
    imgContainer.style.setProperty('z-index', '8', 'important');
    imgContainer.appendChild(img);
    imgContainer.addEventListener('mouseover', function() {
      console.log('turn visible')
      highlight.style.visibility = 'visible';
      // highlight.style.setProperty('visibility', 'visible', 'important');
    });
    imgContainer.addEventListener('mouseout', function() {
      highlight.style.visibility = 'hidden';
    });
    
    this.gridElement.firstChild && this.gridElement.firstChild.remove();
    this.gridElement && this.gridElement.appendChild(highlight);
    this.gridElement && this.gridElement.appendChild(imgContainer);
  }
}