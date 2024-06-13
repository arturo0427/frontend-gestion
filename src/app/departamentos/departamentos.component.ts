import { Component, OnInit } from '@angular/core';
import { Departamento } from './departamentos';
import { DepartamentoService } from '../services/departamento.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css',
})
export class DepartamentosComponent implements OnInit {
  departamentos: Departamento[] = [];
  newDepartamento: Departamento = {
    _id: '',
    name: '',
    description: '',
  };
  dataDepartamentos = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {
    this.getDepartamento();
  }

  getDepartamento() {
    this.departamentoService.getDepar().subscribe((departamentos) => {
      this.departamentos = departamentos.filter((depar) => !!depar._id);
    });
  }

  createDepartamento(): void {
    this.newDepartamento = {
      _id: '',
      name: this.dataDepartamentos.value.name ?? '',
      description: this.dataDepartamentos.value.description ?? '',
    };

    this.departamentoService
      .createDepartamento(this.newDepartamento)
      .subscribe((departamento) => {
        this.departamentos.push(departamento);
      });
  }

  deleteDepartamento(id: string): void {
    this.departamentoService.deleteDepartamento(id).subscribe(() => {
      const index = this.departamentos.findIndex((i) => i._id === id);
      this.departamentos.slice(index, 1);
    });
  }
}
