import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  standalone: false,
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent {
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
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }
  
  update(): void {
    this.service.update(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico atualizado com sucesso', 'Update');
        this.router.navigate(['tecnicos']);
      },
      error: (ex) => {
        console.log(ex);
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      },
    });
  }
  

  addPerfil(perfil: any): void {
    this.tecnico.perfis.push(perfil);

    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil)
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}