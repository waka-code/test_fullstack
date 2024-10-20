import { Routes } from '@angular/router';
import { CreateNewAccountComponent } from './src/create-new-account/create-new-account.component';
import { SignInComponent } from './src/sign-in/sign-in.component';
import { ProductComponent } from './src/product/product.component';
import { NewProductComponent } from './src/new-product/new-product.component';
import { ListUsersComponent } from './src/list-users/list-users.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'create-new-account', component: CreateNewAccountComponent },
  {path: 'home', component: ProductComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'user-list', component: ListUsersComponent}

];
