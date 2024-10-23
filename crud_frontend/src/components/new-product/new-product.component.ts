import { isError } from 'util';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductrServicesService } from '../services/product-services.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  product = {
    id: 0,
    name: '',
    description: '',
    stock: '',
    price: 0,
  };
  toastMessage = {
    isSuccess: false,
    isError: false,
    message: '',
  }

  constructor(
    private productService: ProductrServicesService,
  ) {}

  close() {
    this.closeModalEvent.emit();
  }

  addProduct = async () => {
    const d = new Date();
    let data = await this.productService.createProduct({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      stock: this.product.stock,
      price: this.product.price,
      creationDate: d.toDateString(),
      lastUpdate: d.toDateString(),
    });
    data.subscribe(() => {
      this.toastMessage.isSuccess = true;
      this.toastMessage.message = "Product added successfully...";
      this.product = {
        id: 0,
        name: '',
        description: '',
        stock: '',
        price: 0,
      };
      setTimeout(()=>{
        this.close();
        this.refresh.emit();
      },2000)
    },
  (error) => {
    this.toastMessage.isError = true;
    this.toastMessage.message = "A problem occurred..";
  });
  };

}
