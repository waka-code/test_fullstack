import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent {

  listUsers: User[] | undefined = undefined;
  isLoading: boolean = true;
  searchText: string = '';

  constructor(
    private userService: UserServicesService,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  onChangedSearchUser(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      let searchQuery = inputElement.value.toLowerCase();

    if (searchQuery.length > 0) {
      this.listUsers = this.listUsers?.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }else{
      this.loadUsers();
    }
  }
  loadUsers() {
    this.isLoading = true;
    this.userService.getUserList().subscribe(
      (res) => {
        this.listUsers = res;
        console.log(res);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users', error);
        this.isLoading = false;
      }
    );
  }
}
