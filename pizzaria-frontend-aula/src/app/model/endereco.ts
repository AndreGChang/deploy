import { Usuario } from "./usuario";

export class Endereco {

  id!: number;
  cep!: string;
  rua!: string;
  bairro!: string;
  cidade!: string;
  uf!: string;
  usuario!: Usuario;
}
