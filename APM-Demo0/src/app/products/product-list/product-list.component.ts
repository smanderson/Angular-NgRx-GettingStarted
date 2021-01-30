import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  // TODO: Component should be simplified further. Should purely be a list.
  // It doesn't make sense to know that the display code can be toggled but not know how to toggle it - this should be completely controlled by a parent component
  pageTitle = 'Products';

  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Input() displayCode: boolean;
  @Input() errorMessage: string;
  @Output() displayCodeChanged = new EventEmitter<void>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() productWasSelected = new EventEmitter<Product>();

  constructor() { }

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.productWasSelected.emit(product);
  }
}
