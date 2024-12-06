import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chamado-create',
  standalone: false,
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit{

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  descricao: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
           this.status.valid &&
           this.titulo.valid &&
           this.descricao.valid &&
           this.tecnico.valid &&
           this.cliente.valid
  }

}
