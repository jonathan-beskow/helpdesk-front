import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
@Component({
  selector: 'app-tecnico-delete',
  standalone: false,
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent {
  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  tecnico: Tecnico = {
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
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    let id = this.tecnico.id;
    console.log(id);
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }
  

  delete(): void {
    console.log('id do técnico: ', this.tecnico.id);
    console.log('Método delete() chamado'); 
    this.service.delete(this.tecnico.id).subscribe(
      () => {
        this.toastr.success('Técnico deletado com sucesso', 'Delete');
        this.router.navigate(['tecnicos']);
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
          this.toastr.error('Erro desconhecido ao deletar técnico.');
        }
      }
    );
  }
}