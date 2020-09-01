export default class Categories {
  constructor(payload, index) {
    this.isCollapsed = false;
    this.title = payload.categoryName;
    this.servingSize = payload.servingSize ? payload.servingSize : '';
    this.itemColor = payload.colorCode;
    this.index = index;
    this.data = payload.subcategories;
  }
}
