import { UserServicesService } from './../services/user-services.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  username!: string;
  password!: string;
  isError: boolean = false;
  constructor(
    private router: Router,
    private userService: UserServicesService
  ) {}

  onSubmit = () => {
    this.userService.login({ Password: this.password, Email: this.username }).subscribe(
      (data) => {
        const decode = jwtDecode(data.token);
        data.Role = decode["role"]
        data.Name = decode["unique_name"]
        const user = { name: data.Name, role: data.Role };
        localStorage.setItem('user', JSON.stringify(user));

        if(data){
           this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.isError = true;
      }
    );
  }

  onCreateNewUser = () => {
    this.router.navigate(['/create-new-account']);
  };
}
