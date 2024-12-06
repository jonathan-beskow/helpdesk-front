import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ClienteService } from "src/app/services/cliente.service";

import { ToastrService } from "ngx-toastr";
import { ChamadoService } from "src/app/services/chamado.service";
import { TecnicoService } from "src/app/services/tecnico.service";

import { ActivatedRoute, Router } from "@angular/router";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";

@Component({
  selector: "app-chamado-read",
  standalone: false,
  templateUrl: "./chamado-read.component.html",
  styleUrl: "./chamado-read.component.css",
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  constructor(
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {}

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(
      (resposta) => {
        this.chamado = resposta;
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }
}
