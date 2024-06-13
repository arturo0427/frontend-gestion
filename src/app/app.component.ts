import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, DepartamentosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
