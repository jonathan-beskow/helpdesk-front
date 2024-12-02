import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-cliente-delete',
  standalone: false,
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent {
  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }


  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    let id = this.cliente.id;
    console.log(id);
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = []
      this.cliente = resposta;
    })
  }
  

  delete(): void {
    console.log('id do cliente: ', this.cliente.id);
    console.log('Método delete() chamado'); 
    this.service.delete(this.cliente.id).subscribe(
      () => {
        this.toastr.success('Cliente deletado com sucesso', 'Delete');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        if (ex.error && ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toastr.error(element.message);
          });
        } else if (ex.error && ex.error.message) {
          this.toastr.error(ex.error.message);
        } else {
          console.log(ex)
          this.toastr.error('Erro desconhecido ao deletar cliente.');
        }
      }
    );
  }
}