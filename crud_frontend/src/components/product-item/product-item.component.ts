import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  exportAs: 'productItem'
})
export class ProductItemComponent {
  @Input() product: any;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.product.id);
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }
}
