import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product, ResProducts } from '../models/product';
import { ProductrServicesService } from '../services/product-services.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewProductComponent } from '../new-product/new-product.component';
import { ListUsersComponent } from '../list-users/list-users.component';
import { ProductModule } from '../product-item/ProductModule';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    NgIf,
    CommonModule,
    FormsModule,
    NewProductComponent,
    ListUsersComponent,
    ProductModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  [x: string]: any;
  products: ResProducts | null = null;
  productsFilter: Product[] | undefined = undefined;
  isLoading: boolean = true;
  pageNumbers: number = 1;
  modalEdit: boolean = false;
  producId: number | undefined = undefined;
  modalAddNew: boolean = false;
  isListUser: boolean = false;
  toastMessage = {
    isSuccessful: false,
    isError: false,
    message: '',
  };
  update = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: '',
  };
  user = {
    name: '',
    role: '',
  };
  constructor(
    private productService: ProductrServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initUser();
  }

  initUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const parseUser = JSON.parse(userJson);
      this.user.name = parseUser.name;
      this.user.role = parseUser.role;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  userList() {
    this.isListUser = true;
  }

  loadProducts = async () => {
    this.isLoading = true;
    let data = await this.productService.getProducts(this.pageNumbers, 10);
    data.subscribe((res) => {
      this.products = res;
      this.isLoading = false;
    });
  };

  onChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let searchQuery = inputElement.value.toLowerCase();

    if (searchQuery.length > 0) {
      let data = this.productService.getProductsById(searchQuery);
      data.subscribe((res) => {
        this.productsFilter = res;
        this.isLoading = false;
      });
    } else {
      this.productsFilter = undefined;
    }
  }

  next() {
    if (this.products?.pageNumber && this.products?.pageSize) {
      if (this.products.totalPages === this.products.pageNumber) {
        return;
      }
      this.pageNumbers = this.products.pageNumber + 1;
      this.loadProducts();
    }
  }

  prev() {
    if (this.products?.pageNumber && this.products?.pageSize) {
      if (this.products.pageNumber <= 1) {
        return;
      }
      this.pageNumbers = this.products.pageNumber - 1;
      this.loadProducts();
    }
  }

  newProduct() {
    this.modalAddNew = true;
  }

  openModal(id: number) {
    this.producId = id;
    this.modalEdit = true;
  }

  closeModal() {
    if (this.modalEdit) {
      this.producId = undefined;
      this.modalEdit = false;
    } else if (this.isListUser) {
      this.isListUser = false;
    } else {
      this.modalAddNew = false;
    }
  }

  updateProduct() {
    const date = new Date();

    if (this.update && this.producId) {
      this.productService
        .updateProduct(this.producId, {
          id: this.update.id,
          name: this.update.name,
          description: this.update.description,
          price: this.update.price,
          stock: this.update.stock,
          creationDate: date.toDateString(),
          lastUpdate: date.toDateString(),
        })
        .subscribe(() => {
          this.toastMessage.isSuccessful = true;
          this.toastMessage.message = 'Actualizado correctamente';
          setTimeout(() => {
            this.closeModal();
            this.loadProducts();
          }, 2000);
        },(error) => {
          this.toastMessage.isError = true;
          this.toastMessage.message = 'Error al actualizar el producto';
        });
    } else {
      this.toastMessage.isError = true;
      this.toastMessage.message = 'Error al actualizar el producto';
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
