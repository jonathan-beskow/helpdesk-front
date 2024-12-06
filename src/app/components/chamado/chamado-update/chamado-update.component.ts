
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TecnicoService } from 'src/app/services/tecnico.service';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
@Component({
  selector: 'app-chamado-update',
  standalone: false,
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.css'
})
export class ChamadoUpdateComponent implements OnInit{


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
      private router: Router,
      private route: ActivatedRoute
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
      this.chamado.id = this.route.snapshot.paramMap.get('id');
      this.findById();
      this.findAllClientes();
      this.findAllTecnicos();
    }
  

    findById(): void {
      this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
        this.chamado = resposta;
      }, ex => {
        this.toastService.error(ex.error.error);
      })
    }

    update(): void {
      this.chamadoService.update(this.chamado).subscribe(resposta => {
          this.toastService.success('Chamado atualizado com sucesso', 'Atualizar chamado');
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

    retornaStatus(status: any): string {
      if (status == '0') {
        return 'ABERTO';
      } else if (status == '1') {
        return 'ANDAMENTO';
      } else {
        return 'ENCERRADO'
      }
    }
  
    retornaPrioridade(prioridade: any): string {
      if (prioridade == '0') {
        return 'BAIXA';
      } else if (prioridade == '1') {
        return 'MÉDIA';
      } else {
        return 'ALTA'
      }
    }
  
  }
  