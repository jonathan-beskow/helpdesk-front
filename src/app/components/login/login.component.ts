import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new UntypedFormControl(null, Validators.email);
  senha = new UntypedFormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(
      resposta => {
        const token = resposta.headers.get('Authorization').substring(7);
        if (token) {
          this.toast.success('Autenticado com sucesso!');
          this.service.successFullLogin(token);
          this.router.navigate([''])
        } else {
          this.toast.error('Token não encontrado na resposta.');
        }
      },
      erro => {
        this.toast.error('Erro ao autenticar: ' + erro.message);
      }
    );
  }
  


  validaCampos(): boolean {return this.email.valid && this.senha.valid}
}
