import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DepartamentoService } from '../services/departamento.service';
import { User } from './users';
import { Departamento } from '../departamentos/departamentos';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  depar: Departamento[] = [];
  newUser: User = {
    _id: '',
    name: '',
    puesto: '',
    date: '',
    departamentoId: '',
  };
  dataUsers = new FormGroup({
    name: new FormControl(''),
    puesto: new FormControl(''),
    date: new FormControl(''),
    departamento: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private deparService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getDepar();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.filter((user) => !!user._id);
    });
  }

  getDepar() {
    this.deparService.getDepar().subscribe((departamentos) => {
      this.depar = departamentos.filter((depar) => !!depar._id);
    });
  }

  createUser(): void {
    this.newUser = {
      _id: '',
      name: this.dataUsers.value.name ?? '',
      puesto: this.dataUsers.value.puesto ?? '',
      date: this.dataUsers.value.date ?? '',
      departamentoId: this.dataUsers.value.departamento ?? '',
    };

    this.userService.createUsers(this.newUser).subscribe((user) => {
      this.users.push(user);
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      const index = this.users.findIndex((i) => i._id === id);
      this.users.slice(index, 1);
    });
  }
}
