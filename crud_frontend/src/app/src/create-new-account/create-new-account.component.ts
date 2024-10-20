import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserServicesService } from '../services/user-services.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-account',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './create-new-account.component.html',
  styleUrl: './create-new-account.component.scss',
})
export class CreateNewAccountComponent {
  register: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
  };
  isError: boolean = false;

  constructor(
    private userServices: UserServicesService,
    private router: Router
  ) {}

  createNewUser() {
    if (
      this.register.name === '' ||
      this.register.email === '' ||
      this.register.password === '' ||
      this.register.role === ''
    ) {
      this.isError = true;
    } else {
      this.userServices.createNewUser(this.register).subscribe(
        () => {
         const user = { name: this.register.name, role: this.register.role };
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['home']);
        },
        (error) => {
          this.isError = true;
        }
      );
    }
  }

  login() {
    this.router.navigate(['']);
  }
}
