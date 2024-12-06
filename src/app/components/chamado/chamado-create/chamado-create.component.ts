import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado-create',
  standalone: false,
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit{


chamado: Chamado = {
  prioridade: '',
  status: '',
  titulo: '',
  observacoes: '',
  tecnico: '',
  cliente: '',
  nomeCliente: '',
  nomeTecnico: ''
}


  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []


  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])


  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
        this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
        this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex)
      this.toastService.error(ex.error.error);
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
           this.status.valid &&
           this.titulo.valid &&
           this.observacoes.valid &&
           this.tecnico.valid &&
           this.cliente.valid
  }


  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

}
