import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Endereco } from 'src/app/model/endereco';
import { EnderecoService } from 'src/app/services/endereco.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-enderecosdetails',
  templateUrl: './enderecosdetails.component.html',
  styleUrls: ['./enderecosdetails.component.scss']
})
export class EnderecosdetailsComponent implements OnInit {

  @Input() endereco: Endereco = new Endereco();
  @Output() retorno = new EventEmitter<Endereco>();

  form!: FormGroup;

  enderecoService = inject(EnderecoService);

  constructor(private toastSvc: ToastrService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      cep: [this.endereco.cep],
      rua: [{ value: this.endereco.rua, disabled: false }],
      bairro: [{ value: this.endereco.bairro, disabled: false }],
      cidade: [{ value: this.endereco.cidade, disabled: false }],
      uf: [{ value: this.endereco.uf, disabled: false }]
    });

    this.form.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.enderecoService.getCepData(cep).subscribe((data: any) => {
          this.form.patchValue({
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          });

          // Atualize o objeto endereco também
          this.endereco.rua = data.logradouro;
          this.endereco.bairro = data.bairro;
          this.endereco.cidade = data.localidade;
          this.endereco.uf = data.uf;

          // Desabilitando os campos preenchidos
          this.form.get('rua')?.disable();
          this.form.get('bairro')?.disable();
          this.form.get('cidade')?.disable();
          this.form.get('uf')?.disable();
        });
      }
    });
  }

  salvar() {

    this.retorno.emit(this.endereco);
    this.toastSvc.success(`Endereço salvo`, "PizzariaTOP", {
      closeButton: true,
      progressBar: true,
      tapToDismiss: true
    });

  }

}
