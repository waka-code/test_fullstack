import { Routes } from '@angular/router';
import { CreateNewAccountComponent } from './components/create-new-account/create-new-account.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'create-new-account', component: CreateNewAccountComponent },
  {path: 'home', component: ProductComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'user-list', component: ListUsersComponent}

];
