import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IgnoreSelfSignedCertInterceptor } from './ignore-self-signed-cert.interceptor';
import { CreateNewAccountComponent } from './components/create-new-account/create-new-account.component';
import { ProductModule } from './components/product-item/ProductModule';
import { ProductComponent } from './components/product/product.component';
import { ProductrServicesService } from './components/services/product-services.service';
import { UserServicesService } from './components/services/user-services.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    CreateNewAccountComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ProductModule
  ],
  providers: [
    UserServicesService,
    ProductrServicesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IgnoreSelfSignedCertInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crud_frontend';

}
