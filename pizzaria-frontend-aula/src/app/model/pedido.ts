import { Item } from "./item";
import { Usuario } from "./usuario";

export class Pedido {
  id!: number;
  nome!: string;
  observacao!: string;
  entrega!: boolean;
  item!: Item[];
  usuario!: Usuario;
  valorTotal!: number;
  dataHora!: Date;
  status!: string;
}
