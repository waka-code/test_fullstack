import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductComponent } from './src/product/product.component';
import { CreateNewAccountComponent } from './src/create-new-account/create-new-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServicesService } from './src/services/user-services.service';
import { ProductrServicesService } from './src/services/product-services.service';
import { CommonModule } from '@angular/common';
import { IgnoreSelfSignedCertInterceptor } from './ignore-self-signed-cert.interceptor';
import { ProductModule } from './src/product-item/ProductModule';

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
